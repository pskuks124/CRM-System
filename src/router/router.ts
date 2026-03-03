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
import { useSessionStore } from "@/stores/auth/session-store";
import UserListPage from "@/pages/users/UserListPage.vue";
import ViewProfilePage from "@/pages/users/ViewProfilePage.vue";

const authGuard: NavigationGuard = async (_to, _from, next) => {
  const { isAuthorized } = useSessionStore();
  if (!isAuthorized) {
    next({ name: "login" });
  } else {
    next();
  }
};
const guestGuard: NavigationGuard = async (_to, _from, next) => {
  const { isAuthorized } = useSessionStore();
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
        children: [
          {
            name: "view-profile",
            path: ":id",
            component: ViewProfilePage,
          },
        ],
      },
      {
        name: "todo",
        path: "/",

        component: ToDoListPage,
      },
      {
        name: "user-list",
        path: "/user-list",
        component: UserListPage,
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
