import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tm-red": "#b9315f",
        "tm-green": "#3BB273",
        "tm-yellow": "#F7EC59",
        "tm-violet": "#231942",
      },
      fontFamily: {
        quicksand: ["var(--font-quicksand)"],
        source_sans_3: ["var(--fonnt-source_sans_3)"],
      },
    },
  },
};
export default config
