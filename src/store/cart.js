import { reqGetCartList,reqUpdateCheckedByid,reqDeleteCartById} from "@/api"

const state={
    cartList:[],

}

const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}

const actions={
    //获取服务器存储的购物车内商品
   async getCartList({commit}){
        const res = await reqGetCartList()
        //console.log(res)
        if(res.code===200) commit('GETCARTLIST',res.data)
    },
     //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除所有选中的商品
  //注意：actions里面函数的第一个参数其实是context，里面包含了一个小仓库的信息，而commit,getters,dispatch都可以从其中解构出来
  deleteAllChecked({getters,dispatch}){
    let promiseArr=[]
    //遍历购物车内数组，如果被勾选，则派发删除请求
    getters.cartInfoList.forEach(element => {
      //对于符合要求的商品，我们进行派发，派发的返回值是一个promise，我们接收并放到一个数组中，之后用promise.all来处理
      let res = element.isChecked===1?dispatch('deleteCartListBySkuId',element.skuId):''
      promiseArr.push(res)
    })
    //使用promise.all来判断，promise.all()接收一个数组，对数组内元素进行promise解析，只有当数组内所有promise成功时才返回成功的promise，否则返回失败的
    return Promise.all(promiseArr)
  },
  //全选按钮的修改全部商品状态
  updateAllCheck({getters,dispatch},isChecked){
    let promiseArr=[]
      getters.cartInfoList.forEach(element => {
      //对于购物车里的商品，不论原来的状态是什么，都修改为全选按钮目前的状态，也就是传过来的isChecked
      let res = dispatch('updateCheckedById',{skuId:element.skuId,isChecked})
      promiseArr.push(res)
    })
    return Promise.all(promiseArr)
  },
}

const getters={
    cartInfoList(state){return state.cartList[0]?.cartInfoList || []}
}

export default {state,mutations,actions,getters}