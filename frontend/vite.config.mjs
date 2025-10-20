import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/Aviothic2.0_BitXBlood/',
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
  preview: {
    port: 5173,
    strictPort: false,
    host: true,
  },
});