//utiles这个文件夹通常用来放一些工具模块，比如uuid和正则相关的东西
import { v4 as uuidv4 } from 'uuid'

export const getUuid=()=>{
    let uuid = uuidv4()
    //若本地存储没有，则保存。之后再给仓库带过去一份，我们return出来
    if(!localStorage.getItem('UUIDTOKEN')){
        localStorage.setItem('UUIDTOKEN',uuid)
    } 
    return localStorage.getItem('UUIDTOKEN')
}

