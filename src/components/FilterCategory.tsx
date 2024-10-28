"use client";
import React, { useState, useEffect, useRef } from "react";
import { BiSolidCoffee } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { GiTomato } from "react-icons/gi";
import "@/app/styles/globals.css";
import clsxm from "@/lib/clsxm";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import AddTask from "./task/AddTask";
import useLocalStorage from "@/hooks/useLocalStorage";
import EditTask from "./task/EditTask";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaPlus, FaRegStopCircle } from "react-icons/fa";
import { GoPlay } from "react-icons/go";
import { Howl, Howler } from "howler";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Switch } from "@headlessui/react";
import Image from "next/image";

const soundData = [
  {
    id: 1,
    title: "Ocean Wave",
    src: "/sound/ocean-wave.mp3",
    icon: "🌊",
  },
  {
    id: 2,
    title: "Guitar",
    src: "/sound/guitar.mp3",
    icon: "🎸",
  },
  {
    id: 3,
    title: "Piano",
    src: "/sound/piano.mp3",
    icon: "🎹",
  },
  {
    id: 4,
    title: "Violin",
    src: "/sound/violin.mp3",
    icon: "🎻",
  },
  {
    id: 5,
    title: "Cello",
    src: "/sound/cello.mp3",
    icon: "🎻",
  },
  {
    id: 6,
    title: "Lofi Mountain",
    src: "/sound/lofi-mountain.mp3",
    icon: "🏔️",
  },
  {
    id: 7,
    title: "Rain",
    src: "/sound/rain.mp3",
    icon: "🌧️",
  },
  {
    id: 8,
    title: "Bird",
    src: "/sound/bird.mp3",
    icon: "🐦",
  },
  {
    id: 9,
    title: "Love",
    src: "/sound/love.mp3",
    icon: "❤️",
  },
  {
    id: 10,
    title: "Autumn",
    src: "/sound/autumn.mp3",
    icon: "🍂",
  },
  {
    id: 11,
    title: "Inspiring",
    src: "/sound/inspiring.mp3",
    icon: "💫",
  },
  {
    id: 12,
    title: "Moonlight",
    src: "/sound/moonlight.mp3",
    icon: "🌚",
  },
  {
    id: 13,
    title: "Calm",
    src: "/sound/calm.mp3",
    icon: "😌",
  },
  {
    id: 14,
    title: "Morning",
    src: "/sound/morning.mp3",
    icon: "🌅",
  },
];

