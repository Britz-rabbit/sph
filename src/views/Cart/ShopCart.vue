<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(good,index) in cartInfoList" :key="good.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="good.isChecked" @change="updateChecked(good,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl">
            <div class="item-msg">{{good.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{good.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" 
            @click="updateCart('mins',good.skuId,index)">-</a>
            <input autocomplete="off" type="text" :value="oriNum[index]" ref="cartInput"
            class="itxt" @change="updateCart($event,good.skuId,index)" >
            <a href="javascript:void(0)" class="plus" @click="updateCart('plus',good.skuId,index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{good.skuNum * good.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(good)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0" @click="updateAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalPriceAndChecked.count}} </span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPriceAndChecked.sum}}</i>
        </div>
        <div class="sumbtn">
          <router-link  class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name: 'ShopCart',
    mounted() {
       //由于在购物车中，用户可能对商品进行修改并获取新数据，故要把请求单独写成一个函数并多次调用
      this.getData(),
      this.oriNum=[...this.cartInfoList.map(item=>item.skuNum)]
    },
    data() {
      return {
        oriNum:[],
      }
    },
    methods: {
      //获取服务器在仓库中的数据
      getData(){
        this.$store.dispatch('getCartList')
      },
      //检查用户输入的合法性，同时配合防抖来延缓页面刷新
     updateCart:throttle(function(type,skuId,index){
      //点击加减时，先进行加减判断
       switch(type){
        case 'mins':
          this.$refs.cartInput[index].value--
          break
        case 'plus':
          this.$refs.cartInput[index].value++
          break
      } 
        //合法化输入内容
        if(this.$refs.cartInput[index].value<0 || isNaN(this.$refs.cartInput[index].value)) this.$refs.cartInput[index].value=1
        this.$refs.cartInput[index].value=Math.ceil(parseInt(this.$refs.cartInput[index].value))
        //提取参数skuNum
        let skuNum = this.$refs.cartInput[index].value - this.oriNum[index]
        console.log(skuId,skuNum)
        this.$store.dispatch('addOrUpdataGoods',{skuId,skuNum})     
        //延迟0.2秒后之后重新获取列表,不然有可能服务器传回来的数据是未处理的错误数据
        setTimeout(()=>{ 
          this.getData()},200)        
     },500),
          //删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        //如果删除成功再次发请求获取新的数据进行展示
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改某个产品的勾选状态
    async updateChecked(cart, event) {
      //带给服务器的参数isChecked，不是布尔值，应该是0|1
      try {
        //如果修改数据成功，再次获取服务器数据（购物车）
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        //如果失败提示
        alert(error.message);
      }
    },
    //删除所以勾选的商品
    async deleteAllChecked(){
    //使用await来接收我们自己返回的promise，并根据不同的结果对用户进行不同的反馈
     try {
      //若删除成功，则更新列表
      await this.$store.dispatch('deleteAllChecked')
      this.getData()
     } catch (error) {
      //若删除失败，则提示用户
      alert(error.message)
     }
  
    },
    //全选按钮的处理。响应式的数据保证了isAllChecked的实时更新，之后我们根据checked的状态发送请求来影响isAllChecked
    async updateAllCheck(event){
     try {
       let isChecked=event.target.checked?'1':'0'
       let res = this.$store.dispatch('updateAllCheck',isChecked)
       //同样延迟0.2秒后重新获取数据
       setTimeout(() => {
        this.getData()
       }, 200);
     } catch (error) {
      alert(error.message)
     
     }
    }
    },
    computed: {
      ...mapGetters(['cartInfoList']),
      //购买勾选的商品总价
      totalPriceAndChecked(){
        let sum =0
        let count=0
        this.cartInfoList.forEach(element => {
          element.isChecked===1?sum += element.skuNum * element.skuPrice:''
          count++
        });
        return {sum,count}
      },
      //判断全选按钮是否勾选，仅仅是静态的判断
      isAllChecked(){
        return this.cartInfoList.every(item => item.isChecked===1)
      },
     },
     watch: {
      cartInfoList:{
        deep:true,
        //immediate:true,
        handler(val){
        //对于不同商品的不同数量，我们选用一个数组来保存
        this.$nextTick(()=> this.oriNum=[...val.map(item=>item.skuNum)])
        }
      }
     },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    &[disable]{
      cursor:not-allowed
    }

    a{
      text-decoration: none;
    }

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            text-decoration: none;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>