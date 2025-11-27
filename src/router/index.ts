import { createWebHistory, createRouter } from "vue-router";

import ToDoListPage from "../pages/ToDoListPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const routes = [
  { path: "/", component: ToDoListPage, meta: { layout: DefaultLayout } },
  { path: "/profile", component: ProfilePage, meta: { layout: DefaultLayout } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
