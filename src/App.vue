<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHindFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    Header,
    Footer
  },
  mounted() {
     //通过vuex派发一些数据，该数据会存储到actions之中，之后交给mutations再影响states
    this.$store.dispatch("getCategoryList"); //通知vuex去执行一个叫做getCategoryList的动作。我们把这个动作写到home这个小仓库里
  },
}
</script>

<style>

</style>
