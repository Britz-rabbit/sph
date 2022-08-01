<template>
  <div class="type-nav">
    <div class="container"   @mouseleave="leaveIndex" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 添加过渡动画效果，需要配合v-show或v-if使用-->
      <transition name="sort">
       <div class="sort" v-show="isShow">
        <div class="all-sort-list2"  @click="goSearch">
          <!-- 一级分类，名称作为左侧菜单显示 -->
          <div
            class="item"
            v-for="(c1, i1) in categoryList"
            :key="c1.categoryId"
            :class="{ cur: currentIndex === i1 }"
          >
            <h3 @mouseenter="changeIndex(i1)">
              <a  href="javascript:;" :data-categoryName="c1.categoryName " :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix" :style="{display:currentIndex === i1 ?'block':'none'}">
              <!-- 二级分类，名称作为表头 -->
              <div
                class="subitem"
                v-for="(c2, i2) in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a href="javascript:;"  :data-categoryName="c2.categoryName " :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <!-- 三级分类，名称作为表单项 -->
                    <em
                      v-for="(c3, i3) in c2.categoryChild"
                      :key="c3.categoryId"
                    >
                      <a  href="javascript:;"  :data-categoryName="c3.categoryName " :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
//引入vuex的辅助函数mapstate，根据名字也能猜到，这个是将vuex的数据映射过来的函数，通常放在组件的computed内
import { mapState } from "vuex";
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  mounted() {
    //如果是非home组件让三级菜单隐藏
    if(this.$route.path!='/home'){
      this.isShow=false
    }

  },
  computed: {
    //通过扩展运算符可以拿到vuex管理的数据，传入一个对象作为参数
    ...mapState({
      //没错，这个state就是大仓库中的state。我们可以根据大仓库中的小仓库一层层拿到数据
      categoryList(state) {
        return state.home.categoryList;
        //现在，找到你的TypeNav组件，看看里面的computed属性吧
      }, //同样的，作为一个箭头函数，我们也可以省略大括号和return关键字，之后我们会采用箭头函数的简写形式
    }),
  },
  data() {
    return {
      //练习通过js来控制三级菜单背景变化。currentIndex存储的是当前激活的一级菜单的索引值，默认不能是0到16
      currentIndex: -1,
      isShow:true
    };
  },
  methods: {
    //鼠标进入后获取一级分类索引，添加类名，然后使用lodash进行节流。注意，应该采用es5的写法，同时尽量不使用箭头函数
    changeIndex:throttle(function(index){
      this.currentIndex = index
    },70),
    //鼠标离开后重置currentIndex并在需要时隐藏菜单
    leaveIndex(){
      this.currentIndex=-1
        if(this.$route.path!='/home'){
        this.isShow=false
      }
    },
    //点击跳转搜索组件并传参
    goSearch(e){   
      //e.target.dataset是存储自定义属性的对象。vue中的自定义属性是data-xxx的形式
      //此处写categoryName和无法被识别，因为浏览器会自动把属性解析为小写，故应写categoryname
      const {categoryname,category1id,category2id,category3id}=e.target.dataset
      console.log(categoryname)
     // this.$router.push('/search')

     //通过自定义属性的方式来查明点击的是哪个标签，之后整理query参数再跳转路由。传递的参数有两个categoryname和categoryid
      if(categoryname){
        let location={name:'search'}
        let query={categoryName:categoryname}
        if(category1id){
          query.category1Id=category1id
        }else if(category2id){
          query.categoryid2=category2id
        }else if(category3id){
          query.category3Id=category3id
        }
       
        //整理参数后跳转路由，如果搜索框中又params参数也要一并传过去
          if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    //鼠标移入后展示菜单
    enterShow(){
        this.isShow=true
    },

  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
           a {
              color: #333;
              text-decoration: none;
            }

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

         
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

       
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    
    .sort-enter , .sort-leave-to{
      height:0px;
    }

    .sort-enter-to , .sort-leave{
      height: 461px;
    }
    
    .sort-enter-active , .sort-leave-active{
      transition: all 0.1s linear;
    }

   
    
  }
}
</style>