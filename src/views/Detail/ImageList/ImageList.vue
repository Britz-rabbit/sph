<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img :src="slide?.imgUrl" :class="{active:index==currentIndex}" @click="changeCur(index)"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex:0,
    }
  },
  watch: {
    //使用swiper的三大要求：引包，引样式，结构完整（包括请求数据回来，虚拟DOM转化完成）
    //其中最难的是第三点，为此我们需要使用watch + $nextTick() 来保证v-for完成，结构完整
    skuImageList(val) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //配置一行显示多张图
          slidesPerView: 3,
          grid: {
            fill: "row",
            rows: 1,
          },
        });
      });
    },
  },
  methods: {
    //通过index点击图片切换小图，同时通知兄弟组件改变大图。兄弟间通信使用$bus实现
    changeCur(index){
      this.currentIndex=index
      this.$bus.$emit('getCurrentIndex',index)
    }
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>