import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
const loadimage = require('@/assets/images/dae.gif')
//import dae from '@/assets/images/dae.gif'

Vue.use(VueLazyload,{
    loading: loadimage,
})