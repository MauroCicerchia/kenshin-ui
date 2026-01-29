import type { Config } from "tailwindcss";
import kenshinPreset from "@kenshinx/ui/tailwind-preset";

export default {
  presets: [kenshinPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config;
