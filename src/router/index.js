import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  //主页
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/')
  },
  //搜索
  {
    path: '/search/:searchKeyWords',
    name: 'search',
    component: () => import( '../views/Search/')
  },
  //购物车
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart/ShopCart.vue')
  },
  //个人信息
  {
    path: '/info',
    name: 'info',
    component: () => import( '../views/Info/Login.vue')
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Info/Login.vue') ,
    meta:{isHindFooter:true}
  },
  {
    path:'/register',
    name:'register',
    component:() => import('../views/Info/Register.vue'),
    meta:{isHindFooter:true}
  },
  //支付
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/Pay/Pay.vue')
  },
  //买东西
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/Shop/Center.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
