import Antd from "ant-design-vue";
// import 'ant-design-vue/dist/antd.css'
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd);
});
