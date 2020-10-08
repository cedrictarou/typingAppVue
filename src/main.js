import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VAnimateCss from "animate.css";
import VueTyperPlugin from "vue-typer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//fontawesome
library.add(fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//タイピングエフェクト
Vue.use(VueTyperPlugin);

// Install Animate.css
Vue.use(VAnimateCss);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/";

store.dispatch("autoLogin").then(() => {
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount("#app");
});