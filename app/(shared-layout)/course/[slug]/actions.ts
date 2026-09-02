"use server";

import { requireUser } from "@/app/data/user/required-user";
import arject, { fixedWindow } from "@/lib/arject";
import prisma from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/type";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";

const aj = arject.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  }),
);

export async function enrollInCourseAction(
  courseId: string,
): Promise<ApiResponse | never> {
  const user = await requireUser();
  let checkoutUrl;
  try {
    const req = await request();
    const desion = await aj.protect(req, {
      fingerprint: user.id,
    });
    if (desion.isDenied()) {
      return {
        status: "error",
        message: "You hava been blocked",
      };
    }
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
      },
    });

    if (!course) {
      return {
        status: "error",
        message: "Course Not Found to Enroll Course",
      };
    }
    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
         stripeCustomerId : true,
      },
    });

    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const exisitingEnrollemented = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });

      if (exisitingEnrollemented?.status === "Active") {
        return {
          status: "success",
          message: "Already Enrolled This Coursed",
        };
      }
      let enrollement;
      if (exisitingEnrollemented) {
        enrollement = await tx.enrollment.update({
          where: {
            id: exisitingEnrollemented.id,
          },
          data: {
            amount: course.price,
            status: "Pending",
            updatedAt: new Date(),
          },
        });
      } else {
        enrollement = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
            amount: course.price,
            status: "Pending",
          },
        });
      }

      // create checkout session second step 
      const checkoutSession = await stripe.checkout.sessions.create({
        customer : stripeCustomerId,
        line_items: [
          {
            price:"price_1UBJeGH0duXAAuN0zElDFZti",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.BETTER_AUTH_URL}/payment/success`,
        cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
          userId: user.id,
          courseId: course.id,
          enrollmentId: enrollement.id,
        },
      });
      return {
        enrollment: enrollement,
        checkoutUrl: checkoutSession.url,
      };
    });

    checkoutUrl = result.checkoutUrl as string;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return {
        status: "error",
        message: "Payment System Error, Please try again later",
      };
    }
    return {
      status: "error",
      message: "Failed to Enroll in Course",
    };
  }
  redirect(checkoutUrl);
}


