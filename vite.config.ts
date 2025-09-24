import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      manifest: false,
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup/test-setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      exclude: [
        "src/main.tsx",
        "src/**/*.d.ts",
        ...configDefaults.coverage.exclude!,
      ],
    },
  },
}));
