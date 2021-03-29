<template>
  <div class="shop-info" v-if="Object.keys(shop).length!=0">
    <div class="shop-title">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="other-info">
      <div class="info-sell">
        <span>{{shop.sells}}</span>
        <span>总销量</span>
      </div>
      <div class="info-all">
        <span>{{shop.goodsCount}}</span>
        <span>全部宝贝</span>
      </div>
      <div class="info-score">
        <div class="score-item">
          <div>{{shop.score[0].name}}</div>
          <div>{{shop.score[0].score}}</div>
          <div :class="{red:!shop.score[0].isBetter,green:shop.score[0].isBetter}">{{shop.score[0].isBetter?'高':'低'}}</div>
        </div>
        <div class="score-item">
          <div>{{shop.score[1].name}}</div>
          <div>{{shop.score[1].score}}</div>
          <div :class="{red:!shop.score[1].isBetter,green:shop.score[1].isBetter}">{{shop.score[1].isBetter?'高':'低'}}</div>
        </div>
        <div class="score-item">
          <div>{{shop.score[2].name}}</div>
          <div>{{shop.score[2].score}}</div>
          <div :class="{red:!shop.score[2].isBetter,green:shop.score[2].isBetter}">{{shop.score[2].isBetter?'高':'低'}}</div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    shop: Object
  }
}
</script>

<style scoped>
.shop-info {
  border-top: 3px solid #eee;
  border-bottom: 3px solid #eee;
  padding: 20px 10px;
  color: #000;
  font-size: 14px;
}
.shop-title {
  height: 50px;
  margin-bottom: 10px;
  font-size: 20px;
  color: var(--color-text);
}
.shop-title img {
  width: 50px;
  height: 50px;
  border: 1px solid #eee;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 20px;
}
.other-info {
  display: flex;
}
.other-info div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}
.info-sell {
  flex: 1;
  justify-content: center;
}
.info-all {
  flex: 1;
  justify-content: center;
  border-right: 1px solid #eee;
}
.info-score {
  flex: 2;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.info-score .score-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.score-item div:nth-child(3) {
  color: #fff;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
</style>