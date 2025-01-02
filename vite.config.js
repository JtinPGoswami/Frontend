import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Your source alias
    },
  },
  build: {
    rollupOptions: {
      external: [
        "@mapbox/node-pre-gyp", // Exclude this backend module
        "aws-sdk", // Exclude AWS SDK
        "mock-aws-s3", // Exclude mock AWS S3 module
        "nock", // Exclude nock module
      ],
    },
  },
});
