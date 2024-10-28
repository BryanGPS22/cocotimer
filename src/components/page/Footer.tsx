import Link from "next/link"

function Footer() {
  return (
    <footer className="bg-base-content text-neutral-content container mx-auto max-w-[1080px]">
      <div className="w-full max-w-screen-xl mx-auto p-8 flex items-center justify-between">
        <span className="block text-center text-white">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline font-semibold text-white">
            cocotimer.com
          </Link>
          . All Rights Reserved.
        </span>
        <div className="flex items-center gap-6">
          <Link
            href={""}
            className="text-[#EBE3D8] hover:text-[#b9b6b1] text-[16px]"
          >
            Contact US
          </Link>
          <Link
            href={"/about-us"}
            className="text-[#EBE3D8] hover:text-[#b9b6b1] text-[16px]"
          >
            About US
          </Link>
          <Link
            href={"/privacy-police"}
            className="text-[#EBE3D8] hover:text-[#b9b6b1] text-[16px]"
          >
            Privacy Police
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer
