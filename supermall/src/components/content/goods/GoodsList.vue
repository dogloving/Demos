<template>
  <div class="goods">
    <goods-list-item v-for="(goodsItem,index) in goods" :goods-item="goodsItem" :key="index"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "Goods",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
