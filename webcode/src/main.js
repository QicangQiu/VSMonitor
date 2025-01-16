import Vue from 'vue'
import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import * as echarts from 'echarts'
import axios from 'axios'
import 'echarts-liquidfill'
import VueRouter from 'vue-router'
import router from './router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// import {
//   Icon, Row, Col,  Table, TableColumn, Button, Dialog, Link,Alert
// } from 'element-ui';

if (process.env.NODE_ENV === 'development') {
  // const { initMockData } = require('../mock')
  // initMockData()
}

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(dataV)
Vue.prototype.axios = axios
// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Button)
// Vue.use(Dialog)
// Vue.use(Link)
// Vue.use(Alert)
Vue.use(VueRouter)

Vue.prototype.$axios = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
