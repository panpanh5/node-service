import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI);
// 生产模式
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
