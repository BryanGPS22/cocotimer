import React, { useState } from "react";
import { IoSettingsSharp, IoHeadsetSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import clsxm from "@/lib/clsxm";
import { RiTimerFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";
import { FaCloudShowersHeavy } from "react-icons/fa6";

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("home-theme");
  const [headerText, setHeaderText] = useState<string>("home-theme");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    switch (filter) {
      case "home-theme":
        setHeaderText("home-theme");
        break;
      case "focus-theme":
        setHeaderText("Short Break");
        break;
      case "ambient":
        setHeaderText("Short Break");
        break;
      case "clock":
        setHeaderText("Short Break");
        break;
      case "focus-timer":
        setHeaderText("Short Break");
        break;
      case "stats":
        setHeaderText("Short Break");
        break;
      case "music":
        setHeaderText("Short Break");
        break;
      case "sounds":
        setHeaderText("Short Break");
        break;
      case "quotes":
        setHeaderText("Short Break");
        break;
      case "extras":
        setHeaderText("Short Break");
        break;
      case "profile":
        setHeaderText("Short Break");
        break;
      case "support":
        setHeaderText("Short Break");
        break;
      default:
        setHeaderText("home-theme");
    }
  };

  return (
    <>
      <div
        onClick={() => setNav(!nav)}
        className="p-1 px-2 rounded-md bg-[#2e2446] text-white hover:bg-[#7432ff] cursor-pointer fixed right-10 bottom-10"
      >
        {nav ? (
          <IoMdClose size={30} className="mt-[2px]" />
        ) : (
          <IoSettingsSharp size={30} className="mt-[2px]" />
        )}
      </div>

      <div
        className={clsxm(
          "fixed top-0 right-0 w-[949px] bg-black h-full transform transition-transform duration-300 ease-in-out z-50",
          nav ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative pt-16 px-6">
          {nav && (
            <div
              onClick={() => setNav(false)}
              className="absolute top-2 left-2 p-1 rounded-full bg-[#2e2446] text-white cursor-pointer hover:bg-[#7432ff]"
            >
              <IoMdClose size={25} />
            </div>
          )}
          <div className="flex gap-6">
            <div className="w-[300px]">
              
              <div
                className={`p-2 mb-2 ${
                  activeFilter === "clock"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick("clock")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <BsClockFill size={20} />
                  Theme
                </p>
              </div>
              <div
                className={`p-2 mb-2 ${
                  activeFilter === "focus-timer"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick("focus-timer")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <RiTimerFill size={20} />
                  Sound
                </p>
              </div>
              <div
                className={`p-2 mb-2 ${
                  activeFilter === "stats"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick("stats")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <ImStatsDots size={20} />
                  Timer
                </p>
              </div>
              <div
                className={`p-2 mb-2 ${
                  activeFilter === "music"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick("music")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <IoHeadsetSharp size={20} />
                  Quote
                </p>
              </div>
              <div
                className={`p-2 mb-2 ${
                  activeFilter === "sounds"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick("sounds")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <FaCloudShowersHeavy size={20} />
                  Task
                </p>
              </div>
              
            </div>

            <div className="h-64 w-[1px] bg-gray-700"></div>
            <div className="w-full h-[calc(100vh-6rem)] overflow-auto mb-10">
              <div className="">
                {/* Content based on active filter */}
                {activeFilter === "home-theme" && (
                  <div className="">
                    {" "}
                    <div />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
