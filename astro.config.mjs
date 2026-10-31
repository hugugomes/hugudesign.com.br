// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hugudesign.com.br",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
