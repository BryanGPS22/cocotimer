"use client";

import React, { useState, Fragment } from "react";

// ** Next Import
import Link from "next/link";
import Image from "next/image";
import "@/app/styles/globals.css";
import { Spin as Hamburger } from "hamburger-react";
import { Popover, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { GiCoconuts } from "react-icons/gi";

type Props = {};

function Header({ }: Props) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const menus = [
    {
      id: 1,
      title: "Timer",
      subMenu: [
        { id: 21, title: "Digital", url: "/digital" },
        {
          id: 22,
          title: "Analog",
          url: "/analog",
        },
        { id: 23, title: "Flip", url: "/" },
      ],
    },
    {
      id: 2,
      title: "Stopwatch",
      url: "/stopwatch",
    },
    {
      id: 3,
      title: "Alarm Clock",
      url: "/alarm-clock",
    },
    {
      id: 4,
      title: "Clock",
      url: "/clock",
    },
    {
      id: 5,
      title: "Pomodoro",
      url: "/pomodoro",
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-transparent h-20">
      <nav className="mx-auto max-w-6xl md:grid grid-cols-1 py-4 lg:px-8 sm:hidden hidden">
        <div className="flex justify-center">
          <div className="flex items-center gap-8 transform p-3 px-6 rounded-full bg-white/30 backdrop-blur-lg shadow-lg">
            <Link href={"/"}>
              <GiCoconuts size={25} className="text-white" />
            </Link>
            <Link href={"/"} className="relative">
              <p className="text-[14px] text-white font-satoshi">Timer</p>
            </Link>
            <Link href={"/stopwatch"} className="relative">
              <p className="text-[14px] text-white font-satoshi">Stopwatch</p>
            </Link>
            <Link href={"/alarm-clock"} className="relative">
              <p className="text-[14px] text-white font-satoshi">Alarm Clock</p>
            </Link>
            <Link href={"/clock"} className="relative">
              <p className="text-[14px] text-white font-satoshi">Clock</p>
            </Link>
            <Link href={"/pomodoro"} className="relative">
              <p className="text-[14px] text-white font-satoshi">Pomodoro</p>
            </Link>
          </div>
        </div>
      </nav>
      {/* mobile view  */}
      <nav>
        <div className="2xl:hidden xl:hidden lg:hidden md:hidden">
          <div className="bg-white/30 backdrop-blur-lg flex items-center justify-between p-3 ">
            <div className="col-span-2 sm:col-span-2 mt-1">
              <Link
                href="/"
                className="items-center flex text-lg font-semibold  font-quicksand"
              >
                <GiCoconuts size={30} className="text-white" />
              </Link>
            </div>

            <div className="col-span-1 sm:col-span-1 justify-self-end sm:justify-self-end mt-1 text-white">
              <Hamburger
                label="Hamburger"
                size={28}
                toggled={isShowMenu}
                toggle={setIsShowMenu}
              />
            </div>
          </div>

          {/* Navbar Mobile View - Start  */}
          <div
            className={`${
              isShowMenu ? "top-16 opacity-100" : "top-8 opacity-0 hidden"
            } absolute left-0 lg:static bg-white lg:bg-inherit shadow-xl lg:shadow-none lg:opacity-100 items-center justify-between w-full lg:flex lg:w-auto lg:order-1 rounded-b-xl p-4 lg:p-0 transition-all z-10`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col gap-2 lg:gap-0 font-medium rounded-lg lg:flex-row lg:space-x-8 lg:mt-0">
              {menus.map((menu) => {
                return menu.subMenu ? (
                  <li key={menu.id} className="lg:relative">
                    <Popover className="relative inline">
                      <Popover.Button className="flex items-center gap-2 py-2 px-4 hover:text-nh-primary-500 focus:text-[#368AB2] focus:border-none focus:outline-none">
                        {menu.title}
                        <FiChevronDown size={20} />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="lg:absolute left-0 z-10 mt-1 bg-white rounded-xl text-black px-4 lg:px-0 py-2 lg:py-6 lg:max-w-fit whitespace-nowrap xl:border xl:border-gray-100">
                          {() => (
                            <ul>
                              {menu.subMenu.map((submenu) => (
                                <li
                                  key={submenu.id}
                                  className="border-b lg:border-none w-full"
                                >
                                  <Link
                                    href={submenu.url}
                                    className="block py-2 lg:px-8 hover:bg-nh-primary-500 hover:text-[#368AB2]"
                                  >
                                    {submenu.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </li>
                ) : (
                  <li key={menu.id}>
                    <Link
                      href={menu.url}
                      className="block py-2 px-4 hover:text-nh-primary-500 text-[#368AB2]"
                    >
                      {menu.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Navbar Mobile View - End  */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
