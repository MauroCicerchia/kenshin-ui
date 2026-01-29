import type { Config } from "tailwindcss";
import kenshinPreset from "@kenshinx/ui/tailwind-preset";

export default {
  presets: [kenshinPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include @kenshinx/ui components for Tailwind to scan
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config;
