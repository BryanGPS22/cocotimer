import react from "react";
import type { Metadata } from "next";
import Clock2 from "@/components/Clock2";
import FilterCategory from "@/components/FilterCategory";

export const metadata: Metadata = {
  title: "Pomodoro Timer Aesthetic Online - CocoTimer",
  description:
    "Achieve your focus with our digital Pomodoro timer for desktop and mobile. Personalize your task to do, aesthetic theme, and relaxing sounds.",
  alternates: {
    canonical: `https://cocotimer.com/pomodoro`,
  },
};

const page = () => {
  return (
    <div className="">
      <FilterCategory />
    </div>
  );
};

export default page;
