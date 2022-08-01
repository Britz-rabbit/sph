import Mock from 'mockjs'
//webpack会将图片和json默认对外暴漏，所以我们直接引即可
import banner from './banner.json'
import floor from './floor.json'

//使用Mock身上的mock方法，第一个参数是请求地址，第二个参数是处理后的数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})