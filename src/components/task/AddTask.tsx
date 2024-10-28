import { Fragment, useEffect, useState } from "react"

// ** Third Party
import { Dialog, Transition } from "@headlessui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { IoMdColorPalette, IoMdTime } from "react-icons/io"

// ** Components
import useLocalStorage from "@/hooks/useLocalStorage"

type Props = {
  isOpen: boolean
  closeModal: () => void
}

interface IFormInput {
  task: string
}

const AddTask = ({ isOpen, closeModal }: Props) => {
  const [value, setValue] = useLocalStorage("task", "")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const taskData = {
      id: uuidv4(),
      title: data.task
    }

    if (!value) {
      setValue([taskData])
    } else {
      setValue([...value, taskData])
    }
    window.location.reload()
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Task
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4">
                    <div className="mb-4">
                      <input
                        className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline focus:outline-tm-green"
                        id="name"
                        type="text"
                        placeholder="What are you working on?"
                        {...register("task", {
                          required: true
                        })}
                      />
                      {errors.task && (
                        <p role="alert" className="text-red-700 text-sm mt-1">
                          Task is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 justify-end flex gap-6">
                    <div
                      onClick={closeModal}
                      className="cursor-pointer select-none text-gray-600"
                    >
                      Cancel
                    </div>
                    <input
                      type="submit"
                      value="Save"
                      className="bg-tm-green px-4 py-2 text-white rounded-md"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddTask
