import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { volt: "#2F6BFF", ink: "#07080B", slate2: "#12151C" } } },
  plugins: [],
} satisfies Config;
