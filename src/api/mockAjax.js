import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

//axios的基础配置
const requests=axios.create({
    baseURL:'/mock',
    timeout:5000
})

//请求拦截器配置
requests.interceptors.request.use(config=>{
    nprogress.start()
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