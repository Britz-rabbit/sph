import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入并注册全局组件
import TypeNav from './components/TypeNav.vue'
import Carousel from './components/Carousel.vue'
import Pagination from './components/Pagination'

Vue.component(Carousel.name,Carousel)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

//引入并使用api来接口统一管理
import {getBaseCategoryList,reqGetSearchInfo} from './api'
//console.log(reqGetSearchInfo())
//引入vuex管理的仓库
import store from './store'
//getBaseCategoryList()

//引入mockServe.js，目的是让mock代码执行一次
import '@/mock/mockServe'
//全局引入swiper的样式
import 'swiper/css/swiper.min.css';
//引入elementUi的样式表
import 'element-ui/lib/theme-chalk/index.css'


import * as API from './api'
//引入插件
import './plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
    beforeCreate() {    
      //配置全局事件总线$bus，这个this是你new 出来的Vue实例，又称vm。全局世界总线常与自定义事件$on / $emit  / $off搭配使用
      Vue.prototype.$bus = this;
      Vue.prototype.$API = API;
    },
}).$mount('#app')