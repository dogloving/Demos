<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoaded">
    <div class="goods-info">
      <p class="goods-title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">☆{{goodsItem.cfav}}</span>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    goodsItem: Object
  },
  computed: {
    showImage() {
      return this.goodsItem.image||this.goodsItem.show.img
    }
  },
  methods: {
    imgLoaded() {
      this.$bus.$emit('imgLoaded')
    },
    itemClick() {
      this.$router.push(`/detail/${this.goodsItem.iid}`)
    }
  }
}
</script>

<style>
.goods-item {
  width: 45%;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0,0,0,.3);
  box-shadow: 0px -2px 5px rgba(0,0,0,.3);
  box-shadow: -2px 0px 5px rgba(0,0,0,.3);
  box-shadow: 2px 0px 5px rgba(0,0,0,.3);
  margin-bottom: 15px;
  padding-bottom: 5px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  text-align: center;
}
.goods-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
}
.goods-info span {
  margin: 0 5px;
}
.price {
  color: var(--color-tint);
}
</style>