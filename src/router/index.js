import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next("/");
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
