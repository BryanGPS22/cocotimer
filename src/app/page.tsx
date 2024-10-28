"use client"

import react, { useEffect, useState } from "react"

import Content from "@/components/Content"
import Homepage from "@/components/Homepage"

export default function Home() {

  return (
    <>
    <main className="">
      <div className="">
        <Homepage />
      </div>
    </main>
    <div className="container mx-auto max-w-4xl md:p-14 p-5">
      <Content />
    </div>
    </>
  )
}
