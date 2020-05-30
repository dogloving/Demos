<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list :list="list"></cart-list>
    <cart-bottom-bar :list="list"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    data () {
      return {

      }
    },
    computed: {
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
