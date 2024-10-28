import react from "react";
import FilterCategory2 from "@/components/FilterCategory2";
import type { Metadata } from "next";
import Content from "@/components/Content";

export const metadata: Metadata = {
  title: "",
  description:
    "",
  alternates: {
    canonical: ``,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Analog Timer Aesthetic",
    url: "",
    description:
      "",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-[1080px] px-20 pt-10">
        <FilterCategory2 />
      </div>
      <div className="container mx-auto max-w-4xl md:px-14 p-5">
        <Content />
      </div>
    </>
  );
}
