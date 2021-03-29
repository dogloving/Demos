<template>
  <div v-if="Object.keys(goods).length!=0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="real-price">当前价格：<span>￥{{goods.realPrice}}</span></span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="item,idx of goods.services" :key="idx">
        <img :src="goods.services[idx].icon" alt="">
        <span>{{goods.services[idx].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: Object
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.base-info {
  padding: 10px;
}
.info-title {
  font-size: 20px;
  color: #000;
}
.new-price {
  color: var(--color-tint);
  font-size: 20px;
}
.old-price {
  color: #ccc;
  font-size: 12px;
  margin-left: 5px;
  text-decoration: line-through;
}
.real-price {
  color: #000;
  float: right;
}
.real-price span {
  color: red;
}
.info-service {
  display: flex;
  justify-content: center;
  color: #555;
  font-size: 12px;
}
.info-service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.info-service-item img {
  height: 15px;
  width: 15px;
  margin: 10px 0;
}
.info-service-item span {
  text-align: center;
  margin-bottom: 5px;
}
</style>