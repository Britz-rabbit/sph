<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登陆|</router-link>
            <router-link to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
       <router-link to="/">
             <img src="../assets/images/logo.png" alt="" />
       </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchKeyWords"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
                搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    created() {
        
    },
    data() {
        return {
            searchKeyWords:'',

        }
    },
    methods: {
        goSearch(){
            //尝试传参，要现在路由组件配置的path里面写一个占位符。其中/后面接的是params参数，?k=xxx后面接的是query参数。
            //其中query参数要大写，且是键值对形式
            //this.$router.push(`/search/${this.searchKeyWords}?k=${this.searchKeyWords.toUpperCase()}`)
            //进阶写法：组件间传参的对象写法，其中params和query都是对象，里面是键值对
           if(this.$route.query){
            let location={name:'search',params:{searchKeyWords:this.searchKeyWords}}
            location.query=this.$route.query
            this.$router.push(location)
           }
        
            //此外，路由组件可以通过route里面设置prop:true便可以通过组件内的props来接受传过来的params参数
        },

    //   goSearch() {
    //   //代表的是如果有query参数也带过去
    //   if (this.$route.query) {
    //     let loction = {
    //       name: "search",
    //       params: { keyword: this.keyword || undefined },
    //     };
    //     loction.query = this.$route.query;
    //     this.$router.push(loction);
    //   }
    // },
    },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>