<template>
  <div>
  <TypeNav></TypeNav>
  <List></List>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <!-- 组件的v-for循环，通过props实现父子传参 -->
  <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
  <Brand></Brand>
</div>
</template>

<script>
import List from './List.vue'
import Recommend from './Recommend.vue'
import Rank from './Rand.vue'
import Like from './Like.vue'
import Floor from './Floor.vue'
import Brand from './Brand.vue'
import { mapState } from 'vuex'

export default {
  name:'home',
  components:{
    List,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
},
  mounted() {
    //获取底部轮播图数据
    this.$store.dispatch('getFloorList')  
    //  获取用户信息
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList:state=>state.home.floorList 
    })
  },
}
</script>

<style>

</style>