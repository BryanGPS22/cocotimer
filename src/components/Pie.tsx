"use client"

import { cleanPercentage, degreeToRange } from "@/utils/circle"
import { useEffect, useRef } from "react"

import useSound from "use-sound"
import Circle from "./Circle"

interface Pie {
  time: number
  setTime: (value: number) => void
  currentTime: number
  setCurrentTime: (value: number) => void
  secondValue: number
  setCurrentSecondValue: (value: number) => void
  stopwatchState: string
  setStopWatchState: (value: string) => void
  isMinutes: boolean
  color: string
}

const Pie = ({
  time,
  setTime,
  currentTime,
  setCurrentTime,
  secondValue,
  setCurrentSecondValue,
  stopwatchState,
  setStopWatchState,
  isMinutes,
  color
}: Pie) => {
  const containerRef = useRef(null)
  const [play] = useSound("/sound/case-closed.mp3")

  const handleMouseMove = (event: any) => {
    const bounds = event.target.getBoundingClientRect()
    const localX = event.clientX - bounds.left
    const localY = event.clientY - bounds.top

    const pct = cleanPercentage(degreeToRange({ x: localX, y: localY }))
    const roundePct = Math.round(pct)

    setCurrentTime(roundePct)
  }

  const handleMouseLeave = () => {
    if (stopwatchState === "stop") {
      setCurrentTime(time)
    }
  }

  useEffect(() => {
    if (stopwatchState === "play" && currentTime > 0) {
      const interval = setInterval(
        () => {
          setCurrentTime(currentTime - 1)
        },
        isMinutes ? 1000 * 60 : 1000
      )
      return () => clearInterval(interval)
    }

    if (currentTime === 0) {
      setCurrentTime(time)
      setCurrentSecondValue(secondValue)
      setStopWatchState("stop")
      play()
    }
  }, [
    currentTime,
    isMinutes,
    play,
    secondValue,
    setCurrentSecondValue,
    setCurrentTime,
    setStopWatchState,
    stopwatchState,
    time
  ])

  const handleClickTime = () => {
    setTime(currentTime)
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full inline-block text-center absolute inset-0 rounded-full transform -rotate-90"
    >
      <button
        onClick={handleClickTime}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        disabled={stopwatchState !== "stop"}
        className={`w-full h-full bg-transparent absolute inset-0 ${
          stopwatchState !== "stop" ? "cursor-not-allowed" : "cursor-pointer"
        } `}
      ></button>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMinYMin meet"
        className="rounded-full absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"
      >
        <Circle color={color} pct={currentTime} />
      </svg>
    </div>
  )
}

export default Pie
