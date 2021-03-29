<template>
  <div class="goods-list">
    <goods-list-item v-for="item,idx of goods" :key="idx" :goods-item="item"></goods-list-item>
  </div>  
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  components: {GoodsListItem},
  props: {
    goods: Array
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>