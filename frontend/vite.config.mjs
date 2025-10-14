import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/Aviothic2.0_BitXBlood/',
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    host: true,
  },
});
