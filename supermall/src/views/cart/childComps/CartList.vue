<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in list" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem"
  import Scroll from "components/common/scroll/Scroll"
  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      }
    },
    activated () {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: 100vh;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 49px - 44px - 40px);
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
</style>
