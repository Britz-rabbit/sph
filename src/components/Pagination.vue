<template>
  <div class="pagination">
    <!-- 左部分 -->
    <button :disabled="pageNo === 1" @click="$emit('changePage', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('changePage', 1)"
      :class="{ active: pageNo===1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">...</button>
    <!-- 中间部分 v-for遍历数字会从1数到遍历的数字，即end。再通过v-if来隐藏掉start之前遍历出来的button-->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('changePage', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 右部分 -->
    <button v-if="startNumAndEndNum.end<totalPage-1">...</button>
    <button v-if="startNumAndEndNum.end < totalPage" :class="{active:pageNo===totalPage}">{{totalPage}}</button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('changePage', pageNo + 1)"
    >
      下一页
    </button>
    <!-- 输入框跳转页数 -->
    <input type="number"
    @input="inspect"
     v-model.number="goPage" 
    @keydown.enter="$emit('changePage', goPage)">
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
    pageNum:1,
    goPage:1
    }
  },
  props: ["pageSize", "pageNo", "total", "continues"],
  computed: {
    //总共页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算中间页码的展示效果
    startNumAndEndNum() {
      let start = 0,
        end = 0;
      //如果总页数比要求展示的连续数据少
      if (this.totalPage <= this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常情况
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        //注意start不能为0或负数
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //对于end，它不能大于总页码
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
  watch:{
    pageNo(page){
        this.pageNum=page
    }
  },
  methods: {
    inspect(){
      //规定可输入的范围并取整
        if(this.goPage<=0)this.goPage=1
        if(this.goPage>this.totalPage)this.goPage=this.totalPage
        this.goPage=Math.floor(this.goPage)
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background: skyblue;
}

input{
    margin: 0 5px;
    color: #606266;
    border: 1px #656568 solid;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    font-size: 13px;
    min-width: 57px;
    height: 26px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
}
</style>