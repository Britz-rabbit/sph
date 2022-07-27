//该文件用于对axios的二次封装
import axios from "axios";

//axios的基础配置
const requests=axios.create({
    baseURL:'/api',
    timeout:5000
})

//axios拦截器配置
requests.interceptors.request.use(config=>{

    return config
})
axios.interceptors.response.use(res=>{

    return res.data
},error=>{
    return Promise.reject(error);
})

export default requests