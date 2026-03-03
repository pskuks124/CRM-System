import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import { router } from "./router/router";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router).mount("#app");
