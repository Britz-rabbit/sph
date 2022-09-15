//想象一下：假如我们将api请求写到各个组件中，将来api接口地址更改后，组件的维护会变得非常麻烦。
//故我们使用该文件【用于对项目的所有api接口进行统一管理】。
import requests from "./ajax";
import mockRequests from './mockAjax'
//获取三级分类接口 地址为： /product/getBaseCategoryList 无需携带额外参数
export const getBaseCategoryList=()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}//之后的请求会尽可能的采用箭头函数的简写形式，注意识别

//发送请求获取mock的数据
//export const reqGetBannerList=()=>{mockRequests.get('/banner')}//就因为多写一个大括号，整个语句作废
export const reqGetBannerList = () => mockRequests.get("/banner");

//获取floor的数据
export const reqGetFloorList = () => mockRequests.get('/floor')

//获取搜索模块信息 地址：/api/list  方式：post  参数：携带为一个对象
export const reqGetSearchInfo = (params={}) => requests({url:'/list',method:'post',data:params})

//获取商品详情的数据 地址：/api/item/{ skuId }  方式：get  参数:skuId，携带到url中
export const reqGoodDetail = (skuId='')=> requests({url:`/item/${ skuId }`,method:'get'})

//将产品添加到购物车中，同时用于商品的更新 /cart/addToCart/{ skuId }/{ skuNum } 
//为什么不写默认参数？因为这个请求这俩参数是必须带的
export const reqAddOrUpdataGoods = (skuId,skuNum)=> requests({url:`/cart/addToCart/${skuId}/${skuNum} `,method:'post'})

//获取购物车列表
export const reqGetCartList = ()=> requests({url:'/cart/cartList',method:'get'})

//删除购物产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//根据输入的手机号获取用户注册的验证码 
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//用户注册  注意：axios里的参数不是通过prams，而是data传递过去的
export const reqRegister = (phone,password,code)=>requests({url:'/user/passport/register',data:{phone,password,code},method:'post'})

//用户登陆  /user/passport/login  post
export const reqLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息【需要带着用户的token向服务器要用户信息】  /api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登陆  /user/passport/logout
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息  /user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单  /order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单的接口  /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})

//获取订单的支付信息  /payment/weixin/createNative/{orderId}
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询用户订单支付情况  /payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})

//获取个人信息的数据  /order/auth/{page}/{limit}
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})