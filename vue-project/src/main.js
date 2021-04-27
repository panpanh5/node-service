import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import axios from "axios";

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入直角坐标系组件，组件后缀都为 Component
import { GridComponent } from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件
echarts.use([GridComponent, BarChart, CanvasRenderer]);
Vue.prototype.$echarts = echarts;

// axios.defaults.baseURL = "/api"
//设置全局的
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");