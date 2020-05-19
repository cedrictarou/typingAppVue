import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import definitions from "./plugins/definitions";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/typing-app-f08b8/databases/(default)/documents";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

store.dispatch("autoLogin").then(() => {
  new Vue({
    router,
    store,
    definitions,
    render: h => h(App)
  }).$mount("#app");
});
