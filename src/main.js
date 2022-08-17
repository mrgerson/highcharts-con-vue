import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";

Stock(Highcharts);


axios.defaults.baseURL = "http://localhost:8000/api";



Vue.config.productionTip = false

Vue.use(HighchartsVue);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')