import vuetify from "vite-plugin-vuetify";
// import '@mdi/font/css/materialdesignicons.css';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss", "@mdi/font/css/materialdesignicons.css"],
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],

  app: {
    head: {
      title: "Vuetify 3 + Nuxt 3 Starter",
      titleTemplate: "%s | Vuetify 3 + Nuxt 3 Starter",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
});