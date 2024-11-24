import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"), // Alias for Bootstrap
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~bootstrap/scss/bootstrap";`,
      },
    },
  },
});