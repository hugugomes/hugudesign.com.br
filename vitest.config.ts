/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**/*.ts", "src/i18n/**/*.ts", "src/config/**/*.ts"],
      exclude: ["**/*.test.ts"],
      reporter: ["text", "lcov"],
      thresholds: {
        "src/lib/**": { lines: 80, functions: 80, branches: 80, statements: 80 },
      },
    },
  },
});
