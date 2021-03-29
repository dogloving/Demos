<template>
  <div v-if="Object.keys(detailInfo).length!=0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-lazy="item" alt="" v-for="item,idx of detailInfo.detailImage[0].list"
        :key="idx" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: Object
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('imgLoaded')
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 10px 10px;
}
.info-desc {
  position: relative;
  font-size: 14px;
  vertical-align: left;
  padding-top: 20px;
  padding-bottom: 20px;
}
.start {
  width: 100px;
  height: 2px;
  background-color: #ccc;
  float: left;
  position: relative;
  top: -17px;
  left: 5px;
}
.start::before {
  content: '';
  width: 5px;
  height: 5px;
  background-color: #000;
  position: absolute;
  left: -5px;
  top: -3px;
}
.end {
  width: 100px;
  height: 2px;
  background-color: #ccc;
  float: right;
  position: relative;
  right: 5px;
  top: 18px;
}
.end::after {
  content: '';
  width: 5px;
  height: 5px;
  background-color: #000;
  position: absolute;
  right: 0;
  top: -3px;
}
.desc {
  clear: both;
}
.info-key {
  font-size: 16px;
  color: #000;
  padding: 5px 0;
}
.info-list {
  padding: 10px 0;
}
.info-list img {
  width: 100%;
}

</style>