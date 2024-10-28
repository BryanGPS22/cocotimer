"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdTimer } from "react-icons/md";
import Timer from "@/components/Timer";
import { useTimerSetting } from "@/context/TimerSettingContext";
import { IoIosRefresh } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Howl } from "howler";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";



const FilterCategory2: React.FC = () => {
  const { timerSetting, setTimerSetting } = useTimerSetting();

  const [nav, setNav] = useState(false);
  const [activeFilter2, setActiveFilter2] = useState<string>("focus-theme");

  const [activeFilter, setActiveFilter] = useState<string>("pomodoro");
  const [headerText, setHeaderText] = useState<string>("Pomodoro");
  const [time, setTime] = useState(25 * 60);

  const [stopwatchState, setStopWatchState] = useState<string>("stop");
  const [currentTime, setCurrentTime] = useState<number>(timerSetting.value);
  const [resetState, setResetState] = useState({ status: "", type: "" });

  const [focusTime, setFocusTime] = useState<string>("25");
  const [selectedSound, setSelectedSound] = useState<
    "nilaiClock" | "nilaiBuzzer" | "sound3" | "sound4" | "sound5" | "sound6"
  >("nilaiClock");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundInstance, setSoundInstance] = useState<Howl | null>(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://res.cloudinary.com/dez200jiv/image/upload/v1728494187/cocotimer/purple-sunset.webp"
  ); // To set the background image

  const [repeatTime, setRepeatTime] = useState<number>(0);
  const [value, setValue] = useLocalStorage("task", "");
  const [task, setTask] = useState([]);

  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
  const [openUpdateTaskModal, setOpenUpdateTaskModal] =
    useState<boolean>(false);
  const [updateSelectedId, setUpdateSelectedId] = useState("");

  const sounds = {
    nilaiClock: "/sound/autumn-rain-piano.mp3",
    nilaiBuzzer: "/sound/inspiring-emotional.mp3",
    sound3: "/sound/moonlight-sonata-classical-piano.mp3",
    sound4: "/sound/rain-piano.mp3",
    sound5: "/sound/van-gogh-calm-piano-music.mp3",
    sound6: "/sound/wake-me-up-morning-piano.mp3",
  };

  useEffect(() => {
    setTask(value);
  }, [value]);

  useEffect(() => {
    // Stop the current sound if the selected sound changes
    if (soundInstance) {
      soundInstance.stop();
      setSoundInstance(null);
      setIsPlaying(false);
    }
  }, [selectedSound]);

  // Update taskSetting whenever focusTime, shortBreakTime, or longBreakTime changes
  useEffect(() => {
    handleSave(); // Save the task settings automatically when these values change
  }, [focusTime]);

  const handlePlayPause = () => {
    if (isPlaying && soundInstance) {
      soundInstance.pause();
      setIsPlaying(false);
    } else {
      if (soundInstance) {
        soundInstance.play();
      } else {
        const sound = new Howl({
          src: [sounds[selectedSound]],
          autoplay: true,
          loop: true,
        });
        setSoundInstance(sound);
        sound.play();
      }
      setIsPlaying(true);
    }
  };

  const taskType = {
    pomodoro: {
      timeType: "minute",
      value: parseInt(focusTime),
      sound: "/sound/case-closed.mp3",
      color: "#F25D52",
    },
  };

  const handlePlay = () => {
    setStopWatchState("play");
    setResetState({ ...resetState, status: "no-reset" });
  };

  const handlePause = () => {
    setResetState({ ...resetState, status: "no-reset" });
    setStopWatchState("pause");
  };

  const handleReset = (type: string) => {
    setStopWatchState("stop");
    if (type === "pomodoro") {
      setResetState({
        status: "reset",
        type: "pomodoro",
      });
      return;
    }
    return;
  };

  const handleFilterClick2 = (filter: string) => {
    setActiveFilter2(filter);
    switch (filter) {
      case "focus-theme":
        setHeaderText("Short Break");
        break;
      case "focus-task":
        setHeaderText("Short Break");
        break;
      case "sounds":
        setHeaderText("Short Break");
        break;
      default:
        setHeaderText("focus-theme");
    }
  };

  const handleSelectTimeType = (type: string) => {
    if (type === "pomodoro") {
      setActiveFilter("pomodoro");
      setStopWatchState("stop");
      setResetState({ ...resetState, status: "no-reset" });
      setTimerSetting(taskType.pomodoro);
      return;
    }

    return;
  };

  const handleSave = () => {
    setTimerSetting({
      ...timerSetting,
      pomodoro: {
        ...taskType.pomodoro,
        value: parseInt(focusTime),
      },
    });
    handleSelectTimeType(activeFilter); // Apply changes immediately to the selected task type
  };

  const handleDeleteTask = (id: any) => {
    const filteredData = value.filter((val: { id: any }) => val.id !== id);
    setValue(filteredData);
  };

  const handleUpdateTask = (id: any) => {
    setUpdateSelectedId(id);
    setOpenUpdateTaskModal(true);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  const handleQuestionMarkClick = () => {
    setModalVisible(!isModalVisible);
  };

  const handleQuestionMarkClick2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handleQuestionMarkClick3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  // Function to play sound when timer finishes
  useEffect(() => {
    if (currentTime === 0 && stopwatchState === "play") {
      if (!soundInstance) {
        const sound = new Howl({
          src: [sounds[selectedSound]],
          autoplay: true,
          onend: () => {
            console.log("Sound has finished playing");
          },
        });
        sound.play();
        setSoundInstance(sound);
      } else {
        soundInstance.play();
      }
    }
  }, [currentTime, stopwatchState, soundInstance]);

  const handleBgChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    // Lakukan tindakan lain untuk mengganti background jika diperlukan
  };

  const images = [
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494191/cocotimer/nusa-penida-beach.webp", name: "Nusa Penida Beach" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494186/cocotimer/gate-of-heaven.webp", name: "Gate of Heaven" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494189/cocotimer/raja-ampat-island.webp", name: "Raja Ampat Island" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494185/cocotimer/cloud-forest.webp", name: "Cloud Forest" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494189/cocotimer/tropical-forest.webp", name: "Tropical Forest" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494185/cocotimer/night-thunder.webp", name: "Night Thunder" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494187/cocotimer/purple-sunset.webp", name: "Purple Sunset" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494191/cocotimer/paris-city.webp", name: "Paris City" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494190/cocotimer/linda-flower.webp", name: "Linda Flower" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494191/cocotimer/aurora.webp", name: "Aurora" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494190/cocotimer/chile-river.webp", name: "Chile River" },
    { url: "https://res.cloudinary.com/dez200jiv/image/upload/v1728494187/cocotimer/snow-and-yellow-tree.webp", name: "Snow & Yellow Tree" },
  ];

   const containerRef = useRef<HTMLDivElement>(null);
   const [isFullScreen, setIsFullScreen] = useState(false);

   const handleFullScreen = () => {
     if (containerRef.current) {
       if (document.fullscreenElement) {
         document.exitFullscreen();
       } else {
         containerRef.current.requestFullscreen();
       }
     }
   };

   // Listen for fullscreen change to update the state
   useEffect(() => {
     const handleFullscreenChange = () => {
       setIsFullScreen(!!document.fullscreenElement);
     };

     document.addEventListener("fullscreenchange", handleFullscreenChange);

     return () => {
       document.removeEventListener("fullscreenchange", handleFullscreenChange);
     };
   }, []);

  return (
    <>
      <div className="container mx-auto max-w-[1080px] md:py-10">
        <div
          ref={containerRef}
          className={`relative bg-cover bg-no-repeat bg-center w-full p-6 py-10 md:py-10 rounded-2xl ${
            isFullScreen ? "flex justify-center items-center" : ""
          }`}
          // style={{
          //   backgroundImage: `url(${selectedImage})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="absolute top-0 right-0 m-2">
            <MdOutlineZoomOutMap
              size={50}
              className="text-white cursor-pointer"
              onClick={handleFullScreen}
            />
          </div>
          <div className="relative w-full">
            <div className="bg-cover bg-no-repeat bg-center p-1 rounded-xl">
              <div className={`${isFullScreen ? "text-center" : ""}`}>
                <Timer
                  timerSetting={timerSetting}
                  setTimerSetting={setTimerSetting}
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCategory2;
