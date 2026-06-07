import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://amine-bahij.dev",
  integrations: [sitemap()],
});