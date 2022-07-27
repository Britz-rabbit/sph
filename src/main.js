import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入并注册全局组件
import TypeNav from './components/TypeNav.vue'

Vue.component(TypeNav.name,TypeNav)

//引入并使用api的接口统一管理
import {getBaseCategoryList} from './api'
getBaseCategoryList()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
