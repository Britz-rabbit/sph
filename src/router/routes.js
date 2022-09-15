export default [
  {
    path:'/',
    component: () => import('../views/Home')
  },
  //主页
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home')
  },
  //搜索
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import( '../views/Search')
  },
  //购物车
  {
    path: '/addCart',
    name: 'addCart',
    component: () => import('../views/Cart/AddCart.vue')
  },
  {
    path:'/shopCart',
    name:'shopCart',
    component:() => import('../views/Cart/ShopCart')
  },
  //登陆与注册
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Info/Login.vue') ,
    meta:{isHideFooter:true}
  },
  {
    path:'/register',
    name:'register',
    component:() => import('../views/Info/Register.vue'),
    meta:{isHideFooter:true}
  },
  //交易与支付
  {
    path: '/trade',
    name: 'trade',
    component: () => import('../views/Pay/Trade.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //只能从购物车去往交易页面，其余页面会返回
      if(from.path=='/shopCart'){
        next()
      }else{next(false)}
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/Pay/Pay.vue'),
    beforeEnter: (to, from, next) => {
      //只能从订单去往支付页面，其余页面会返回
      if(from.path=='/trade'){
        next()
      }else{next(false)}
    }
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('../views/Pay/PaySuccess.vue'),
    beforeEnter: (to, from, next) => {
      if(from.path=='/pay'){
        next()
      }else{next(false)}
    }
  },
  //商品详情
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: () => import('../views/Detail')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/Shop/Center.vue')
  },
  //个人中心
  {
    path: '/center',
    name: 'center',
    component: () => import('../views/center'),
    children:[
      // 重定向
      {
        path:'/center/', 
        redirect:'/center/myOrder',
      },
      {
        path: 'myOrder',
        component: () => import('../views/center/myOrder'),
      },
      {
        path: 'groupOrder',
        component: () => import('../views/center/groupOrder'),
      }
    ]
  },
  
]