"use client"

import { ReactNode, createContext, useContext, useState } from "react"

const SidebarContext = createContext<any>({} as any)

type Props = {
  children: ReactNode
}

export const SidebarProvider = ({ children }: Props) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)

  return (
    <SidebarContext.Provider value={{ isOpenSidebar, setIsOpenSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
