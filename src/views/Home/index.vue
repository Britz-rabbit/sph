<template>
  <div>
  <TypeNav></TypeNav>
  <List></List>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor></Floor>
  <Floor></Floor>
  <Brand></Brand>
</div>
</template>

<script>
import List from './List.vue'
import Recommend from './Recommend.vue'
import Rank from './Rand.vue'
import Like from './Like.vue'
import Image from './Floor.vue'
import Floor from './Floor.vue'
import Brand from './Brand.vue'

export default {
  components:{
    List,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
},
}
</script>

<style>

</style>