import React from "react";
import { Navbar } from "./_components/Navbar";
import Footer from "@/components/layouts/Footer";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full">
      <Navbar />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
