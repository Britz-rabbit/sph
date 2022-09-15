import {getBaseCategoryList, reqGetBannerList,reqGetFloorList} from '@/api'



//state用于数据存储，即保存状态的地方
const state={
  //三级菜单的数据
  categoryList:[],
  //轮播图的数据
  bannerList:[],
  //底部轮播图数据
  floorList:[],

}
//mutations用于修改业务
const mutations={
  //接受到传过来的参数并保存到一个形参上，然后赋值给state里面的自己创的属性
  CATEGORYLIST(state,categoryList){
    state.categoryList=categoryList
  },
  //
  GETBANNERLIST(state,bannerList){
    state.bannerList=bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList
  }
}
//actions用于书写业务逻辑和异步的处理
const actions={
  //获取三级分类数据
  async getCategoryList({commit}){
   const res =await getBaseCategoryList()
   //如若成功获取数据，则向mutations里面commit一个CATEGORYLIST并把res.data作为参数传过去
   if(res.code===200) commit('CATEGORYLIST',res.data)

  },
  //获取首页轮播图数据
  async getBannerList({commit}){
    let res = await reqGetBannerList();
    if(res.code===200){
      commit('GETBANNERLIST',res.data)
    }
  },
  //获取底部轮播图数据
  async getFloorList({commit}){
    let res = await reqGetFloorList()
    if(res.code===200) commit('GETFLOORLIST',res.data)
  }
}
//getters类似vue文件的计算属性，常用做数据的加工，简化操作
const  getters= {
  }

//modules是小仓库，常用作vuex的模块化开发
const modules={

}

export default {
    state,mutations,actions,getters,modules
}