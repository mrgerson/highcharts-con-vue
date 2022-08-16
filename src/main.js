import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";

Stock(Highcharts);



Vue.config.productionTip = false

Vue.use(HighchartsVue);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')