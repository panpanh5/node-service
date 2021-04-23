import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

// createApp(App).use(router, ElementPlus).mount("#app");
const app = createApp(App);
app.use(ElementPlus, router);
app.mount("#app");
