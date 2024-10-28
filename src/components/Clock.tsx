"use client";

import React, { useState, useEffect } from "react";
import "react-clock/dist/Clock.css";
import dynamic from "next/dynamic";

// Menggunakan dynamic import untuk Clock tanpa SSR
const Clock = dynamic(() => import("react-clock"), {
  ssr: false,
});

const Clock2: React.FC = () => {
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(new Date());
    }, 1000); // Update setiap 1 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []); // Kosongkan array dependency untuk hanya menjalankan efek sekali

  const formatTime = (time: Date): JSX.Element => {
    if (!time) return <></>; // Prevent rendering before time is set

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
            className="text-[13px] md:text-[13px] text-[#999999]"
            style={{ fontFamily: "monospace" }}
          >
            {formattedTime}
          </span>
        </span>
      </div>
    );
  };

  return (
    <div className=" p-1 rounded-2xl">
      <div className="clock-container mx-auto">
        {/* Jam Analog */}
        <Clock
          className="mx-auto text-white custom-clock"
          value={dateNow}
          size={150}
        />

        {/* Jam Digital di bawahnya */}
        <div className="mt-5">{formatTime(dateNow)}</div>
      </div>
    </div>
  );
};

export default Clock2;
