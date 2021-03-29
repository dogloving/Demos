<template>
  <div class="bottom-bar">
    <div class="service">
      <div class="icon"></div>
      <div class="title">客服</div>
    </div>
    <div class="shop">
      <div class="icon"></div>
      <div class="title">店铺</div>
    </div>
    <div class="collect" @click="collected=!collected">
      <div class="icon2" v-if="collected"></div>
      <div class="icon" v-else></div>
      <div class="title">收藏</div>
    </div>
    <div class="add-cart" @click="$emit('addOne')">加入购物车</div>
    <div class="buy">购买</div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      collected: true
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 49px;
}
.service, .shop, .collect {
  flex: 1;
}
div[class^='icon'] {
  margin: 5px auto 0;
  width: 22px;
  height: 22px;
  background-image: url('~assets/img/detail/detail_bottom.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
.service .icon {
  background-position: 0 -52px;
}
.shop .icon {
  background-position: 0 -96px;
}
.collect .icon {
  background-position: 0 0;
}
.collect .icon2 {
  background-position: 0 -26px;
}
.title {
  text-align: center;
  font-size: 12px;
}
.add-cart {
  flex: 2;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}
.add-cart:active {
  background-color: rgb(255, 174, 0);
  font-size: 12px;
}
.buy {
  flex: 2;
  background-color: var(--color-tint);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>