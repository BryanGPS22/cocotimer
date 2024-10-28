"use client";

import React, { useState, useEffect } from "react";
import "@/app/styles/globals.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Howl } from "howler";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa"; // Import FaPause
import Clock2 from "./Clock";

const Alarm = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  const [selectedSounds, setSelectedSounds] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [soundInstance, setSoundInstance] = useState<Howl | null>(null);

  const sounds = {
    rooster: "/sound/rooster.mp3",
    bird: "/sound/parrot-bird.mp3",
    koala: "/sound/koala.mp3",
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const checkAlarm = () => {
      if (isAlarmSet && currentTime.slice(0, 5) === alarmTime) {
        if (!isPlaying) {
          playSelectedSound();
          setIsAlarmRinging(true);
        }
        setIsAlarmSet(false);
      }
    };

    const intervalId = setInterval(checkAlarm, 1000);
    return () => clearInterval(intervalId);
  }, [currentTime, isAlarmSet, alarmTime, isPlaying]);

  const incrementHours = () => setHours((prev) => (prev + 1) % 24);
  const decrementHours = () => setHours((prev) => (prev - 1 + 24) % 24);
  const incrementMinutes = () => setMinutes((prev) => (prev + 1) % 60);
  const decrementMinutes = () => setMinutes((prev) => (prev - 1 + 60) % 60);

  const setAlarm = () => {
    const alarmTimeString = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    setAlarmTime(alarmTimeString);
    setIsAlarmSet(true);
  };

  const cancelAlarm = () => {
    setIsAlarmSet(false);
    setHours(0);
    setMinutes(0);
    stopAlarm();
  };

  const stopAlarm = () => {
    if (soundInstance) {
      soundInstance.stop();
      setIsPlaying(false);
      setSoundInstance(null);
    }
    setIsAlarmRinging(false);
  };

  const handleSoundSelection = (soundKey: string) => {
    const updatedSelectedSounds = new Set(selectedSounds);
    if (updatedSelectedSounds.has(soundKey)) {
      updatedSelectedSounds.delete(soundKey);
    } else {
      updatedSelectedSounds.add(soundKey);
    }
    setSelectedSounds(updatedSelectedSounds);
  };

  const playSelectedSound = () => {
    const soundKeys = Array.from(selectedSounds) as (keyof typeof sounds)[];
    if (soundKeys.length > 0) {
      const sound = new Howl({
        src: [sounds[soundKeys[soundKeys.length - 1]]],
        autoplay: true,
        loop: true,
        volume,
      });
      setSoundInstance(sound);
      sound.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (soundInstance) {
      soundInstance.volume(newVolume);
    }
  };

  const images = [
    {
      src: "https://ik.imagekit.io/qu50ggaiv/Bryan/ai-generated-chicken-picture_23-2150653751.avif?updatedAt=1729627773984",
      text: "Rooster",
      soundKey: "rooster",
    },
    {
      src: "https://ik.imagekit.io/qu50ggaiv/Bryan/sound_cock.png?updatedAt=1729345959025",
      text: "Bird",
      soundKey: "bird",
    },
    {
      src: "https://ik.imagekit.io/qu50ggaiv/Bryan/sound_classic.png?updatedAt=1729346019740",
      text: "Koala",
      soundKey: "koala",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    handleSoundSelection(images[nextIndex].soundKey);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    handleSoundSelection(images[prevIndex].soundKey);
  };

  const togglePlaySound = () => {
    if (isPlaying) {
      stopAlarm(); // Hentikan suara
    } else {
      const soundKey = images[currentIndex].soundKey;
      handleSoundSelection(soundKey); // Pastikan suara yang benar terpilih
      playSelectedSound(); // Mainkan suara
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-[1080px] md:py-10">
        <div className="md:flex items-start gap-4 justify-center">
          <div className="">
            <h1 className="text-[28px] font-source_sans_3 font-semibold text-white text-center mb-6">
              Current Time
            </h1>
            <div className="p-3 bg-[#EBE3D8] rounded-lg w-[288px]">
              <Clock2 />
            </div>
          </div>
          <div className="">
            <h1 className="text-[28px] font-semibold font-source_sans_3 text-white text-center mb-6">
              Wake me up
            </h1>
            <div className="flex justify-center">
              <div className="p-3 bg-[#2c2c2c] rounded-lg w-[370px]">
                <div className="flex justify-between mb-2">
                  <div className="p-1 rounded-md bg-[#464646] px-4">
                    <p className="text-[10px] text-gray-200">Dark Mode</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] text-[#999999] font-source_sans_3">
                      Current Time is:{" "}
                    </p>
                    <p className="ml-2 text-[13px] text-[#999999] font-source_sans_3">
                      {currentTime}
                    </p>
                  </div>
                </div>
                <div className="bg-black p-3 mb-2 mt-4">
                  <p
                    className="text-[#FE8101] text-[90px] text-center font-alarm-clock mt-[]"
                    style={{ lineHeight: "1" }}
                  >
                    {String(hours).padStart(2, "0")}:
                    {String(minutes).padStart(2, "0")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-16 mx-auto w-[290px] mt-6">
                  <div className="flex items-center justify-center gap-3 ml-6">
                    <div
                      className="p-1 rounded-md bg-[#464646]"
                      onClick={isAlarmSet ? undefined : incrementHours}
                    >
                      <FiPlus size={16} className="text-white" />
                    </div>
                    <div
                      className="p-1 rounded-md bg-[#464646]"
                      onClick={isAlarmSet ? undefined : decrementHours}
                    >
                      <FiMinus size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 ml-2">
                    <div
                      className="p-1 rounded-md bg-[#464646]"
                      onClick={isAlarmSet ? undefined : incrementMinutes}
                    >
                      <FiPlus size={16} className="text-white" />
                    </div>
                    <div
                      className="p-1 rounded-md bg-[#464646]"
                      onClick={isAlarmSet ? undefined : decrementMinutes}
                    >
                      <FiMinus size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-3 md:mt-0 mt-6">
            <h1 className="text-[28px] font-source_sans_3 mb-6 font-semibold text-white text-center">
              Sound
            </h1>
            <div className=" gap-6 bg-[#EBE3D8] rounded-lg p-3">
              <div className="flex gap-2 items-center">
                <div className="p-1 rounded-md bg-[#464646]">
                  <IoIosArrowBack
                    className="cursor-pointer text-white"
                    onClick={prevSlide}
                    size={16}
                  />
                </div>
                <div className="relative">
                  <p className="text-center text-white mb-1">
                    {images[currentIndex].text}
                  </p>
                  <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].text}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                </div>
                <div className="p-1 rounded-md bg-[#464646]">
                  <IoIosArrowForward
                    className="cursor-pointer text-white"
                    onClick={nextSlide}
                    size={16}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center mt-2">
                <button
                  onClick={togglePlaySound}
                  className="flex items-center p-2 text-white"
                >
                  {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}{" "}
                  <span className="ml-2 text-[13px]">
                    {isPlaying ? "Stop Sound" : "Preview Sound"}
                  </span>
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          {isAlarmRinging ? (
            <button
              className="py-2 px-4 rounded-lg bg-red-500 text-white"
              onClick={stopAlarm}
            >
              Stop
            </button>
          ) : (
            <button
              className={`py-2 px-4 rounded-lg ${
                isAlarmSet ? "bg-red-500" : "bg-green-500"
              } text-white`}
              onClick={isAlarmSet ? cancelAlarm : setAlarm}
            >
              {isAlarmSet ? "Cancel" : "Set Alarm"}
            </button>
          )}
        </div>
      </div>
      <div className="container mx-auto max-w-4xl md:p-14 p-5">
        <div className="mb-20">
          <p className="text-[18px] text-center text-[#EBE3D8]">
            Alarm Clock Online Aesthetic
          </p>
          <hr
            className="mt-5 mb-5"
            style={{ backgroundColor: "#EBE3D8", height: "1px" }}
          />
          <p className="text-[16px] text-[#EBE3D8]">
            Our aesthetic alarm clock displays the current time in analog
            layout, includes a digital alarm setting, and features sound with an
            image. It&apos;s ready to help you wake up, unwind, and remember
            meeting times or project deadlines.
          </p>
        </div>
        <div className="mb-20">
          <p className="text-[18px] text-center text-[#EBE3D8]">
            How to Use Our Alarm Clock
          </p>
          <hr
            className="mt-5 mb-5"
            style={{ backgroundColor: "#EBE3D8", height: "1px" }}
          />
          <p className="text-[16px] text-[#EBE3D8] mb-5">
            To set your alarm, let&apos;s me explain to you
          </p>
          <ul className="ml-4 list-disc text-[#EBE3D8]">
            <li>
              Click the &apos;+&apos; button to increase the hour or minute.
            </li>
            <li>
              Click the &apos;-&apos; button to decrease the hour or minute.
            </li>
            <li>
              Personalize your alarm sound by choosing from 10 calming options.
            </li>
            <li>
              Click &apos;Preview&apos; to listen to the sound and adjust the
              volume.
            </li>
            <li>Click &apos;Set Alarm&apos; to finalize your settings.</li>
          </ul>
        </div>
        <div className="">
          <p className="text-[18px] text-center text-[#EBE3D8]">
            Key Features of our Aesthetic Alarm Clock Online
          </p>
          <hr
            className="mt-5 mb-5"
            style={{ backgroundColor: "#EBE3D8", height: "1px" }}
          />
          <p className="text-[16px] text-[#EBE3D8] mb-5">
            You can see the current time, music background, and song titles at a
            glance. Personalize your display with your favorite clock face and
            fun colors.
          </p>
          <p className="text-[16px] text-[#EBE3D8] mb-5">
            Our alarm clock offering over 100 free tracks including breathwork,
            meditations, sound baths, white noise, and nature sounds. Perfect
            for creating a calming bedtime environment and improving sleep
            quality
          </p>
          <p className="text-[16px] text-[#EBE3D8] mb-5">
            This smart alarm clock includes a unique two-phase alarm: a gentle
            wake-up phase followed by a louder get-up alarm.
          </p>
          <p className="text-[16px] text-[#EBE3D8] mb-5">
            Set the time to wake up
          </p>
          <p className="text-[16px] text-[#EBE3D8] mb-5">
            Chose the sound you prefer - alrm bell, peaceful sound, loud sound
            ubah layar alarm sesuai dengan selera anda leave for sleep, relax,{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alarm;
