import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: https://siegfriex.github.io/daum_tf09/
export default defineConfig({
  base: "/daum_tf09/",
  plugins: [react()],
  build: { outDir: "dist", sourcemap: false },
});
