"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ** Third Party
import { getCookie, hasCookie, setCookie } from "cookies-next"
import { IoMdCreate, IoMdTrash } from "react-icons/io"

// ** Component
import TimerSettingModal from "./TimerSettingModal"
import useLocalStorage from "@/hooks/useLocalStorage"
import TimerSettingModalEdit from "./TimerSettingModalEdit"
import { useTimerSetting } from "@/context/TimerSettingContext"

type Props = {}

interface TimerList {
  id: any
  name: string
  timeType: string
  value: number
  sound: string
  color: string
}

const TimerSettingList = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [updateSelectedId, setUpdateSelectedId] = useState("")

  const { setTimerSetting } = useTimerSetting()

  const [value, setValue] = useLocalStorage("timer", "")
  const [timerData, setTimerData] = useState([])

  useEffect(() => {
    setTimerData(value)
  }, [value])

  const handleDeleteTimer = (id: any) => {
    const filteredData = value.filter((val: { id: any }) => val.id !== id)
    setValue(filteredData)
  }

  const handleUpdateTimer = (id: any) => {
    setUpdateSelectedId(id)
    setIsOpenModal(true)
  }

  const handleSetSetting = (id: any) => {
    const filteredData = value.filter((val: { id: any }) => val.id === id)

    const selectedData = filteredData[0]

    setTimerSetting({
      timeType: selectedData.timeType,
      value: Number(selectedData.value),
      sound: selectedData.sound,
      color: selectedData.color
    })
  }

  return (
    <div className="mt-20 self-start">
      <h2 className="text-xl font-medium mb-4 text-white">Your Preset</h2>
      <div className="grid grid-cols-2 gap-8">
        {timerData.length > 0 ? (
          timerData.map(
            (timer: {
              id: any
              name: string
              color: string
              value: number
              timeType: string
            }) => (
              <div
                key={timer.id}
                style={{ borderColor: timer.color }}
                className={`flex items-center justify-between gap-8 border-l-4 bg-gray-50 px-4 py-2`}
              >
                <div>
                  <button onClick={() => handleSetSetting(timer.id)}>
                    <h3 className="font-medium hover:text-blue-900">
                      {timer.name}
                    </h3>
                  </button>
                  <p className="text-sm text-gray-600">
                    {timer.value} {timer.timeType === "second" ? "sec" : "min"}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleUpdateTimer(timer.id)}
                    className="text-tm-violet rounded-full p-2"
                  >
                    <IoMdCreate size={22} />
                  </button>
                  <button
                    onClick={() => handleDeleteTimer(timer.id)}
                    className="text-tm-red rounded-full p-2"
                  >
                    <IoMdTrash size={22} />
                  </button>
                </div>
              </div>
            )
          )
        ) : (
          <div className="text-white">There is no preset available!</div>
        )}
      </div>
      <TimerSettingModalEdit
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        id={updateSelectedId}
      />
    </div>
  )
}

export default TimerSettingList
