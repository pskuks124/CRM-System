import {
  createWebHistory,
  createRouter,
  type NavigationGuard,
} from "vue-router";

import ToDoListPage from "../pages/ToDoListPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import AuthPage from "@/pages/AuthPage.vue";
import { useAuthStore } from "@/stores/auth/auth-store";

const authGuard: NavigationGuard = async (_to, _from, next) => {
  const { isAuthorized } = useAuthStore();
  if (!isAuthorized) {
    next({ name: "login" });
  } else {
    next();
  }
};
const guestGuard: NavigationGuard = async (_to, _from, next) => {
  const { isAuthorized } = useAuthStore();
  if (isAuthorized) {
    next({ name: "todo" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    beforeEnter: authGuard,
    children: [
      {
        name: "profile",
        path: "/profile",
        component: ProfilePage,
      },
      {
        name: "todo",
        path: "/",

        component: ToDoListPage,
      },
    ],
  },
  {
    path: "/",
    component: AuthLayout,
    beforeEnter: guestGuard,
    children: [
      {
        name: "register",
        path: "/register",
        component: RegisterPage,
      },
      {
        name: "login",
        path: "/login",

        component: AuthPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
