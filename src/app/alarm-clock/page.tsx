import react from "react";
import Alarm from "@/components/Alarm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: `https://cocotimer.com/alarm-clock`,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "",
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
      <div className="container mx-auto max-w-[1080px] py-48">
        <Alarm />
      </div>
    </>
  );
}
