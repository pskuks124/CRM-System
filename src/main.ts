import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router/router";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount("#app");
