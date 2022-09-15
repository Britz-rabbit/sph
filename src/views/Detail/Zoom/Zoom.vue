<template>
  <div class="spec-preview">
  <!-- 商品图片 -->
    <img :src="skuImageList[index]?.imgUrl" />
    <div class="event" @mousemove="handleMouseMove"></div>
    <div class="big">
    <!-- 放大镜显示的大图 -->
      <img :src="skuImageList[index]?.imgUrl" ref="big"/>
    </div>
    <!-- 放大镜遮板 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    mounted() {
      //事件只需绑定过一次，就能重复触发执行。所以我们只需要在mounted中绑定即可，后续兄弟组件index的改变依旧会触发事件
      this.$bus.$on('getCurrentIndex',(index)=>{
        this.index=index
      })
    },
    data() {
      return {
        index:0
      }
    },
    methods: {
      //事件处理函数中event是默认被传进去的。所以即使我们不写event，我们也能使用它。（一般情况下都会写上event，或者偷个懒，写成e）
      handleMouseMove(e){
        let mask = this.$refs.mask
        let big=this.$refs.big
      // console.log(e)
      //用y表示mask到图片边框最左边的距离，用x表示到最上边的距离
       let x = e.offsetX - mask.offsetWidth/2
       let y = e.offsetY - mask.offsetHeight/2
      //需要对mask的活动返回进行约束。注：两个mask的宽高即为图片显示区域的宽高。
      if(x<=0) x=0
      if(x>= mask.offsetWidth) x=mask.offsetWidth
      if(y<=0) y=0
      if(y>= mask.offsetHeight) y=mask.offsetHeight
      //将y和x应用到mask的样式中，注意加 'px'
      mask.style.left=x+'px'
      mask.style.top=y+'px'
      //对于右侧显示的大图，他的尺寸是图片的两倍，超出盒子的地方被裁掉了
      big.style.left=- 2 *x +'px'
      big.style.top=- 2 *y  +'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>