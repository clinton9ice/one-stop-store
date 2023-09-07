// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  components: {
    global: true,
    dirs: ["~/components", "~/composables", "utils", "stores"],
  },
  plugins: ["~/plugins/ant-design.ts", "~/plugins/directives"],
  build: {
    transpile: ["antd"],
  },
  imports: {
    dirs: ["apis", "stores", "utils"],
  },
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  },
  css: ["@/assets/css/component-lib.css", "@/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
    configPath: "@/tailwind.config",
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});
