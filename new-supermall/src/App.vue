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

export default {
  name: 'App',
  components: {
    MainTabBar
  },
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
