"use client";

import react, { useEffect, useState } from "react";

import Content from "@/components/Content";
import Second25 from "@/components/second/Second25";

export default function Home() {
  return (
    <>
      <main className="pt-28 flex justify-between gap-10 max-w-[1200px] mx-auto">
        <div className="w-full bg-transarent rounded-3xl items-center">
          <Second25 />
        </div>
      </main>
      <div className="container mx-auto max-w-4xl md:p-14 p-5">
        <Content />
      </div>
    </>
  );
}
