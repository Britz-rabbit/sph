<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
          <!-- 分类名bread -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
          <!-- 关键字bread-->
             <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword
              }}<i @click="removeKeyword">×</i>
            </li>
            <!-- tradeMark bread -->
              <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i>
            </li>
            <!-- attrs bread -->
              <li class="with-x" v-for="(attr,index) in searchParams.props" :key="attr.attrId">
              {{ attr.split(':')[1]}}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector  @trademarkInfo="trademarkInfo" @showAttrInfo='showAttrInfo'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
            <!-- order -->
              <ul class="sui-nav">
                <li :class="searchParams.order==='1:desc'?'active':''" @click="changeOrder('1:desc')">
                  <a href="javascripe:;">综合⬇</a>
                </li>
                <li :class="searchParams.order==='1:asc'?'active':''"  @click="changeOrder('1:asc')">
                  <a href="javascripe:;">综合⬆</a>
                </li>
                <li :class="searchParams.order==='2:desc'?'active':''"  @click="changeOrder('2:desc')">
                  <a href="javascripe:;">价格⬇</a>
                </li>
                <li :class="searchParams.order==='2:asc'?'active':''"  @click="changeOrder('2:asc')">
                  <a href="javascripe:;">价格⬆</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, i1) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                  <!-- 点击跳转到商品详情的路由组件 -->
                    <router-link :to="`/detail/${good.id}`">
                     <img v-lazy="good.defaultImg" />
                    </router-link>                                     
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
         <Pagination   
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total='total'
            :continues="5"
            @changePage="changePage"
            ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector.vue";
import { mapGetters , mapState} from "vuex";

export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  beforeMount() {
    //使用es6的Object.assign()把不同对象的对应属性合并。第一个参数是主对象，其余是副对象
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      //发送搜索请求返回的参数对象。具体见api文档
      searchParams: {
        //产品分类id，分为一二三三级
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品名
        categoryName: "",
        //搜索关键字
        keyword: "",
        //要求的产品排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
        order: "1:desc",
        //当前页数
        pageNo: 1,
        //每页产品最大展示数
        pageSize: 3,
        //商品属性的数组: ["属性ID:属性值:属性名"]   示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        props: [],
        //搜索的产品品牌 品牌: "ID:品牌名称"   示例: "1:苹果"
        trademark: "",
      },
    };
  },
  computed: {
    //注意，仓库中的state是分大小模块的，而getters的数据是公用的，故...mapState与...mapGetters的写法略有不同
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods: {
    //获取搜索的数据，并根据携带的不同参数服务器返回不同结果
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //分类名面包屑点击事件
    removeCategoryName() {
      //鉴于以下几个参数都是非必须参数，我们可以把他们设置为undefined来代替‘空字符串。这样在发送请求时将不会携带参数，提高性能。
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
       //地址栏中的显示也需要需改：我们采用的方法是重新跳转路由。
       //注意：query参数如分类名和id已经被情况，但是搜索栏中的params参数不应该盲目清空
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //搜索关键字面包屑点击事件
    removeKeyword(){
      this.searchParams.keyword = '';
      //使用全局事件总线通知兄弟组件Header发起一个clear的自定义事件。在该事件中我们清空了搜索框内容并重新跳转了路由
      this.$bus.$emit("clear");
      this.getData()
    },
    removeTradeMark(){
      this.searchParams.trademark=undefined
      this.getData()
    },
    //父子间品牌名通信用的自定义事件
    trademarkInfo(tm){
      //console.log('父组件接收到了',tm)
      this.searchParams.trademark=`${tm.tmId}:${tm.tmName}`
      this.getData()
    },
    //根据子组件参来的参数获取后台数据
    showAttrInfo(props){
      //alert(props)//23:12G:运行内存
      if(!this.searchParams.props.includes(props)){
        this.searchParams.props.push(props)
      this.getData()
      }else return
    },
    //属性值面包屑删除指定元素
    removeAttr(index){
      //splice方法会改变原数组，不需要重新复赋值。而且重新赋值会发生索引值与面包屑索引对不上的bug
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    //改变排序
    changeOrder(order){
      this.searchParams.order=order
      this.getData()
    },
    //改变页码
    changePage(page){
      //alert(page)
      this.searchParams.pageNo=page
      this.getData()
    },
  },
  //只要组件实例对象身上的属性值发生了变化，watch都可以监听到。这其中就包括$route。当路由信息发生变化后，再次发送请求
  watch: {
    $route(value, oldValue) {
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.getData();
      //点击‘搜索’ 后清除分类id防止数据紊乱
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>