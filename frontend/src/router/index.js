import Vue from "vue";
import Router from "vue-router";
import Login from "@/scenes/login/LoginScene";
import ListScene from "@/scenes/list/ListScene";
import CreateScene from "@/scenes/create/CreateScene";
import EditScene from "@/scenes/edit/EditScene";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "ListScene" }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { auth: false }
    },
    {
      path: "/records/",
      name: "ListScene",
      component: ListScene,
      meta: { auth: true }
    },
    {
      path: "/new/",
      name: "CreateScene",
      component: CreateScene,
      meta: { auth: true }
    },
    {
      path: "/records/:recordId",
      name: "EditScene",
      component: EditScene,
      meta: { auth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const route = to.matched.find(e => e.meta.auth != null);

  if (route) {
    const isRouteRestricted = route.meta.auth;
    const isLoginPageCalled = route.name === "login";
    const isUserLoggedIn = !!localStorage.user_token;

    if (isRouteRestricted && !isUserLoggedIn) {
      next("login");
    }

    if (
      (isUserLoggedIn && !isLoginPageCalled) ||
      (!isUserLoggedIn && isLoginPageCalled)
    ) {
      next();
    }
  }
});

export default router;
