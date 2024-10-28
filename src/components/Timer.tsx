"use client"

import React, { useEffect, useState } from "react"
import Pie from "./Pie"
import { HiOutlineSwitchVertical } from "react-icons/hi"

import {
  IoIosPause,
  IoIosPlay,
  IoIosRefresh,
  IoIosSquare
} from "react-icons/io"

type Props = {
  timerSetting: any
  setTimerSetting: (value: any) => void
}

const PlayPauseButton = ({
  stopwatchState,
  handlePlay,
  handlePause
}: {
  stopwatchState: string
  handlePlay: () => void
  handlePause: () => void
}) => {
  if (stopwatchState === "play") {
    return (
      <button
        onClick={handlePause}
        className="w-full h-full flex items-center justify-center gap-1"
      >
        <IoIosPause size={20} />
        Pause
      </button>
    )
  }

  return (
    <button
      onClick={handlePlay}
      className="w-full h-full flex items-center justify-center gap-1"
    >
      <IoIosPlay size={20} />
      Start
    </button>
  )
}

const Timer = ({ timerSetting, setTimerSetting }: Props) => {
  const [isMinutes, setIsMinutes] = useState<boolean>(
    timerSetting.timeType === "minute"
  )
  const [stopwatchState, setStopWatchState] = useState<string>("stop")
  const [currentTime, setCurrentTime] = useState<number>(timerSetting.value)

  const secondValue = isMinutes ? timerSetting.value * 60 : timerSetting.value

  const [currentSecondValue, setCurrentSecondValue] = useState(secondValue)

  const divisorForMinutes = currentSecondValue % (60 * 60)
  const minutes = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  const seconds = Math.ceil(divisorForSeconds)

  useEffect(() => {
    if (stopwatchState === "play" && currentTime > 0) {
      const interval = setInterval(() => {
        setCurrentSecondValue(currentSecondValue - 1)
      }, 1000)
      return () => clearInterval(interval)
    }

    if (currentTime === 0) {
      setStopWatchState("stop")
    }
  }, [currentSecondValue, currentTime, stopwatchState])

  useEffect(() => {
    setCurrentSecondValue(secondValue)
  }, [secondValue])

  useEffect(() => {
    setCurrentTime(timerSetting.value)
    setIsMinutes(timerSetting.timeType === "minute")
  }, [timerSetting.timeType, timerSetting.value])

  const handlePlay = () => {
    setStopWatchState("play")
  }

  const handlePause = () => {
    setStopWatchState("pause")
  }

  const handleStop = () => {
    setStopWatchState("stop")
    setCurrentTime(timerSetting.value)
    setCurrentSecondValue(secondValue)
  }

  const handleReset = () => {
    setStopWatchState("stop")
    setCurrentTime(0)
    setTimerSetting({
      timeType: "second",
      value: 15,
      sound: "/sound/case-closed.mp3",
      color: "#F25D52"
    })
  }

  const setTime = (val: number) => {
    setTimerSetting({
      timeType: isMinutes ? "minute" : "second",
      value: val,
      sound: timerSetting.sound,
      color: timerSetting.color
    })
  }

  return (
    <div className="w-[340px] mx-auto aspect-square flex flex-col items-center isolate">
      
      <button
        onClick={() => setIsMinutes(!isMinutes)}
        style={{ background: timerSetting.color }}
        className="w-32 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-white mb-14"
      >
        <HiOutlineSwitchVertical size={20} />
        <span>{isMinutes ? "Minutes" : "Seconds"}</span>
      </button>
      <div className="clock z-[-1]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="number-hours text-white">
            <span style={{ transform: `rotate(calc(${(i + 1) * 30}deg))` }}>
              <p style={{ transform: `rotate(calc(${(i + 1) * -30}deg))` }}>
                {(i + 1) * 5}
              </p>
            </span>
          </div>
        ))}
        <div className="diallines text-white">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              style={{ transform: `rotate(calc(${(i + 1) * 6}deg))` }}
            >
              <p></p>
            </span>
          ))}
        </div>

        <div className="circle">
          <span>
            <Pie
              time={timerSetting.value}
              setTime={setTime}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              secondValue={secondValue}
              setCurrentSecondValue={setCurrentSecondValue}
              stopwatchState={stopwatchState}
              setStopWatchState={setStopWatchState}
              isMinutes={isMinutes}
              color={timerSetting.color}
            />
          </span>
        </div>
        <div className="bg-white/80 px-4 py-2 font-semibold text-4xl text-gray-600 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-center gap-10 text-white">
        <div className="w-32 px-4 py-2 rounded-md bg-tm-green">
          <PlayPauseButton
            stopwatchState={stopwatchState}
            handlePlay={handlePlay}
            handlePause={handlePause}
          />
        </div>
        <button
          onClick={handleStop}
          className="w-32 bg-tm-red flex items-center gap-1 justify-center px-4 py-2 rounded-md"
        >
          <IoIosSquare size={20} />
          Stop
        </button>
        <button
          onClick={handleReset}
          className="w-32 bg-tm-violet flex items-center gap-1 justify-center px-4 py-2 rounded-md"
        >
          <IoIosRefresh size={20} />
          Reset
        </button>
      </div>
    </div>
  )
}

export default Timer
