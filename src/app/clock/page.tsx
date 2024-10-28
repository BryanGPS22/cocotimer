import react from "react";
import type { Metadata } from "next";
import Clock2 from "@/components/Clock2";

export const metadata: Metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: `https://cocotimer.com/clock`,
  },
};

const page = () => {
  return (
    <div className="">
      <Clock2 />
    </div>
  );
};

export default page;
