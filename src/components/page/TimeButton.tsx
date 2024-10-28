import React from "react"

type Props = {
  setTime: (value: number) => void
}

const TimeButton = ({ setTime }: Props) => {
  return (
    <div className="w-2/6 bg-white rounded-xl p-6 h-fit">
      <h2 className="font-medium text-xl mb-6">Popular Timer</h2>
      <div className="grid grid-cols-1 items-start">
        {Array.from({ length: 12 }).map((_, i) => (
          <>
            <button
              onClick={() => setTime((i + 1) * 5)}
              className="w-full text-left text-tm-violet hover:text-tm-red"
              key={i}
            >
              {(i + 1) * 5} Minutes
            </button>
            <hr className="w-full mb-4 border-tm-violet" />
          </>
        ))}
      </div>
    </div>
  )
}

export default TimeButton
