import React from "react";
import Link from "next/link";

const Content = () => {
  return (
    <div>
      <div className="mb-20">
        <p className="text-[18px] text-center text-[#EBE3D8] mb-5">
          Choose Timer Layout
        </p>
        <div className="flex items-center justify-center md:gap-5 gap-2">
          <Link
            href={"/digital"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] md:px-6 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">Digital</p>
          </Link>
          <Link
            href={"/analog"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] md:px-6 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">Analog</p>
          </Link>
          <div className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] md:px-6 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">Flip</p>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <p className="text-[18px] text-center text-[#EBE3D8]">Set Timer</p>
        <hr
          className="mt-5 mb-5"
          style={{ backgroundColor: "#EBE3D8", height: "1px" }}
        />
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/1-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">1 Hours</p>
          </Link>
          <Link
            href={"/5-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">5 Minute</p>
          </Link>
          <Link
            href={"/5-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">5 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/2-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">2 Hours</p>
          </Link>
          <Link
            href={"/10-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">10 Minute</p>
          </Link>
          <Link
            href={"/10-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">10 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/3-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">3 Hours</p>
          </Link>
          <Link
            href={"/15-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">15 Minute</p>
          </Link>
          <Link
            href={"/15-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">15 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/4-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">4 Hours</p>
          </Link>
          <Link
            href={"/20-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">20 Minute</p>
          </Link>
          <Link
            href={"/20-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">20 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/5-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">5 Hours</p>
          </Link>
          <Link
            href={"/25-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">25 Minute</p>
          </Link>
          <Link
            href={"/25-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">25 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/6-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">6 Hours</p>
          </Link>
          <Link
            href={"/30-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">30 Minute</p>
          </Link>
          <Link
            href={"/30-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">30 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/7-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">7 Hours</p>
          </Link>
          <Link
            href={"/35-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">35 Minute</p>
          </Link>
          <Link
            href={"/35-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">35 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/8-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">8 Hours</p>
          </Link>
          <Link
            href={"/40-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">40 Minute</p>
          </Link>
          <Link
            href={"/40-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">40 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/9-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">9 Hours</p>
          </Link>
          <Link
            href={"/45-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">45 Minute</p>
          </Link>
          <Link
            href={"/45-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">45 Second</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-36 gap-5 mb-5">
          <Link
            href={"/10-hours"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FE8101"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">10 Hours</p>
          </Link>
          <Link
            href={"/50-minute"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#06DD5E"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">50 Minute</p>
          </Link>
          <Link
            href={"/50-second"}
            className="flex items-center gap-2 p-1 rounded-full border border-[#EBE3D8] px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#E86BB9"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <p className="text-[16px] text-[#EBE3D8]">50 Second</p>
          </Link>
        </div>
      </div>
      <div className="mb-20">
        <h1 className="text-[28px] font-medium text-center text-[#EBE3D8]">
          Timer Online Aesthetic
        </h1>
        <hr
          className="mt-5 mb-5"
          style={{ backgroundColor: "#EBE3D8", height: "1px" }}
        />
        <p className="text-[16px] text-[#EBE3D8]">
          Cocotimer is an online timer with an aesthetic design for desktop and
          mobile browsers. It offers three display options: Analog, Digital, and
          Flip Timer. You can choose the timer layout that best suits your mood.
        </p>
      </div>
      <div className="mb-20">
        <p className="text-[18px] text-center text-[#EBE3D8]">
          How to get started
        </p>
        <hr
          className="mt-5 mb-5"
          style={{ backgroundColor: "#EBE3D8", height: "1px" }}
        />
        <ul className="ml-4 list-disc text-[#EBE3D8]">
          <li>Set your custom duration by hours, minutes, and seconds.</li>
          <li>Choose a display theme that you like.</li>
          <li>Select your favorite alarm sound.</li>
          <li>Enter your task and notes.</li>
          <li>Click &apos;Save&apos; and start the timer.</li>
          <li>Reset the timer if you want to change the time duration.</li>
        </ul>
      </div>
      <div className="mb-20">
        <p className="text-[18px] text-center text-[#EBE3D8]">
          What makes Cocotimer unique?
        </p>
        <hr
          className="mt-5 mb-5"
          style={{ backgroundColor: "#EBE3D8", height: "1px" }}
        />
        <p className="text-[16px] text-[#EBE3D8] mb-5">
          I think you will be wondering how I create this aesthetic timer for
          you. I design this timer UI with figma tool and create analog timer
          using react with sequential logic. It&apos;s clean, user-friendly,
          eye-catching, and easy to use.
        </p>
        <p className="text-[18px] font-medium text-[#ebe3d8] mb-3">
          Relaxing Theme
        </p>
        <p className="text-[14px] text-[#EBE3D8] mb-5">
          With multiple aesthetic theme options, such as forest, beach,
          mountain, flowers, river, snow, anime, and more, you will experience a
          calm and focused environment while you study, read, or code.
        </p>
        <p className="text-[18px] font-medium text-[#ebe3d8] mb-3">
          Relaxing Sound
        </p>
        <p className="text-[14px] text-[#EBE3D8] mb-5">
          To notify you when time is up, we offer optional alarm sounds suitable
          for sound-sensitive environments, including ☔️Rain, 🌊Ocean,
          ☕️Bustling Café, 🛩️Airplane Cabin, 🙇Exam Hall, and campfires.
        </p>
        <p className="text-[18px] font-medium text-[#ebe3d8] mb-3">
          Task to do and Note
        </p>
        <p className="text-[14px] text-[#EBE3D8] mb-5">
          To help you structure your study, project, and deadlines, we&apos;ve
          added tasks and notes. This feature allows you to monitor, analyze,
          and evaluate your productivity.
        </p>
        <p className="text-[18px] font-medium text-[#ebe3d8] mb-3">
          Aesthetic Font & Number
        </p>
        <p className="text-[14px] text-[#EBE3D8] mb-5">
          Harmonies between font and numbers are our top priorities. I use
          multiple fonts such as digital italic, inter, Poppins, Monserrat,
          archivo, and Lato.
        </p>
        <p className="text-[18px] font-medium text-[#ebe3d8] mb-3">
          Focus Timer
        </p>
        <p className="text-[14px] text-[#EBE3D8] mb-5">
          Sometimes, staying focused is hard to achieve. By this reason, You
          need to use Pomodoro Timer. The default timer set for 25 or 20
          minutes, with 10 minute long break and 5 minute break. this method
          develop by Francesco Cirillo.
        </p>
      </div>
    </div>
  );
};

export default Content;
