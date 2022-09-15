import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import userInfo from './userInfo'
import trade from './trade'

export default new Vuex.Store({
 // state, mutations, actions,
  modules:{
    home,search,detail,cart,userInfo,trade
  }
})
