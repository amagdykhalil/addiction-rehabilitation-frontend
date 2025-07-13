import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { defineConfig, type UserConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  envPrefix: "APP_",
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "**/types/**",
        "**/constants/**",
        "**/config/**",
        "**/*types.ts",
        "**/*constants.ts",
        "**/*keys.ts",
        "**/*config.ts",
      ],
      clean: true,
      reportOnFailure: true,
    },
  },
} as UserConfig);
