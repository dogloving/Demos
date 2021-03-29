<template>
  <div class="bottom-bar">
    <div class="select-all">
      <div class="icon" @click="$emit('select-all')" :class="{'icon2':all}"></div>全选
    </div>
    <div class="total">
      合计：￥ {{total}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    all: Boolean
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.total {
  height: 100%;
  padding-right: 20px;
}
.select-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image: url(~assets/img/cart/tick.svg);
  background-position: 2px 2px;
  background-repeat: no-repeat;
  background-color: #ddd;
  margin-right: 5px;
}
.icon2 {
  background-color: var(--color-tint);
}
</style>