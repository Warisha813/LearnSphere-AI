import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use relative base so the built app works on GitHub Pages and local static hosts
export default defineConfig({
  base: "./",
  plugins: [react()],
});