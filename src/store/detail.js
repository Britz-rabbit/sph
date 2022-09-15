import { reqGoodDetail , reqAddOrUpdataGoods } from "@/api";
import {getUuid} from '../utiles/uuid_token'


const state={
    goodDetail:{},
    //对于一个游客，只需生成一次uuid当作token即可
    uuid_token:getUuid()
}

const mutations={
    //牢记：mutatios的第一个参数是state
    REQGOODDETAIL(state,goodDetail){
        state.goodDetail=goodDetail
    }
}

const actions={
    //获取单个商品的详情信息
    async getGoodDetail({commit},id){
        const res = await reqGoodDetail(id)
        if(res.code===200) return commit('REQGOODDETAIL', res.data)
    },
    //点击添加商品后查看购物车,同时也用作购物车商品的更新
    async addOrUpdataGoods({commit},{skuId,skuNum}){
        const res = await reqAddOrUpdataGoods(skuId,skuNum)
        //console.log(res)
        if(res.code===200) {return 'ok'}
        else{return Promise.reject(new Error("faile"))}
    }
}

const getters={
    //getters内函数的第一个参数也是state，拿到state后再把需要的东西return出去
    //发送请求是异步操作，当请求还没有返回的时候我们读取到的goodDetail是空对象，读取空对象的属性就会报错，所以要有个兜底的数据防止控制台飘红
    categoryView(state){
        return state.goodDetail.categoryView || {}
    },
    price(state){
        return state.goodDetail.price || NaN
    },
    skuInfo(state){
        return state.goodDetail.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodDetail.spuSaleAttrList || []
    },
    valuesSkuJson(state){       
        return state.goodDetail.valuesSkuJson || ''
    }
}

const modules={}

export default {state,mutations,actions,getters,modules}