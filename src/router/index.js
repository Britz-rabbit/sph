import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入仓库store便于路由守卫的判断
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

//配置路由守卫
router.beforeEach(async (to, from, next) => {
  //获取仓库的路由信息
  let token = store.state.userInfo.userToken//userInfo仓库里面的token
  let name = store.state.userInfo.userInfo.name//userInfo仓库里面的userInfo的name。token和name不在一块
  //1.用户已经登陆的情况
  if (token) {
    //1.1用户登陆后要去登陆和注册，则跳转到home
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      //1.2用户登陆后要去别的组件看看
      if (name) {
        //1.2.1仓库里的userInfo有信息，则放行
        next()
      } else {
        //1.2.2仓库里面没有信息，则发请求获取信息
        try {
          //使用await来获取promise之后的结果，如果有问题则会触发catch里面的代码
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //1.2.3如果发了请求还没有信息，说明请求头携带的token已经在后台过期了，清理掉token后重新跳转到登陆界面
          store.dispatch('userLogout')
          next('/login')
        }
      }
    }
    //2.用户压根没有登陆，先放行，后面回来再写
  } else {
    let toPath=to.path
    //路由路径里面带 pay 和 Cart 的都不让去 ， 另外center相关的也去不了
    if (to.path.indexOf('pay') != -1 || to.path.indexOf('Cart') != -1 || to.path.indexOf('center') != -1) {
     //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】，然后在登陆组件中接收参数并重定向跳转
     next('/login?redirect='+toPath);
    } else {
      next()
    }

  }
})

export default router
