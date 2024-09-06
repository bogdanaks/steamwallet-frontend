import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  server: {
    port: 5174,
    host: true,
  },
  build: {
    outDir: "build",
    assetsDir: "static",
    rollupOptions: {
      input: {
        app: "./index.html",
      },
      output: {
        manualChunks: (module: string) => {
          // @ts-ignore
          if (module.includes("node_modules")) {
            return "npm-packages"
          }
          return null
        },
      },
    },
  },
})
