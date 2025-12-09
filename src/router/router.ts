import { createWebHistory, createRouter } from "vue-router";

import ToDoListPage from "../pages/ToDoListPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import AuthPage from "@/pages/AuthPage.vue";
import { useAuthStore } from "@/stores/api/auth-store";

const routes = [
  {
    name: "home",
    path: "/",
    component: ToDoListPage,
    meta: { layout: DefaultLayout },
  },
  {
    name: "profile",
    path: "/profile",
    component: ProfilePage,
    meta: { layout: DefaultLayout },
  },
  {
    name: "register",
    path: "/register",
    component: RegisterPage,
    meta: { layout: AuthLayout },
  },
  {
    name: "login",
    path: "/login",
    component: AuthPage,
    meta: { layout: AuthLayout },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { accessToken } = useAuthStore();
  if (!accessToken && to.name !== "login" && to.name !== "register") {
    return { name: "login" };
  }
});
export { router };
