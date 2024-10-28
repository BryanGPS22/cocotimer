import react from "react";
import Stopwatch from "@/components/Stopwatch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stopwatch Aesthetic Online",
  description:
    "Improve your reading, coding, and cooking speed using our aesthetic stopwatch. Enjoy full-screen mode, mobile-friendly and relaxing themes.",
  alternates: {
    canonical: `https://cocotimer.com/stopwatch`,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Stopwatch Aesthetic Online",
    url: "https://cocotimer.com/stopwatch",
    description:
      "Improve your reading, coding, and cooking speed using our aesthetic stopwatch. Enjoy full-screen mode, mobile-friendly and relaxing themes.",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="">
        <Stopwatch />
      </div>
    </>
  );
}
