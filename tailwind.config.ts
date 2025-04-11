import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        gray100: 'var(--gray-100)',
        gray200: 'var(--gray-200)',
        gray300: 'var(--gray-300)',
        gray400: 'var(--gray-400)',
        gray500: 'var(--gray-500)',
        gray600: 'var(--gray-600)',

      },
    },
  },
  plugins: [],
} satisfies Config;
