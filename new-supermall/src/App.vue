<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/maintabbar/MainTabBar";

import {mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    MainTabBar
  },
  methods: {
    ...mapMutations(['restore'])
  },
  created() {
    // 从localStorage中获取保存数据
    let store = {}
    let shopCart = JSON.parse(localStorage.getItem('shopcart'))
    store['shopcart'] = shopCart?shopCart:{}
    this.restore(store)
  }
}
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
#app {
  max-width: 100%;
}
.main-tab-bar {
  z-index: 100;
}
</style>
