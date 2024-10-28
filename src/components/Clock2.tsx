"use client";
import React, { useState, useEffect, useRef } from "react";
import "react-clock/dist/Clock.css";
import dynamic from "next/dynamic";
import "@/app/styles/globals.css";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import clsxm from "@/lib/clsxm";
import { RiTimerFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { useFont } from "./FontContext";

const Clock = dynamic(() => import("react-clock"), {
  ssr: false,
});

const Clock2: React.FC = () => {
  const [dateNow, setDateNow] = useState(new Date());
  const [nav, setNav] = useState(false);
  const [bgImage, setBgImage] = useState(
    "https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter2, setActiveFilter2] = useState<string>("clock");
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  const [currentAudioText, setCurrentAudioText] = useState<string>("");
  const [audio1, setAudio1] = useState<HTMLAudioElement | null>(null);
  const [audio2, setAudio2] = useState<HTMLAudioElement | null>(null);
  const [audio3, setAudio3] = useState<HTMLAudioElement | null>(null);

  const { selectedFont, setSelectedFont } = useFont();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio1(new Audio("/sound/love.mp3"));
      setAudio2(new Audio("/sound/morning.mp3"));
      setAudio3(new Audio("/sound/moonlight.mp3"));
    }
  }, []);

  const togglePlay = (audioNumber: number) => {
    if (audioNumber === 1 && audio1) {
      if (activeAudio === 1) {
        audio1.pause();
        setActiveAudio(null);
        setCurrentAudioText("");
      } else {
        if (audio2 && activeAudio === 2) {
          audio2.pause();
        }
        if (audio3 && activeAudio === 3) {
          audio3.pause();
        }
        audio1.play();
        setActiveAudio(1);
        setCurrentAudioText("Lavender Mountains");
      }
    } else if (audioNumber === 2 && audio2) {
      if (activeAudio === 2) {
        audio2.pause();
        setActiveAudio(null);
        setCurrentAudioText("");
      } else {
        if (audio1 && activeAudio === 1) {
          audio1.pause();
        }
        if (audio3 && activeAudio === 3) {
          audio3.pause();
        }
        audio2.play();
        setActiveAudio(2);
        setCurrentAudioText("Starfall Night Sky");
      }
    } else if (audioNumber === 3 && audio3) {
      if (activeAudio === 3) {
        audio3.pause();
        setActiveAudio(null);
        setCurrentAudioText("");
      } else {
        if (audio1 && activeAudio === 1) {
          audio1.pause();
        }
        if (audio2 && activeAudio === 2) {
          audio2.pause();
        }
        audio3.play();
        setActiveAudio(3);
        setCurrentAudioText("Majestic Mountain");
      }
    }
  };

  const handleFilterClick2 = (filter: string) => {
    setActiveFilter2(filter);
    switch (filter) {
      case "clock":
        break;
      case "focus-timer":
        break;
      case "stats":
        break;
      case "music":
        break;
      case "sounds":
        break;
      default:
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBgChange = (image: string) => {
    setBgImage(image);
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Pastikan tombol tetap terlihat saat fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const formatTime = (time: Date): JSX.Element => {
    if (!time) return <></>;

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formattedTime = time.toLocaleTimeString([], options);
    const formattedDate = time.toLocaleDateString([], dateFormatOptions);

    return (
      <div className="text-center">
        <span className="font-bold text-gray-800">
          <span
            className={`text-[70px] md:text-[48px] text-[#ff5c5c] ${selectedFont}`}
          >
            {formattedTime}
          </span>
        </span>
        <div
          className={`mt-2 text-xl font-semibold text-white ${selectedFont}`}
        >
          {formattedDate}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-no-repeat bg-center w-full p-6 py-48"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "1100px",
        }}
      >
        <div className="p-1 rounded-2xl mt-10 py-20">
          <div className="clock-container mx-auto">
            <Clock className="mx-auto" value={dateNow} size={200} />
            <div className="mt-5">{formatTime(dateNow)}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 fixed right-10 bottom-10 z-50">
        <div
          onClick={() => setNav(!nav)}
          className="p-1 px-2 rounded-md bg-[#2e2446] text-white hover:bg-[#7432ff] cursor-pointer"
        >
          {nav ? (
            <IoMdClose size={30} className="mt-[2px]" />
          ) : (
            <IoSettingsSharp size={30} className="mt-[2px]" />
          )}
        </div>
        <div className="p-1 px-2 rounded-md bg-[#2e2446] text-white hover:bg-[#7432ff] cursor-pointer">
          <MdOutlineZoomOutMap size={30} onClick={handleFullScreen} />
        </div>
      </div>
      <div
        className={clsxm(
          "fixed top-0 right-0 md:w-[949px] w-[390px] bg-black h-full transform transition-transform duration-300 ease-in-out z-50",
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
          <div className="md:flex gap-6 sm:hidden hidden">
            <div className="w-[300px]">
              <div
                className={`p-2 mb-2 ${
                  activeFilter2 === "clock"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick2("clock")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path>
                  </svg>
                  Theme
                </p>
              </div>
              <div
                className={`p-2 mb-2 ${
                  activeFilter2 === "stats"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick2("stats")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88,88,0,0,1,128,40h.67a87.71,87.71,0,0,1,87,80H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h16a24,24,0,0,0,24-24V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm152,48a8,8,0,0,1-8,8H192a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24Z"></path>
                  </svg>
                  Music Background
                </p>
              </div>
              <div
                className={`p-2 mb-2 ${
                  activeFilter2 === "sounds"
                    ? "bg-[#343434] text-white font-semibold rounded-md"
                    : " text-white font-semibold hover:bg-[#343434] rounded-md"
                }`}
                onClick={() => handleFilterClick2("sounds")}
              >
                <p className="text-[14px] flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M87.24,52.59a8,8,0,0,0-14.48,0l-64,136a8,8,0,1,0,14.48,6.81L39.9,160h80.2l16.66,35.4a8,8,0,1,0,14.48-6.81ZM47.43,144,80,74.79,112.57,144ZM200,96c-12.76,0-22.73,3.47-29.63,10.32a8,8,0,0,0,11.26,11.36c3.8-3.77,10-5.68,18.37-5.68,13.23,0,24,9,24,20v3.22A42.76,42.76,0,0,0,200,128c-22.06,0-40,16.15-40,36s17.94,36,40,36a42.73,42.73,0,0,0,24-7.25,8,8,0,0,0,16-.75V132C240,112.15,222.06,96,200,96Zm0,88c-13.23,0-24-9-24-20s10.77-20,24-20,24,9,24,20S213.23,184,200,184Z"></path>
                  </svg>
                  Font
                </p>
              </div>
            </div>

            <div className="h-64 w-[1px] bg-gray-700"></div>
            <div className="w-full h-[calc(100vh-6rem)] overflow-auto mb-10">
              <div className="">
                {activeFilter2 === "clock" && (
                  <div className="">
                    <p className="text-[32px] font-semibold text-white mb-3">
                      Focus Theme
                    </p>
                    <p className="text-[16px] mb-5 text-[#a0a0a0]">
                      Pick your theme to appear in Home. To see a live preview,
                      ensure your dashboard toggle is set to Home, then come
                      back to this Settings tab.
                    </p>
                    <p className="text-[24px] font-semibold mb-5 text-white">
                      Gradients & Colors
                    </p>
                    <div className="grid grid-cols-3 gap-3 w-[550px] mb-10">
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          Lavender Mountains
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          starfall night sky
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          majestic mountain
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-3.jpg?updatedAt=1730046234490"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-3.jpg?updatedAt=1730046234490"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-3.jpg?updatedAt=1730046234490')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          deep forest
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-4.jpg?updatedAt=1730046311665"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-4.jpg?updatedAt=1730046311665"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-4.jpg?updatedAt=1730046311665')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          ocean waves
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-5.jpg?updatedAt=1730046382988"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-5.jpg?updatedAt=1730046382988"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-5.jpg?updatedAt=1730046382988')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          purple mountain night
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-6.jpg?updatedAt=1730046458283"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-6.jpg?updatedAt=1730046458283"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-6.jpg?updatedAt=1730046458283')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          purple desert
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-7.jpg?updatedAt=1730046526534"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-7.jpg?updatedAt=1730046526534"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-7.jpg?updatedAt=1730046526534')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          aesthetic grey plants
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-8.jpg?updatedAt=1730046592274"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-8.jpg?updatedAt=1730046592274"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-8.jpg?updatedAt=1730046592274')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          norway house misty
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-9.jpg?updatedAt=1730046674535"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-9.jpg?updatedAt=1730046674535"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-9.jpg?updatedAt=1730046674535')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          solar elipse
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-10.jpg?updatedAt=1730046755296"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-10.jpg?updatedAt=1730046755296"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-10.jpg?updatedAt=1730046755296')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          purple sky
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-12.jpg?updatedAt=1730046838046"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-12.jpg?updatedAt=1730046838046"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-12.jpg?updatedAt=1730046838046')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          sunset cityscape
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-13.jpg?updatedAt=1730046906839"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-13.jpg?updatedAt=1730046906839"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-13.jpg?updatedAt=1730046906839')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          sunset field
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-14.jpg?updatedAt=1730046977232"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-14.jpg?updatedAt=1730046977232"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-14.jpg?updatedAt=1730046977232')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          nature landscape
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-15.jpg?updatedAt=1730047049349"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-15.jpg?updatedAt=1730047049349"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-15.jpg?updatedAt=1730047049349')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          house in mountain
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-16.jpg?updatedAt=1730047115523"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-16.jpg?updatedAt=1730047115523"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-16.jpg?updatedAt=1730047115523')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          fireplace in winter
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-17.jpg?updatedAt=1730047181847"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-17.jpg?updatedAt=1730047181847"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-17.jpg?updatedAt=1730047181847')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          japanese garden
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() =>
                            handleBgChange(
                              "https://ik.imagekit.io/qu50ggaiv/bg-18.jpg?updatedAt=1730047318160"
                            )
                          }
                          className={`w-50 h-32 border rounded ${
                            bgImage ===
                            "https://ik.imagekit.io/qu50ggaiv/bg-18.jpg?updatedAt=1730047318160"
                              ? "border-2 border-[#ffbe18]"
                              : "border-white"
                          }`}
                          style={{
                            backgroundImage:
                              "url('https://ik.imagekit.io/qu50ggaiv/bg-18.jpg?updatedAt=1730047318160')",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <p className="text-center text-[14px] font-medium mt-2 text-white">
                          Totoro
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {activeFilter2 === "stats" && (
                  <div className="">
                    <p className="text-[32px] font-semibold text-white mb-3">
                      Msuic
                    </p>
                    <p className="text-[16px] mb-5 text-[#a0a0a0]">
                      Pick your theme to appear in Home. To see a live preview,
                      ensure your dashboard toggle is set to Home, then come
                      back to this Settings tab.
                    </p>
                    <p className="text-[24px] font-semibold mb-5 text-white">
                      Gradients & Colors
                    </p>
                    <div className="grid grid-cols-3 gap-5">
                      {/* Gambar pertama dengan suara pertama */}
                      <div
                        className={`border ${
                          activeAudio === 1
                            ? "border-[#FE8101]"
                            : "border-gray-200"
                        } rounded-lg p-3`}
                      >
                        <div className="relative group">
                          <Image
                            src="https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
                            width={175}
                            height={125}
                            alt=""
                            priority
                            className="rounded-md w-50 h-32 transition duration-300 ease-in-out group-hover:brightness-75"
                          />
                          <p className="text-center text-[14px] font-medium mt-2 text-white">
                            Lavender Mountains
                          </p>
                          <button
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            onClick={() => togglePlay(1)}
                          >
                            {activeAudio === 1 ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                              >
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Gambar kedua dengan suara kedua */}
                      <div
                        className={`border ${
                          activeAudio === 2
                            ? "border-[#FE8101]"
                            : "border-gray-200"
                        } rounded-lg p-3`}
                      >
                        <div className="relative group">
                          <Image
                            src="https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529"
                            width={175}
                            height={125}
                            alt=""
                            priority
                            className="rounded-md w-50 h-32 transition duration-300 ease-in-out group-hover:brightness-75"
                          />
                          <p className="text-center text-[14px] font-medium mt-2 text-white">
                            Starfall Night Sky
                          </p>
                          <button
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            onClick={() => togglePlay(2)}
                          >
                            {activeAudio === 2 ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                              >
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Gambar ketiga dengan suara ketiga */}
                      <div
                        className={`border ${
                          activeAudio === 3
                            ? "border-[#FE8101]"
                            : "border-gray-200"
                        } rounded-lg p-3`}
                      >
                        <div className="relative group">
                          <Image
                            src="https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735"
                            width={175}
                            height={125}
                            alt=""
                            priority
                            className="rounded-md w-50 h-32 transition duration-300 ease-in-out group-hover:brightness-75"
                          />
                          <p className="text-center text-[14px] font-medium mt-2 text-white">
                            Majestic Mountain
                          </p>
                          <button
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            onClick={() => togglePlay(3)}
                          >
                            {activeAudio === 3 ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                              >
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Menampilkan informasi tentang audio aktif */}
                    <div className="flex items-center gap-5 mt-10">
                      {activeAudio && (
                        <div className="bg-black text-white text-xs p-1">
                          Background music - {currentAudioText}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeFilter2 === "sounds" && (
                  <div className="">
                    <p className="text-[32px] font-semibold text-white mb-3">
                      Font
                    </p>
                    <p className="text-[16px] mb-5 text-[#a0a0a0]">
                      Pick your theme to appear in Home. To see a live preview,
                      ensure your dashboard toggle is set to Home, then come
                      back to this Settings tab.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        className={`p-2 rounded-md border border-white text-white ${
                          selectedFont === "font-alarm-clock"
                            ? "bg-[#ffbe18]"
                            : ""
                        }`}
                        onClick={() => setSelectedFont("font-alarm-clock")}
                      >
                        Digital Clock
                      </button>
                      <button
                        className={`p-2 rounded-md border border-white text-white ${
                          selectedFont === "space-grotesk" ? "bg-[#ffbe18]" : ""
                        }`}
                        onClick={() => setSelectedFont("space-grotesk")}
                      >
                        Space Grotesk
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="2xl:hidden xl:hidden lg:hidden md:hidden">
            <div className="w-full h-[calc(100vh-6rem)] overflow-auto mb-10">
              <div className="">
                <p className="text-[32px] font-semibold text-white mb-3">
                  Focus Theme
                </p>
                <p className="text-[16px] mb-5 text-[#a0a0a0]">
                  Pick your theme to appear in Home. To see a live preview,
                  ensure your dashboard toggle is set to Home, then come back to
                  this Settings tab.
                </p>
                <p className="text-[24px] font-semibold mb-5 text-white">
                  Gradients & Colors
                </p>
                <div className="grid grid-cols-2 gap-3 w-[342px] mb-10">
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      Lavender Mountains
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      starfall night sky
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      majestic mountain
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-3.jpg?updatedAt=1730046234490"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-3.jpg?updatedAt=1730046234490"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-3.jpg?updatedAt=1730046234490')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      deep forest
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-4.jpg?updatedAt=1730046311665"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-4.jpg?updatedAt=1730046311665"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-4.jpg?updatedAt=1730046311665')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      ocean waves
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-5.jpg?updatedAt=1730046382988"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-5.jpg?updatedAt=1730046382988"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-5.jpg?updatedAt=1730046382988')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      purple mountain night
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-6.jpg?updatedAt=1730046458283"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-6.jpg?updatedAt=1730046458283"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-6.jpg?updatedAt=1730046458283')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      purple desert
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-7.jpg?updatedAt=1730046526534"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-7.jpg?updatedAt=1730046526534"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-7.jpg?updatedAt=1730046526534')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      aesthetic grey plants
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-8.jpg?updatedAt=1730046592274"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-8.jpg?updatedAt=1730046592274"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-8.jpg?updatedAt=1730046592274')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      norway house misty
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-9.jpg?updatedAt=1730046674535"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-9.jpg?updatedAt=1730046674535"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-9.jpg?updatedAt=1730046674535')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      solar elipse
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-10.jpg?updatedAt=1730046755296"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-10.jpg?updatedAt=1730046755296"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-10.jpg?updatedAt=1730046755296')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      purple sky
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-12.jpg?updatedAt=1730046838046"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-12.jpg?updatedAt=1730046838046"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-12.jpg?updatedAt=1730046838046')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      sunset cityscape
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-13.jpg?updatedAt=1730046906839"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-13.jpg?updatedAt=1730046906839"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-13.jpg?updatedAt=1730046906839')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      sunset field
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-14.jpg?updatedAt=1730046977232"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-14.jpg?updatedAt=1730046977232"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-14.jpg?updatedAt=1730046977232')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      nature landscape
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-15.jpg?updatedAt=1730047049349"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-15.jpg?updatedAt=1730047049349"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-15.jpg?updatedAt=1730047049349')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      house in mountain
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-16.jpg?updatedAt=1730047115523"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-16.jpg?updatedAt=1730047115523"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-16.jpg?updatedAt=1730047115523')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      fireplace in winter
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-17.jpg?updatedAt=1730047181847"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-17.jpg?updatedAt=1730047181847"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-17.jpg?updatedAt=1730047181847')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      japanese garden
                    </p>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        handleBgChange(
                          "https://ik.imagekit.io/qu50ggaiv/bg-18.jpg?updatedAt=1730047318160"
                        )
                      }
                      className={`w-50 h-32 border rounded ${
                        bgImage ===
                        "https://ik.imagekit.io/qu50ggaiv/bg-18.jpg?updatedAt=1730047318160"
                          ? "border-2 border-[#ffbe18]"
                          : "border-white"
                      }`}
                      style={{
                        backgroundImage:
                          "url('https://ik.imagekit.io/qu50ggaiv/bg-18.jpg?updatedAt=1730047318160')",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <p className="text-center text-[14px] font-medium mt-2 text-white">
                      Totoro
                    </p>
                  </div>
                </div>
              </div>
              <hr
                className="mt-5 mb-5"
                style={{ backgroundColor: "#EBE3D8", height: "1px" }}
              />
              <div className="">
                <p className="text-[32px] font-semibold text-white mb-3">
                  Music Background
                </p>
                <p className="text-[16px] mb-5 text-[#a0a0a0]">
                  Pick your theme to appear in Home. To see a live preview,
                  ensure your dashboard toggle is set to Home, then come back to
                  this Settings tab.
                </p>
                <p className="text-[24px] font-semibold mb-5 text-white">
                  Gradients & Colors
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Gambar pertama dengan suara pertama */}
                  <div
                    className={`border ${
                      activeAudio === 1 ? "border-[#FE8101]" : "border-gray-200"
                    } rounded-lg p-3`}
                  >
                    <div className="relative group">
                      <Image
                        src="https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
                        width={175}
                        height={125}
                        alt=""
                        priority
                        className="rounded-md w-50 h-32 transition duration-300 ease-in-out group-hover:brightness-75"
                      />
                      <p className="text-center text-[14px] font-medium mt-2 text-white">
                        Lavender Mountains
                      </p>
                      <button
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        onClick={() => togglePlay(1)}
                      >
                        {activeAudio === 1 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="48"
                            height="48"
                          >
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="48"
                            height="48"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Gambar kedua dengan suara kedua */}
                  <div
                    className={`border ${
                      activeAudio === 2 ? "border-[#FE8101]" : "border-gray-200"
                    } rounded-lg p-3`}
                  >
                    <div className="relative group">
                      <Image
                        src="https://ik.imagekit.io/qu50ggaiv/bg-1.gif?updatedAt=1730045979529"
                        width={175}
                        height={125}
                        alt=""
                        priority
                        className="rounded-md w-50 h-32 transition duration-300 ease-in-out group-hover:brightness-75"
                      />
                      <p className="text-center text-[14px] font-medium mt-2 text-white">
                        Starfall Night Sky
                      </p>
                      <button
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        onClick={() => togglePlay(2)}
                      >
                        {activeAudio === 2 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="48"
                            height="48"
                          >
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="48"
                            height="48"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Gambar ketiga dengan suara ketiga */}
                  <div
                    className={`border ${
                      activeAudio === 3 ? "border-[#FE8101]" : "border-gray-200"
                    } rounded-lg p-3`}
                  >
                    <div className="relative group">
                      <Image
                        src="https://ik.imagekit.io/qu50ggaiv/bg-2.jpg?updatedAt=1730046108735"
                        width={175}
                        height={125}
                        alt=""
                        priority
                        className="rounded-md w-50 h-32 transition duration-300 ease-in-out group-hover:brightness-75"
                      />
                      <p className="text-center text-[14px] font-medium mt-2 text-white">
                        Majestic Mountain
                      </p>
                      <button
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        onClick={() => togglePlay(3)}
                      >
                        {activeAudio === 3 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="48"
                            height="48"
                          >
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="48"
                            height="48"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menampilkan informasi tentang audio aktif */}
                <div className="flex items-center gap-5 mt-10">
                  {activeAudio && (
                    <div className="bg-black text-white text-xs p-1">
                      Background music - {currentAudioText}
                    </div>
                  )}
                </div>
              </div>
              <hr
                className="mt-5 mb-5"
                style={{ backgroundColor: "#EBE3D8", height: "1px" }}
              />
              <div className="">
                <p className="text-[32px] font-semibold text-white mb-3">
                  Font
                </p>
                <p className="text-[16px] mb-5 text-[#a0a0a0]">
                  Pick your theme to appear in Home. To see a live preview,
                  ensure your dashboard toggle is set to Home, then come back to
                  this Settings tab.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    className={`p-2 rounded-md border border-white text-white ${
                      selectedFont === "font-alarm-clock" ? "bg-[#ffbe18]" : ""
                    }`}
                    onClick={() => setSelectedFont("font-alarm-clock")}
                  >
                    Digital Clock
                  </button>
                  <button
                    className={`p-2 rounded-md border border-white text-white ${
                      selectedFont === "space-grotesk" ? "bg-[#ffbe18]" : ""
                    }`}
                    onClick={() => setSelectedFont("space-grotesk")}
                  >
                    Space Grotesk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock2;
