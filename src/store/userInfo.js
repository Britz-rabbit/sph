import { reqGetCode, reqLogin, reqLogout, reqRegister, reqUserInfo } from "@/api"
import { setToken,getToken,removeToken } from "@/utiles/token"

const state={
    code:'',
    userToken:getToken(),
    userInfo:{}
}

const mutations={
    GETCODE(state,code){
        state.code=code
    },
    LOGIN(state,token){
        state.userToken=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        //清空仓库
        state.userInfo={}
        state.userToken=''
        //清空本地存储
        removeToken()
    }
}

const actions={
    //根据用户手机发送验证码
    async getCode({commit},phone){
        let res =await reqGetCode(phone)
        console.log(res)
        if(res.code===200) {
            commit('GETCODE',res.data) 
            return 'OK'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    //用户的注册请求
    async register({commit},{phone,password,code}){
        const res =await reqRegister(phone,password,code)
        if(res.code===200){return 'OK'}else{
            return Promise.reject(new Error(res.message))
        }
    },
    //用户登陆
    async login({commit},data){
        let res=await reqLogin(data)
        //console.log(res)
        if(res.code===200){
            commit('LOGIN',res.data.token)
            //把token存储在本地存储中
            setToken(res.data.token)
            return 'OK'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    //获取用户信息。当用户登陆后，根据请求头的token，服务器会返回一些用户数据便于展示
  async getUserInfo({ commit }) {
    let res = await reqUserInfo()
      //  console.log(res)
    if (res.code === 200) {
      commit("GETUSERINFO", res.data);
      return 'ok';
    }else{
      return Promise.reject(new Error(res.message));
    }
  },
  //退出登陆
  async userLogout({commit}){
    let res = await reqLogout()
    //如果退出登陆完成，则通过mutations来清除userInfo和本地的token
    if(res.code===200){
        commit('CLEAR')
        return 'OK'
    }else{
        return Promise.reject(new Error(res.message))
    }
  }
}

const getters={

}

export default {state,mutations,actions,getters}