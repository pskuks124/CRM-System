import { createMemoryHistory, createRouter } from "vue-router";

import ToDoListPage from "../pages/ToDoListPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

const routes = [
  { path: "/", component: ToDoListPage },
  { path: "/profile", component: ProfilePage },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
