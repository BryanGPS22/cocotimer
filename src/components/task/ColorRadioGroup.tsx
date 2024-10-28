import { useState } from "react"
import { RadioGroup } from "@headlessui/react"

type Props = {
  colors: any
  selected: string
  setSelected: (value: string) => void
}

export default function ColorRadioGroup({
  colors,
  selected,
  setSelected
}: Props) {
  return (
    <div>
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="flex gap-2">
          {colors.map((color: any) => (
            <RadioGroup.Option
              key={color}
              value={color}
              style={{ backgroundColor: color }}
              className="h-8 aspect-square rounded-full cursor-pointer"
            >
              {({ active, checked }) => (
                <div className="w-full h-full grid place-content-center">
                  {checked && (
                    <div className="shrink-0 text-white">
                      <CheckIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
