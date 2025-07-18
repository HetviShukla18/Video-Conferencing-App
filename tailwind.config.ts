import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark1: "var(--dark1)",
        dark2: "var(--dark2)",
        blue1: "var(--blue1)",
        sky1:"var(--sky1)",
        sky2: "#ECF0FF",
        sky3:"#F5FCFF",
        orange :"#FF742E",
        purple:"#830EF9",
        yellow:"#F9A90E",
        }
      },
      backgroundImage: {
        'hero': "url('/icons/image-home.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  
  plugins: [],
};

export default config; 