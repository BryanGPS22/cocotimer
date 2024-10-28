"use client"

import React from "react"
import Link from "next/link"

import { MdClose } from "react-icons/md"

// ** Context
import { useSidebar } from "@/context/SidebarContext"

// ** Data
import menuData from "@/data/menu"

type Props = {}

function Sidebar({}: Props) {
  const { isOpenSidebar, setIsOpenSidebar } = useSidebar()

  return (
    <aside
      className={`absolute top-0 ${
        isOpenSidebar ? "right-0 opacity-100" : "right-[-400px] opacity-0-0"
      }  min-h-screen sm:max-w-sm w-[320px] bg-white text-neutral-content p-6 pt-20 ring-1 ring-white/10 z-20 transition-all duration-500 ease-in-out`}
    >
      <button onClick={() => setIsOpenSidebar(false)}>
        <MdClose size={32} className="absolute top-6 right-8" />
      </button>
      <ul
        className={`grid gap-4 ${
          isOpenSidebar ? "scale-x-100" : "scale-x-0"
        } transition-all duration-500 ease-in-out`}
      >
        {menuData.map((data) => (
          <li key={data.id} className="rounded-lg font-bold">
            <Link className="block px-3 py-2" href={data.link}>
              {data.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
