"use client";
import React, { useState, useEffect } from "react";
import { FaUndo } from "react-icons/fa";
import { Howl, Howler } from "howler";
import "@/app/styles/globals.css";
import { IoSettingsOutline, IoClose } from "react-icons/io5";
import { RiCheckLine } from "react-icons/ri";
import { GoPlay } from "react-icons/go";
import { FaRegStopCircle } from "react-icons/fa";
import Modal from "@/components/Modal";

interface Task {
  title: string;
  description: string;
}

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

const Second25 = () => {
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(25);

  const initialTime =
    selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds;
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FE8101");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [soundInstance, setSoundInstance] = useState<Howl | null>(null);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState<Task | null>(null); // Menyimpan satu tugas
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [showInput, setShowInput] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedSound, setSelectedSound] = useState(soundData[0].src);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSound = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSound(event.target.value);
  };

  const notifyTimerFinished = () => {
    setIsModalOpen(true); // Buka modal ketika timer selesai
    playSound();
  };

  const closeModal = () => {
    stopSound(); // Hentikan suara ketika modal ditutup
    setIsModalOpen(false);
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

  useEffect(() => {
    let intervalId: number | null = null; // Set explicit type as number or null

    if (isActive && seconds > 0) {
      intervalId = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isPlaying) {
      setIsActive(false);

      if (intervalId !== null) {
        clearInterval(intervalId); // Ensure intervalId is not null before calling clearInterval
      }

      playSound();
      notifyTimerFinished();
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId); // Ensure intervalId is not null before calling clearInterval
      }
    };
  }, [isActive, seconds]);

  useEffect(() => {
    setSeconds(initialTime);
  }, [selectedHours, selectedMinutes, selectedSeconds]);

  function resetTimer() {
    setSeconds(initialTime);
    setIsActive(false);
  }

  function toggleTimer() {
    if (isPlaying === false) {
      setIsPlaying(true);
    }

    setIsActive((prev) => !prev);
  }

  const formatTime = (secs: number): string => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = Math.floor(secs % 60);
    return `${hours < 10 ? "0" : ""}${hours} : ${
      minutes < 10 ? "0" : ""
    }${minutes} : ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const [alertVolume, setAlertVolume] = useState(1); // Default volume set to 1 (max)

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setAlertVolume(newVolume);
    Howler.volume(newVolume); // Set global volume for Howler
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuestionMarkClick2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [isModalVisible2, setModalVisible2] = useState(false);

  const handleSaveNote = () => {
    if (selectedTaskIndex !== null) {
      // Mengedit task yang sudah ada
      setTask({ title, description });
    } else {
      // Menambah task baru
      if (title.trim()) {
        const newTask: Task = { title, description: description.trim() };
        setTask(newTask); // Menyimpan hanya satu tugas
      }
    }
    setTitle("");
    setDescription("");
    setShowInput(false);
    setSelectedTaskIndex(null);

    // Menutup modal setelah menyimpan
    setModalVisible2(false);
  };

  return (
    <div>
      <div className="relative w-full p-6 py-10 rounded-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center text-white gap-2 mt-12 mb-8 text-[28px]">
            {task && task.title}
          </div>
          <p
            className="font-alarm-clock text-[60px] md:text-[160px] text-[#ff9100] text-center leading-none"
            style={{ color: selectedColor }}
          >
            {formatTime(seconds)}
          </p>

          <div className="flex justify-center gap-[330px] ">
            <div className="flex flex-col items-center">
              <div className="flex gap-10">
                <button
                  className="text-[40px] bg-transparent text-[#ff9100]"
                  style={{ color: selectedColor }}
                  onClick={() => setSelectedHours((prev) => prev + 1)}
                  disabled={isActive}
                >
                  +
                </button>
                <button
                  className="text-[40px] bg-transparent text-[#ff9100]"
                  style={{ color: selectedColor }}
                  onClick={() =>
                    setSelectedHours((prev) => (prev > 0 ? prev - 1 : 0))
                  }
                  disabled={isActive}
                >
                  -
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-10">
                <button
                  className="text-[40px] bg-transparent text-[#ff9100]"
                  style={{ color: selectedColor }}
                  onClick={() => setSelectedMinutes((prev) => prev + 1)}
                  disabled={isActive}
                >
                  +
                </button>
                <button
                  className="text-[40px] bg-transparent text-[#ff9100]"
                  style={{ color: selectedColor }}
                  onClick={() =>
                    setSelectedMinutes((prev) => (prev > 0 ? prev - 1 : 0))
                  }
                  disabled={isActive}
                >
                  -
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-10">
                <button
                  className="text-[40px] bg-transparent text-[#ff9100]"
                  style={{ color: selectedColor }}
                  onClick={() => setSelectedSeconds((prev) => prev + 1)}
                  disabled={isActive}
                >
                  +
                </button>
                <button
                  className="text-[40px] bg-transparent text-[#ff9100]"
                  style={{ color: selectedColor }}
                  onClick={() =>
                    setSelectedSeconds((prev) => (prev > 0 ? prev - 1 : 0))
                  }
                  disabled={isActive}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          <div className="p-2 flex justify-center py-4 mt-4 gap-4">
            <button
              className="p-3 rounded-full text-[#FE8101] border border-[#FE8101]"
              onClick={resetTimer}
            >
              <FaUndo size={20} />
            </button>
            <button
              className={`p-2 rounded-full text-[#FE8101] border border-[#FE8101] font-semibold px-6 min-w-[100px]`}
              onClick={toggleTimer}
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleQuestionMarkClick2}
              className="p-3 rounded-full text-[#FE8101] border border-[#FE8101]"
            >
              <IoSettingsOutline size={20} />
            </button>
            {isModalVisible2 && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 md:p-0 p-5">
                <div className="bg-white/30 backdrop-blur-lg rounded-md max-w-[400px] w-full transition-transform ease-out duration-300 relative">
                  <IoClose
                    size={32}
                    className="absolute top-2 right-2 cursor-pointer text-[#FE8101] mt-2"
                    onClick={handleQuestionMarkClick2}
                  />
                  <div className="bg-transparent p-5 md:flex justify-center items-center rounded-t-md mb-6"></div>

                  <div className="relative overflow-y-auto max-h-[80vh] p-5">
                    <div className=" container md:w-full w-full">
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
                        <p className="text-[20px] font-semibold">Sound</p>
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
                      <hr
                        className="mt-5 mb-5"
                        style={{ backgroundColor: "#A8A8A8", height: "1px" }}
                      />
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full text-[#000] bg-[#FE8101] border border-[#FE8101]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#000000"
                            viewBox="0 0 256 256"
                          >
                            <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path>
                          </svg>
                        </div>
                        <p className="text-[20px] font-semibold">Color</p>
                      </div>
                      <div className="grid grid-cols-6 gap-5">
                        <div
                          className={`p-3 bg-[#FE8101] rounded-md ${
                            selectedColor === "#FE8101" &&
                            "border-2 border-gray-800"
                          }`}
                          onClick={() => handleColorChange("#FE8101")}
                        >
                          {selectedColor === "#FE8101" && (
                            <RiCheckLine className="text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 bg-[#FFB409] rounded-md ${
                            selectedColor === "#FFB409" &&
                            "border-2 border-gray-800"
                          }`}
                          onClick={() => handleColorChange("#FFB409")}
                        >
                          {selectedColor === "#FFB409" && (
                            <RiCheckLine className="text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 bg-[#FCDB02] rounded-md ${
                            selectedColor === "#FCDB02" &&
                            "border-2 border-gray-800"
                          }`}
                          onClick={() => handleColorChange("#FCDB02")}
                        >
                          {selectedColor === "#FCDB02" && (
                            <RiCheckLine className="text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 bg-[#06DD5E] rounded-md ${
                            selectedColor === "#06DD5E" &&
                            "border-2 border-gray-800"
                          }`}
                          onClick={() => handleColorChange("#06DD5E")}
                        >
                          {selectedColor === "#06DD5E" && (
                            <RiCheckLine className="text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 bg-[#EBE3D8] rounded-md ${
                            selectedColor === "#EBE3D8" &&
                            "border-2 border-gray-800"
                          }`}
                          onClick={() => handleColorChange("#EBE3D8")}
                        >
                          {selectedColor === "#EBE3D8" && (
                            <RiCheckLine className="text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 bg-[#E86BB9] rounded-md ${
                            selectedColor === "#E86BB9" &&
                            "border-2 border-gray-800"
                          }`}
                          onClick={() => handleColorChange("#E86BB9")}
                        >
                          {selectedColor === "#E86BB9" && (
                            <RiCheckLine className="text-white" />
                          )}
                        </div>
                      </div>
                      <hr
                        className="mt-5 mb-5"
                        style={{ backgroundColor: "#A8A8A8", height: "1px" }}
                      />
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full text-[#000] bg-[#FE8101] border border-[#FE8101]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#000000"
                            viewBox="0 0 256 256"
                          >
                            <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,144H32V64H224V192ZM48,136a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H56A8,8,0,0,1,48,136Zm160,0a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h96A8,8,0,0,1,208,136Zm-48,32a8,8,0,0,1-8,8H56a8,8,0,0,1,0-16h96A8,8,0,0,1,160,168Zm48,0a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16h16A8,8,0,0,1,208,168Z"></path>
                          </svg>
                        </div>
                        <p className="text-[20px] font-semibold">Title</p>
                      </div>
                      <input
                        className="mb-4 pl-2 p-2 py-2 rounded-md w-full bg-transparent border border-[#FE8101] text-white font-lexend px-[210px]"
                        id="name"
                        type="text"
                        placeholder="enter your task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveNote}
                          className="p-2 bg-[#ffbe18] cursor-pointer text-gray-700 rounded-md font-lexend"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Second25;
