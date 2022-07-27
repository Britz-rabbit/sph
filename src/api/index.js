//想象一下：假如我们将api请求写到各个组件中，将来api接口地址更改后，组件的维护会变得非常麻烦。
//故我们使用该文件用于对项目的所有api接口进行统一管理。
import requests from "./request";

//home中List的三级联动接口管理 地址为： /product/getBaseCategoryList 无需携带额外参数
export const getBaseCategoryList=()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}//只会的请求会尽可能的采用箭头函数的简写形式，注意识别
