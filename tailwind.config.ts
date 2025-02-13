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
        areaBg : 'var(--areaBg)'
      },
    },
  },
  plugins: [],
} satisfies Config;