const FilterCategory: React.FC = () => {
  const [nav, setNav] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("focus");
  const [headerText, setHeaderText] = useState<string>("focus");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(25 * 60);
  const [activeFilter2, setActiveFilter2] = useState<string>("clock");
  const [bgImage, setBgImage] = useState(
    "https://ik.imagekit.io/qu50ggaiv/bg-pomodoro.jpg?updatedAt=1729973274174"
  );
  const [focusTime, setFocusTime] = useState<string>("25");
  const [shortBreakTime, setShortBreakTime] = useState<string>("5");
  const [longBreakTime, setLongBreakTime] = useState<string>("15");

  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
  const [openUpdateTaskModal, setOpenUpdateTaskModal] =
    useState<boolean>(false);
  const [updateSelectedId, setUpdateSelectedId] = useState("");
  const [value, setValue] = useLocalStorage("task", "");
  const [task, setTask] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState(soundData[0].src);
  const [enabled, setEnabled] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);
  const [currentAudioText, setCurrentAudioText] = useState<string>("");
  const [audio1, setAudio1] = useState<HTMLAudioElement | null>(null);
  const [audio2, setAudio2] = useState<HTMLAudioElement | null>(null);
  const [audio3, setAudio3] = useState<HTMLAudioElement | null>(null);
  const [activeAudio, setActiveAudio] = useState<number | null>(null);

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

  const playSound = () => {
    const timerSound = new Howl({
      src: [selectedSound],
      volume: alertVolume,
      loop: false,
    });
    timerSound.play();
  };

  const stopSound = () => {
    Howler.stop();
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      Howler.stop();
    } else {
      playSound();
    }
    setIsPlaying(!isPlaying);
  };

  const [alertVolume, setAlertVolume] = useState(1); // Default volume set to 1 (max)

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setAlertVolume(newVolume);
    Howler.volume(newVolume); // Set global volume for Howler
  };

  const handleUpdateTask = (id: any) => {
    setUpdateSelectedId(id);
    setOpenUpdateTaskModal(true);
  };

  const handleDeleteTask = (id: any) => {
    const filteredData = value.filter((val: { id: any }) => val.id !== id);
    setValue(filteredData);
  };

  useEffect(() => {
    setTask(value);
  }, [value]);

  const handleFilterClick = (filter: string) => {
    if (isActive && !isPaused) return;
    setActiveFilter(filter);

    switch (filter) {
      case "focus":
        setHeaderText("Focus");
        setTime(parseInt(focusTime) * 60 || 25 * 60); // Use focusTime
        break;
      case "short":
        setHeaderText("Short Break");
        setTime(parseInt(shortBreakTime) * 60 || 5 * 60); // Use shortBreakTime
        break;
      case "long":
        setHeaderText("Long Break");
        setTime(parseInt(longBreakTime) * 60 || 15 * 60); // Use longBreakTime
        break;
      default:
        setHeaderText("Focus");
        setTime(parseInt(focusTime) * 60 || 25 * 60); // Default to focus time
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isActive && !isPaused && time > 0) {
      timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            // Timer selesai
            setIsActive(false); // Nonaktifkan timer
            setIsPaused(true); // Kembalikan status ke pause
            return 0; // Set waktu ke 0
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isActive, isPaused, time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleStartPause = () => {
    if (time === 0) {
      setIsActive(false); // Reset status saat timer selesai
      setIsPaused(true);
    } else {
      setIsActive(true);
      setIsPaused(!isPaused);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "focus" | "short" | "long"
  ) => {
    const value = e.target.value;
    if (type === "focus") {
      setFocusTime(value);
      if (activeFilter === "focus") setTime(parseInt(value) * 60 || 25 * 60);
    } else if (type === "short") {
      setShortBreakTime(value);
      if (activeFilter === "short") setTime(parseInt(value) * 60 || 5 * 60);
    } else if (type === "long") {
      setLongBreakTime(value);
      if (activeFilter === "long") setTime(parseInt(value) * 60 || 15 * 60);
    }
  };

  useEffect(() => {
    if (nav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [nav]);

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
      case "bg-music":
        break;
      default:
    }
  };

  const handleBgChange = (image: string) => {
    setBgImage(image);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Pastikan tombol tetap terlihat saat fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // Tambahkan gaya tambahan jika perlu saat fullscreen aktif
      } else {
        // Reset gaya jika keluar dari fullscreen
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <div>
        <div
          ref={containerRef}
          className={`relative bg-cover bg-no-repeat bg-center w-full p-6 md:py-48 py-20 ${
            isFullScreen ? "flex flex-col justify-center items-center" : ""
          }`}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "1100px", // Tambahkan tinggi jika perlu
          }}
        >
          <div className="w-full">
            <div className="">
              <div className="bg-cover bg-no-repeat bg-center p-1 rounded-xl mt-20">
                <div className="">
                  <p className="font-semibold text-3xl text-[#333333] text-center">
                    {headerText}
                  </p>
                </div>

                <div className="container mx-auto w-full mb-10">
                  <div className="">
                    {activeFilter === "focus" && (
                      <div className="md:text-[200px] text-[120px] text-[#ff5c5c] font-alarm-clock text-center rounded-lg">
                        {formatTime(time)}
                      </div>
                    )}
                    {activeFilter === "short" && (
                      <div className="md:text-[200px] text-[120px] text-[#ff5c5c] font-alarm-clock text-center rounded-lg">
                        {formatTime(time)}
                      </div>
                    )}
                    {activeFilter === "long" && (
                      <div className="md:text-[200px] text-[120px] text-[#ff5c5c] font-alarm-clock text-center rounded-lg">
                        {formatTime(time)}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <div className="bg-black-rgba rounded-full flex items-center gap-2 p-2">
                      <GiTomato size={25} className="text-[#fff3e2]" />
                      <GiTomato size={25} className="text-[#fff3e2]" />
                      <GiTomato size={25} className="text-[#fff3e2]" />
                      <GiTomato size={25} className="text-[#fff3e2]" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="p-2 md:flex justify-center rounded-md gap-2 sm:block hidden">
                    <div
                      className={`p-3 py-4 px-6 ${
                        activeFilter === "focus"
                          ? "bg-[#ff5c5c] text-[#fff3e2] font-semibold rounded-md border-2 border-[#fff3e2]"
                          : "text-[#ff5c5c] bg-white border-2 border-[#fff3e2] font-semibold rounded-md"
                      }`}
                      onClick={() => handleFilterClick("focus")}
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <p className="text-sm md:text-md">Focus</p>
                        </div>
                        <div className="flex items-center gap-10">
                          <BiSolidCoffee size={25} />
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-[25px] ${
                                activeFilter === "focus"
                                  ? "text-[#fff3e2]"
                                  : "text-black"
                              }`}
                            >
                              {focusTime} {/* Menggunakan state focusTime */}
                            </p>
                            <span
                              className={`text-md ${
                                activeFilter === "focus"
                                  ? "text-[#fff3e2]"
                                  : "text-gray-300"
                              }`}
                            >
                              min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-3 py-4 px-6 ${
                        activeFilter === "short"
                          ? "bg-[#7684ff] text-[#fff3e2] font-semibold rounded-md border-2 border-[#fff3e2]"
                          : "text-[#7684ff] bg-white border-2 border-[#fff3e2] font-semibold rounded-md"
                      }`}
                      onClick={() => handleFilterClick("short")}
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <p className="text-sm md:text-md">Short Break</p>
                        </div>
                        <div className="flex items-center gap-10">
                          <BiSolidCoffee size={25} />
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-[25px] ${
                                activeFilter === "short"
                                  ? "text-[#fff3e2]"
                                  : "text-black"
                              }`}
                            >
                              {shortBreakTime}{" "}
                              {/* Menggunakan state shortBreakTime */}
                            </p>
                            <span
                              className={`text-md ${
                                activeFilter === "short"
                                  ? "text-[#fff3e2]"
                                  : "text-gray-300"
                              }`}
                            >
                              min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-3 py-4 px-5 ${
                        activeFilter === "long"
                          ? "bg-[#3d3d3d] text-[#fff3e2] font-semibold rounded-md border-2 border-[#fff3e2]"
                          : "text-[#3d3d3d] bg-white border-2 border-[#fff3e2] font-semibold rounded-md"
                      }`}
                      onClick={() => handleFilterClick("long")}
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <p className="text-sm md:text-md">Long Break</p>
                        </div>
                        <div className="flex items-center gap-10">
                          <GiMeditation size={25} />
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-[25px] ${
                                activeFilter === "long"
                                  ? "text-[#fff3e2]"
                                  : "text-black"
                              }`}
                            >
                              {longBreakTime}{" "}
                              {/* Menggunakan state longBreakTime */}
                            </p>
                            <span
                              className={`text-md ${
                                activeFilter === "long"
                                  ? "text-[#fff3e2]"
                                  : "text-gray-300"
                              }`}
                            >
                              min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleStartPause}
                      className={`px-7 text-[20px] font-semibold rounded-xl text-gray-700 ${
                        isPaused
                          ? "bg-[#756f67] text-white hover:bg-[#b24040]"
                          : "bg-[#756f67] text-white hover:bg-[#b24040]"
                      } focus:outline-none`}
                    >
                      {isPaused ? "Start" : "Pause"}
                    </button>
                  </div>
                  <div className="2xl:hidden xl:hidden lg:hidden md:hidden">
                    <div
                      className={`p-3 w-full mb-2 ${
                        activeFilter === "focus"
                          ? "bg-[#ff5c5c] text-[#fff3e2] font-semibold rounded-md"
                          : "text-[#ff5c5c] bg-white font-semibold rounded-md"
                      }`}
                      onClick={() => handleFilterClick("focus")}
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <BiSolidCoffee size={25} />
                            <p className="text-sm md:text-md">Focus</p>
                          </div>

                          <div className="flex items-center gap-10">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-[25px] ${
                                  activeFilter === "focus"
                                    ? "text-[#fff3e2]"
                                    : "text-black"
                                }`}
                              >
                                {focusTime} {/* Menggunakan state focusTime */}
                              </p>
                              <span
                                className={`text-md ${
                                  activeFilter === "focus"
                                    ? "text-[#fff3e2]"
                                    : "text-gray-300"
                                }`}
                              >
                                min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-3 w-full mb-2 ${
                        activeFilter === "short"
                          ? "bg-[#7684ff] text-[#fff3e2] font-semibold rounded-md"
                          : "text-[#7684ff] bg-white font-semibold rounded-md"
                      }`}
                      onClick={() => handleFilterClick("short")}
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <BiSolidCoffee size={25} />
                            <p className="text-sm md:text-md">Short Break</p>
                          </div>

                          <div className="flex items-center gap-10">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-[25px] ${
                                  activeFilter === "short"
                                    ? "text-[#fff3e2]"
                                    : "text-black"
                                }`}
                              >
                                {shortBreakTime}{" "}
                                {/* Menggunakan state shortBreakTime */}
                              </p>
                              <span
                                className={`text-md ${
                                  activeFilter === "short"
                                    ? "text-[#fff3e2]"
                                    : "text-gray-300"
                                }`}
                              >
                                min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-3 w-full mb-2 ${
                        activeFilter === "long"
                          ? "bg-[#3d3d3d] text-[#fff3e2] font-semibold rounded-md"
                          : "text-[#3d3d3d] bg-white font-semibold rounded-md"
                      }`}
                      onClick={() => handleFilterClick("long")}
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GiMeditation size={25} />
                            <p className="text-sm md:text-md">Long Break</p>
                          </div>

                          <div className="flex items-center gap-10">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-[25px] ${
                                  activeFilter === "long"
                                    ? "text-[#fff3e2]"
                                    : "text-black"
                                }`}
                              >
                                {longBreakTime}{" "}
                                {/* Menggunakan state longBreakTime */}
                              </p>
                              <span
                                className={`text-md ${
                                  activeFilter === "long"
                                    ? "text-[#fff3e2]"
                                    : "text-gray-300"
                                }`}
                              >
                                min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleStartPause}
                      className={`px-7 py-2 text-[20px] w-full font-semibold rounded-md text-gray-700 ${
                        isPaused
                          ? "bg-[#756f67] text-white hover:bg-[#b24040]"
                          : "bg-[#756f67] text-white hover:bg-[#b24040]"
                      } focus:outline-none`}
                    >
                      {isPaused ? "Start" : "Pause"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl md:p-14 p-5">
          <div className="mb-20">
            <p className="text-[18px] text-center text-[#EBE3D8]">
              Pomodoro Timer Online
            </p>
            <hr
              className="mt-5 mb-5"
              style={{ backgroundColor: "#EBE3D8", height: "1px" }}
            />

            <p className="text-[16px] text-[#EBE3D8]">
              Are you in trouble to get concentrate on study or work? Don&apos;t
              worry. You need to try our digital Pomodoro timer online right
              now. Our tool is perfect to open on any dekstop PC or mobile
              browser.
            </p>
          </div>
          <div className="mb-20">
            <p className="text-[18px] text-center text-[#EBE3D8]">
              What is Pomodoro Technique?
            </p>
            <hr
              className="mt-5 mb-5"
              style={{ backgroundColor: "#EBE3D8", height: "1px" }}
            />
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              The Pomodoro technique is time management tools that helps convert
              work or study distractions into focus. This method was developed
              by Francesco Cisilio in 1981.
            </p>
            <p className="text-[16px] text-[#EBE3D8]">
              The Pomodoro technique is like a bridge that connects time and
              productivity. Its core process is to bring focus to your desk.
            </p>
          </div>
          <div className="mb-20">
            <p className="text-[18px] text-center text-[#EBE3D8]">
              How Does Pomodoro Timer Work?
            </p>
            <hr
              className="mt-5 mb-5"
              style={{ backgroundColor: "#EBE3D8", height: "1px" }}
            />
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              I created visual step-by-step instructions to make it easier for
              you to understand:
            </p>
          </div>
          <div className="mb-20">
            <p className="text-[18px] text-center text-[#EBE3D8]">
              How to use Our Pomodoro Timer?
            </p>
            <hr
              className="mt-5 mb-5"
              style={{ backgroundColor: "#EBE3D8", height: "1px" }}
            />
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              Here&apos;s how it works:
            </p>
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              Firstly, set up your Pomodoro Theme, Sound, Task, and Background
              Music.
            </p>
            <ul className="ml-4 list-disc text-[#EBE3D8] mb-5">
              <li>
                Click on the setting icon ⚙️ then select 📝 task. Add your task
                to do
              </li>
              <li>
                If you need to customize the time duration, click this icon ⌛
                to edit your focus timer, short break, and long break.
              </li>
              <li>
                Choose our aesthetic color themes 🎨 and relaxing sounds alarm
                📢, and set your background music ♬⋆.˚
              </li>
            </ul>
            <p className="text-[16px] text-[#EBE3D8] font-semibold mb-5">
              Ready to Start
            </p>
            <ul className="ml-4 list-disc text-[#EBE3D8] mb-5">
              <li>Click on the Ready to Start 25-minute button.</li>
              <li>Focus on the task until the sound rings.</li>
              <li>
                When you finish one cycle, the tomato icon will be light orange.
              </li>
              <li>
                Take a short 5-minute break to do something unrelated to work,
                like ship a coffee or take a breath.
              </li>
              <li>Repeat the cycle for four pomodoro.</li>
              <li>
                After you complete 4 Pomodoro cycles, take a break for 15, 20,
                or 30 minutes.
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-[18px] text-center text-[#EBE3D8]">
              What makes our web apps unique?
            </p>
            <hr
              className="mt-5 mb-5"
              style={{ backgroundColor: "#EBE3D8", height: "1px" }}
            />
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              <b>Digital Layout :</b> our digital Pomodoro timer has perfect
              font size and accurate timer.
            </p>
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              <b>Aesthetic Theme : </b>Aesthetic Theme: Choose any aesthetic
              nature theme that looks beautiful for you.
            </p>
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              <b>Sound : </b>Select calming sounds alarm, such as a 🌊Ocean Wave
              🎸Guitar, 🎹Piano, 🎻Violin, 🏔️Lofi Mountain, 🌧️Rain, 🐦Bird
              🍂Autumn, 💫Inspiring, 🌚Moonlight, 😌Calm, 🌅Morning
            </p>
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              <b>Add task and Notes : </b>You can type your task like reading,
              coding, studiying or working then add your note like read
              philosophy book etc.
            </p>
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              <b>UI/UX Design : </b>We frame our pomodoro timer with figma to
              create minimalist, modern design and easy-to-navigate.
            </p>
            <p className="text-[16px] text-[#EBE3D8] mb-5">
              <b>Aesthetic Number & Fonts : </b>With an attractive and aesthetic
              font, we’re confident you’ll enjoy using our timer. That’s why
              we’ve chosen Inter and Space Grotesk fonts.
            </p>
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
                      <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM72,40H184V75.64L178.23,80H77.33L72,76Zm56,78L98.67,96h58.4Zm56,98H72V180l48-36v24a8,8,0,0,0,16,0V144.08l48,36.28Z"></path>
                    </svg>
                    Timer
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
                      <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
                    </svg>
                    Task
                  </p>
                </div>
                <div
                  className={`p-2 mb-2 ${
                    activeFilter2 === "focus-timer"
                      ? "bg-[#343434] text-white font-semibold rounded-md"
                      : " text-white font-semibold hover:bg-[#343434] rounded-md"
                  }`}
                  onClick={() => handleFilterClick2("focus-timer")}
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
                    Sound
                  </p>
                </div>
                <div
                  className={`p-2 mb-2 ${
                    activeFilter2 === "bg-music"
                      ? "bg-[#343434] text-white font-semibold rounded-md"
                      : " text-white font-semibold hover:bg-[#343434] rounded-md"
                  }`}
                  onClick={() => handleFilterClick2("bg-music")}
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
                        Pick your theme to appear in Home. To see a live
                        preview, ensure your dashboard toggle is set to Home,
                        then come back to this Settings tab.
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
                      <div>
                        <p className="text-[32px] font-semibold text-white mb-5">
                          Focus Timer
                        </p>
                        <p className="text-[18px] font-semibold text-white mb-3">
                          Select task mode
                        </p>
                        <div className="grid grid-cols-4 gap-4 w-[550px] mb-10">
                          <div className="">
                            <p className="text-[18px] font-semibold text-white mb-2 text-center">
                              Focus
                            </p>
                            <div className="relative ml-1">
                              <input
                                type="text"
                                placeholder="25"
                                className="pl-2 p-2 rounded-md w-full bg-transparent border-2 border-[#606060] text-white font-semibold"
                                value={focusTime}
                                onChange={(e) => handleInputChange(e, "focus")}
                              />
                              <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-[14px]">
                                Mins
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <p className="text-[18px] font-semibold text-white mb-2 text-center">
                              Short Break
                            </p>
                            <div className="relative ml-1">
                              <input
                                type="text"
                                placeholder="5"
                                className="pl-2 p-2 rounded-md w-full bg-transparent border-2 border-[#606060] text-white font-semibold"
                                value={shortBreakTime}
                                onChange={(e) => handleInputChange(e, "short")}
                              />
                              <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-[14px]">
                                Mins
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <p className="text-[18px] font-semibold text-white mb-2 text-center">
                              Long Break
                            </p>
                            <div className="relative ml-1">
                              <input
                                type="text"
                                placeholder="15"
                                className="pl-2 p-2 rounded-md w-full bg-transparent border-2 border-[#606060] text-white font-semibold"
                                value={longBreakTime}
                                onChange={(e) => handleInputChange(e, "long")}
                              />
                              <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-[14px]">
                                Mins
                              </p>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 py-3 px-6 bg-[#ffbe18] hover:bg-[#f1c145] text-[#201f2a] rounded-xl text-[18px] font-semibold mb-6">
                          Save
                        </button>
                        <div className="flex items-start gap-4 mb-5">
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#555555] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#ffbe18]"
                          >
                            <span
                              aria-hidden="true"
                              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                            />
                          </Switch>
                          <div className="">
                            <div className="flex items-center gap-2">
                              <p className="text-[18px] font-semibold text-white">
                                Auto Start Break
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 mb-5">
                          <Switch
                            checked={enabled2}
                            onChange={setEnabled2}
                            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#555555] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#ffbe18]"
                          >
                            <span
                              aria-hidden="true"
                              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                            />
                          </Switch>
                          <div className="">
                            <div className="flex items-center gap-2">
                              <p className="text-[18px] font-semibold text-white">
                                Auto Start Pomodoro
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 mb-5">
                          <Switch
                            checked={enabled3}
                            onChange={setEnabled3}
                            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#555555] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#ffbe18]"
                          >
                            <span
                              aria-hidden="true"
                              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                            />
                          </Switch>
                          <div className="">
                            <div className="flex items-center gap-2">
                              <p className="text-[18px] font-semibold text-white">
                                Show in-dashboard Pomodoro streak counter
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeFilter2 === "sounds" && (
                    <div className="">
                      <p className="text-[32px] font-semibold text-white mb-3">
                        Focus Theme
                      </p>
                      <p className="text-[16px] mb-5 text-[#a0a0a0]">
                        Pick your theme to appear in Home. To see a live
                        preview, ensure your dashboard toggle is set to Home,
                        then come back to this Settings tab.
                      </p>
                      <p className="text-[24px] font-semibold mb-5 text-white">
                        Gradients & Colors
                      </p>
                      <AddTask
                        closeModal={() => setOpenAddTaskModal(false)}
                        isOpen={openAddTaskModal}
                      />

                      <EditTask
                        isOpen={openUpdateTaskModal}
                        closeModal={() => setOpenUpdateTaskModal(false)}
                        id={updateSelectedId}
                      />

                      <div className="mt-2 max-w-3xl mx-auto p">
                        <p className="text-2xl font-semibold text-white mb-2">
                          Task
                        </p>
                        <hr className="text-white" />

                        <div className="mt-[23px] grid grid-cols-1 gap-2">
                          {task.length > 0
                            ? value.map(
                                (task: { id: string; title: string }) => (
                                  <div
                                    key={task.id}
                                    className="flex items-center justify-between text-lg bg-gray-200 px-5 py-3 border-l-[6px] border-l-gray-900"
                                  >
                                    <p>{task.title}</p>

                                    <div>
                                      <button
                                        onClick={() =>
                                          handleUpdateTask(task.id)
                                        }
                                        className="text-tm-violet rounded-full p-2"
                                      >
                                        <IoMdCreate size={22} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteTask(task.id)
                                        }
                                        className="text-tm-red rounded-full p-2"
                                      >
                                        <IoMdTrash size={22} />
                                      </button>
                                    </div>
                                  </div>
                                )
                              )
                            : null}
                        </div>
                        <button
                          onClick={() => setOpenAddTaskModal(true)}
                          className="w-full bg-white/20 hover:bg-white/35 mt-6 p-4 border-2 border-dashed border-white/35 rounded-xl"
                        >
                          <div className="mx-auto text-white font-medium flex items-center justify-center gap-2">
                            <FaPlus size={16} /> Add Task
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                  {activeFilter2 === "focus-timer" && (
                    <div className="">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full text-[#000] bg-[#FE8101] border border-[#FE8101]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#000000"
                            viewBox="0 0 256 256"
                          >
                            <path d="M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z"></path>
                          </svg>
                        </div>
                        <p className="text-[20px] text-white font-semibold">
                          Sound
                        </p>
                        {isPlaying ? (
                          <FaRegStopCircle
                            size={22}
                            className="text-[#ff9100] ml-2 mt-1 cursor-pointer"
                            onClick={handleTogglePlay}
                          />
                        ) : (
                          <GoPlay
                            size={22}
                            className="text-[#ff9100] ml-2 mt-1 cursor-pointer"
                            onClick={handleTogglePlay}
                          />
                        )}
                      </div>

                      <div className="">
                        <div className="w-full grid grid-cols-2 gap-5">
                          {soundData.map((sound) => (
                            <div
                              key={sound.id}
                              className="flex items-center justify-between"
                            >
                              <button
                                style={{
                                  fontWeight:
                                    selectedSound === sound.src
                                      ? "normal"
                                      : "normal",
                                }}
                                className="text-[14px] text-white flex items-center gap-1"
                                onClick={() => setSelectedSound(sound.src)}
                              >
                                {selectedSound === sound.src && (
                                  <span className="text-[12px]">✔</span>
                                )}
                                <span className="text-[14px]">
                                  {sound.icon}
                                </span>{" "}
                                {/* Ganti dengan icon sesuai sound */}
                                {sound.title}
                              </button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#ffffff"
                                viewBox="0 0 256 256"
                              >
                                <path d="M163.51,24.81a8,8,0,0,0-8.42.88L85.25,80H40A16,16,0,0,0,24,96v64a16,16,0,0,0,16,16H85.25l69.84,54.31A8,8,0,0,0,168,224V32A8,8,0,0,0,163.51,24.81ZM152,207.64,92.91,161.69A7.94,7.94,0,0,0,88,160H40V96H88a7.94,7.94,0,0,0,4.91-1.69L152,48.36ZM208,104v48a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v80a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                      <input
                        type="range"
                        className="w-[200px] mt-4"
                        min="0"
                        max="1"
                        step="0.05"
                        id="alertVolume"
                        name="alertVolume"
                        value={alertVolume} // Bind input value to state
                        onChange={handleVolumeChange} // Add onChange handler
                      />
                    </div>
                  )}
                  {activeFilter2 === "bg-music" && (
                    <div className="">
                      <p className="text-[32px] font-semibold text-white mb-3">
                        Msuic
                      </p>
                      <p className="text-[16px] mb-5 text-[#a0a0a0]">
                        Pick your theme to appear in Home. To see a live
                        preview, ensure your dashboard toggle is set to Home,
                        then come back to this Settings tab.
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
                    ensure your dashboard toggle is set to Home, then come back
                    to this Settings tab.
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
                  <div>
                    <p className="text-[32px] font-semibold text-white mb-5">
                      Focus Timer
                    </p>
                    <p className="text-[18px] font-semibold text-white mb-3">
                      Select task mode
                    </p>
                    <div className="grid grid-cols-3 gap-3 w-[342px] mb-10">
                      <div className="">
                        <p className="text-[18px] font-semibold text-white mb-2 text-center">
                          Focus
                        </p>
                        <div className="relative ml-1">
                          <input
                            type="text"
                            placeholder="25"
                            className="pl-2 p-2 rounded-md w-full bg-transparent border-2 border-[#606060] text-white font-semibold"
                            value={focusTime}
                            onChange={(e) => handleInputChange(e, "focus")}
                          />
                          <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-[14px]">
                            Mins
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-[18px] font-semibold text-white mb-2 text-center">
                          Short Break
                        </p>
                        <div className="relative ml-1">
                          <input
                            type="text"
                            placeholder="5"
                            className="pl-2 p-2 rounded-md w-full bg-transparent border-2 border-[#606060] text-white font-semibold"
                            value={shortBreakTime}
                            onChange={(e) => handleInputChange(e, "short")}
                          />
                          <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-[14px]">
                            Mins
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-[18px] font-semibold text-white mb-2 text-center">
                          Long Break
                        </p>
                        <div className="relative ml-1">
                          <input
                            type="text"
                            placeholder="15"
                            className="pl-2 p-2 rounded-md w-full bg-transparent border-2 border-[#606060] text-white font-semibold"
                            value={longBreakTime}
                            onChange={(e) => handleInputChange(e, "long")}
                          />
                          <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-[14px]">
                            Mins
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 py-3 px-6 bg-[#ffbe18] hover:bg-[#f1c145] text-[#201f2a] rounded-xl text-[18px] font-semibold mb-6">
                      Save
                    </button>
                    <div className="flex items-start gap-4 mb-5">
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#555555] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#ffbe18]"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                      <div className="">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-medium text-white">
                            Auto Start Break
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-5">
                      <Switch
                        checked={enabled2}
                        onChange={setEnabled2}
                        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#555555] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#ffbe18]"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                      <div className="">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-medium text-white">
                            Auto Start Pomodoro
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-5">
                      <Switch
                        checked={enabled3}
                        onChange={setEnabled3}
                        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#555555] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#ffbe18]"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                      <div className="">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-medium text-white">
                            Pomodoro streak counter
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr
                  className="mt-5 mb-5"
                  style={{ backgroundColor: "#EBE3D8", height: "1px" }}
                />
                <div className="">
                  <p className="text-[32px] font-semibold text-white mb-3">
                    Focus Theme
                  </p>
                  <p className="text-[16px] mb-5 text-[#a0a0a0]">
                    Pick your theme to appear in Home. To see a live preview,
                    ensure your dashboard toggle is set to Home, then come back
                    to this Settings tab.
                  </p>
                  <p className="text-[24px] font-semibold mb-5 text-white">
                    Gradients & Colors
                  </p>
                  <AddTask
                    closeModal={() => setOpenAddTaskModal(false)}
                    isOpen={openAddTaskModal}
                  />

                  <EditTask
                    isOpen={openUpdateTaskModal}
                    closeModal={() => setOpenUpdateTaskModal(false)}
                    id={updateSelectedId}
                  />

                  <div className="mt-2 max-w-3xl mx-auto p">
                    <p className="text-2xl font-semibold text-white mb-2">
                      Task
                    </p>
                    <hr className="text-white" />

                    <div className="mt-[23px] grid grid-cols-1 gap-2">
                      {task.length > 0
                        ? value.map((task: { id: string; title: string }) => (
                            <div
                              key={task.id}
                              className="flex items-center justify-between text-lg bg-gray-200 px-5 py-3 border-l-[6px] border-l-gray-900"
                            >
                              <p>{task.title}</p>

                              <div>
                                <button
                                  onClick={() => handleUpdateTask(task.id)}
                                  className="text-tm-violet rounded-full p-2"
                                >
                                  <IoMdCreate size={22} />
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="text-tm-red rounded-full p-2"
                                >
                                  <IoMdTrash size={22} />
                                </button>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    <button
                      onClick={() => setOpenAddTaskModal(true)}
                      className="w-full bg-white/20 hover:bg-white/35 mt-6 p-4 border-2 border-dashed border-white/35 rounded-xl"
                    >
                      <div className="mx-auto text-white font-medium flex items-center justify-center gap-2">
                        <FaPlus size={16} /> Add Task
                      </div>
                    </button>
                  </div>
                </div>
                <hr
                  className="mt-5 mb-5"
                  style={{ backgroundColor: "#EBE3D8", height: "1px" }}
                />
                <div className="">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full text-[#000] bg-[#FE8101] border border-[#FE8101]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z"></path>
                      </svg>
                    </div>
                    <p className="text-[20px] text-white font-semibold">
                      Sound
                    </p>
                    {isPlaying ? (
                      <FaRegStopCircle
                        size={22}
                        className="text-[#ff9100] ml-2 mt-1 cursor-pointer"
                        onClick={handleTogglePlay}
                      />
                    ) : (
                      <GoPlay
                        size={22}
                        className="text-[#ff9100] ml-2 mt-1 cursor-pointer"
                        onClick={handleTogglePlay}
                      />
                    )}
                  </div>

                  <div className="">
                    <div className="w-full grid grid-cols-2 gap-5">
                      {soundData.map((sound) => (
                        <div
                          key={sound.id}
                          className="flex items-center justify-between"
                        >
                          <button
                            style={{
                              fontWeight:
                                selectedSound === sound.src
                                  ? "normal"
                                  : "normal",
                            }}
                            className="text-[14px] text-white flex items-center gap-1"
                            onClick={() => setSelectedSound(sound.src)}
                          >
                            {selectedSound === sound.src && (
                              <span className="text-[12px]">✔</span>
                            )}
                            <span className="text-[14px]">{sound.icon}</span>{" "}
                            {/* Ganti dengan icon sesuai sound */}
                            {sound.title}
                          </button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                          >
                            <path d="M163.51,24.81a8,8,0,0,0-8.42.88L85.25,80H40A16,16,0,0,0,24,96v64a16,16,0,0,0,16,16H85.25l69.84,54.31A8,8,0,0,0,168,224V32A8,8,0,0,0,163.51,24.81ZM152,207.64,92.91,161.69A7.94,7.94,0,0,0,88,160H40V96H88a7.94,7.94,0,0,0,4.91-1.69L152,48.36ZM208,104v48a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v80a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    className="w-[200px] mt-4"
                    min="0"
                    max="1"
                    step="0.05"
                    id="alertVolume"
                    name="alertVolume"
                    value={alertVolume} // Bind input value to state
                    onChange={handleVolumeChange} // Add onChange handler
                  />
                </div>
                <hr
                  className="mt-5 mb-5"
                  style={{ backgroundColor: "#EBE3D8", height: "1px" }}
                />
                <div className="">
                  <p className="text-[32px] font-semibold text-white mb-3">
                    Msuic
                  </p>
                  <p className="text-[16px] mb-5 text-[#a0a0a0]">
                    Pick your theme to appear in Home. To see a live preview,
                    ensure your dashboard toggle is set to Home, then come back
                    to this Settings tab.
                  </p>
                  <p className="text-[24px] font-semibold mb-5 text-white">
                    Gradients & Colors
                  </p>
                  <div className="grid grid-cols-2 gap-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCategory;
