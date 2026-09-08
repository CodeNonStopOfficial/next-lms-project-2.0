import { FeatureSection } from "@/components/web/FeatureSection";
import Home from "@/components/layouts/Home";
import Features from "@/components/layouts/Features";


export default function HomePage() {
  return (
    <>
      <section>
         <Home/>
         <FeatureSection/>
         <Features/>
      </section>
    </>
  );
}
