<template>
  <nav-bar class="nav-bar">
    <template v-slot:center>
      <div>购物车({{count}})</div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {NavBar},
  props: {
    count: Number
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>