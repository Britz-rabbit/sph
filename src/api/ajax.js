//该文件用于【对axios的二次封装】
import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
import store from '../store'

//axios的基础配置
const requests=axios.create({
    baseURL:'/api',
    timeout:5000
})

//请求拦截器配置
requests.interceptors.request.use(config=>{
    nprogress.start()
    //携带一个临时身份uuid在请求头里
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //携带一个服务器返回的token在请求头里
    if(store.state.userInfo.userToken){
        config.headers.token=store.state.userInfo.userToken
    }
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(err)=>{
    return Promise.reject(err);
})

export default requests