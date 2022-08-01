import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入并注册全局组件
import TypeNav from './components/TypeNav.vue'

Vue.component(TypeNav.name,TypeNav)

//引入并使用api来接口统一管理
import {getBaseCategoryList} from './api'
//引入vuex管理的仓库
import store from './store'
//getBaseCategoryList()

//引入mockServe.js，目的是让mock代码执行一次
import '@/mock/mockServe'
//全局引入swiper的样式
import 'swiper/css/swiper.min.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
