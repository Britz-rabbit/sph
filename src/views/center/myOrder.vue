<template>
   <!-- 右侧内容 -->
        <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div class="orders">
                <!-- 每笔订单 -->
                <table class="order-item" v-for="(record , index1) in myOrderInfo.records">
                <!-- 表头 -->
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{record.createTime}}　订单编号：{{record.outTradeNo}} <span
                          class="pull-right delete"><img src="./images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                <!-- 购买的每类产品 -->
                  <tr v-for="(detail , index2) in record.orderDetailList" :key="detail.id">
                    <td width="60%">
                      <div class="typographic">
                        <img :src="detail.imgUrl" style='height:100px;width:100px'>
                        <a href="#" class="block-text">{{detail.skuName}}</a>
                        <span>x{{detail.skuNum}}</span>
                        <a href="#" class="service">售后申请</a>
                      </div>
                    </td>
                    <!-- 先通过商品个数判断要占几个格子，再通过v-if或v-show来控制多余表单项的隐藏 -->
                    <td :rowspan="record.orderDetailList.length" v-if="index2===0" width="8%" class="center">{{record.consignee}}</td>
                    <td :rowspan="record.orderDetailList.length" v-if="index2===0"  width="13%" class="center">
                      <ul class="unstyled">
                        <li>总金额¥{{record.totalAmount}}</li>
                        <li>在线支付</li>
                      </ul>
                    </td>
                    <td :rowspan="record.orderDetailList.length" v-if="index2===0"  width="8%" class="center">
                      <a href="#" class="btn">{{record.orderStatusName}} </a>
                    </td>
                    <td :rowspan="record.orderDetailList.length"  v-if="index2===0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">评价|晒单</a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  
                </tbody>
              </table>

            </div>
            <!-- pagination分页器 -->
              <Pagination   
            :pageNo="page"
            :pageSize="limit"
            :total='myOrderInfo.total'
            :continues="5"
            @changePage="changePage"
            ></Pagination>
          </div>
          <!--猜你喜欢-->
          <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike01.png" />
                </div>
                <div class="attr">
                  <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>3699.00</i>
                </div>
                <div class="commit">已有6人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike02.png" />
                </div>
                <div class="attr">
                  Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4388.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike03.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike04.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
            </ul>
          </div>
        </div>
</template>

<script>
export default {
    name:'myOrder',
    mounted() {
        this.getData()
    },
    data() {
        return {
            page:1,
            limit:3,
            myOrderInfo:{}
        }
    },
    methods: {
        //获取个人订单列表
       async getData(){
        let {page , limit} = this
        const res = await this.$API.reqMyOrderList(page,limit)
        if(res.code==200){
               this.myOrderInfo=res.data
        }else{console.log(res.message)}
      },
      //改变页码
      changePage(page){
      this.page=page
      this.getData()
    },

    },
}
</script>

<style>

</style>