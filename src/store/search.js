import { reqGetSearchInfo } from "@/api"
const state={
  //搜索模块返回的数据，格式是对象
  searchList:{},
}

const mutations={
  GETSEARCHLIST(state,searchList){
    state.searchList=searchList
  }
}

const actions={
  async getSearchList({commit},params={}){
    const res = await reqGetSearchInfo(params)
    if(res.code===200) commit('GETSEARCHLIST',res.data)
  }
}

//getters的作用是简化数据，是vuex的计算属性
const  getters= {
  //这个形参state是当前小仓库的state
  goodsList(state){
    //为了保存数据的结构一致性，我们在没有接收到数据时用一个空数组替换他，而非undefined
    return state.searchList.goodsList || []
  }
  ,
  trademarkList(state){
    return state.searchList.trademarkList || []
  }
  ,
  attrsList(state){
    return state.searchList.attrsList || []
  }
  }


const modules={

}

export default {
    state,mutations,actions,getters,modules
}