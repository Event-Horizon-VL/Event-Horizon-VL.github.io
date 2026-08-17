import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_TARGET;

  return {
    plugins: [vue()],
    server: {
      proxy: apiTarget
        ? {
            "/api": {
              target: apiTarget,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : undefined,
    },
  };
});