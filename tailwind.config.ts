import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        bg: 'var(--bg)',
        point : 'var(--point)',
        areaBg : 'var(--areaBg)',
        hover : 'var(--hover)',
        placeholder : 'var(--placeholder)',

        /* grayScale */
        gray200: 'var(--gray-200)',
        gray300: 'var(--gray-300)',
        gray400: 'var(--gray-400)',
        gray500: 'var(--gray-500)',
        gray600: 'var(--gray-600)',
        gray700: 'var(--gray-700)',

      },

      fontSize: {
        ttLg: "var(--title-lg)",
        ttMd: "var(--title-md)",
        ttSm: "var(--title-sm)",

        tMd: "var(--text-md)",
        tSm: "var(--text-sm)",
      },

      boxShadow: {
        cardItemSD: "0px 0px 16px rgba(0, 0, 0, 0.25)",
      }
    },
  },
  plugins: [],
} satisfies Config;
