import { Switch } from "@headlessui/react"

type Props = {
  isSecond: boolean
  setIsSecond: (value: boolean) => void
}

const TimeTypeSwitch = ({ isSecond, setIsSecond }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-800">Sec</span>
      <Switch
        checked={isSecond}
        onChange={setIsSecond}
        className={`${isSecond ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${isSecond ? "translate-x-0" : "translate-x-4"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <span className="text-sm text-gray-800">Min</span>
    </div>
  )
}

export default TimeTypeSwitch
