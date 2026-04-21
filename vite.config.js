import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // "/" evita URLs relativas que quebram quando o CSS fica em /assets/*.css (var() com url).
  // Para GitHub Pages em subpasta, usar base: "/nome-do-repo/".
  base: "/",
});
