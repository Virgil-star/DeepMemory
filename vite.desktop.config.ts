import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * The standalone Meridian bundle: plain files the desktop shell loads from
 * disk. No server, no router, no network. `base: "./"` keeps every asset
 * path relative so it works from wherever Steam installs it.
 */
export default defineConfig({
  base: "./",
  publicDir: false,
  plugins: [viteReact(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: "desktop/app",
    emptyOutDir: true,
    rollupOptions: { input: "desktop.html" },
  },
});
