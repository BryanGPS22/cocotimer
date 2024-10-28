"use client";

import { useEffect, useState } from "react";

// ** Third Party
import { IoMdSettings } from "react-icons/io";

// ** Components
import Timer from "@/components/Timer";
import TimerSettingList from "@/components/timer-setting/TimerSettingList";
import TimerSettingModal from "@/components/timer-setting/TimerSettingModal";
import { useTimerSetting } from "@/context/TimerSettingContext";
import Content from "@/components/Content";
import Homepage from "@/components/Homepage";

export default function Home() {
  const [isOpenModal, setisOpenModal] = useState<boolean>(false);

  const { timerSetting, setTimerSetting } = useTimerSetting();

  return (
    <>
      <main className="pt-28 flex justify-between gap-10 max-w-[1200px] mx-auto">
        <div className="w-full bg-transarent rounded-3xl items-center">
          <Homepage />
        </div>
      </main>
      <div className="container mx-auto max-w-4xl md:p-14 p-5">
        <Content />
      </div>
    </>
  );
}
