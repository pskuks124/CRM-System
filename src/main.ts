import { createApp } from "vue";
import "./style.css";
import "./assets/reset.css";
import { getTodos } from "./util/api";
import { tasks, info } from "./store";
import App from "./App.vue";

const app = createApp(App);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
getTodos("all", tasks, info);

app.mount("#app");
