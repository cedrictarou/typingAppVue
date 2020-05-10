import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import definitions from "./plugins/definitions";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  definitions,
  render: h => h(App)
}).$mount("#app");
