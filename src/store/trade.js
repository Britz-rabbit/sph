import { reqAddressInfo , reqOrderInfo } from "@/api"


const state={
    address:[],
    orderList:{}
}

const mutations={
    GETADDRESSINFO(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderList){
        state.orderList=orderList
    }
}

const actions={
    //获取用户地址信息
    async getAddressInfo({commit}){
        const res =await reqAddressInfo()
        if(res.code===200) commit('GETADDRESSINFO',res.data)
    },

    //获取用户商品信息
    async getOrderInfo({commit}) {
        let res = await reqOrderInfo();
        if(res.code==200){
          commit("GETORDERINFO",res.data);
        }
      },

      //
}

const getters={

}

export default {state,mutations,actions,getters}