<template>
  <div class="cart-item">
    <div class="select" :class="{'un-select':selected.indexOf(cartItem.iid)==-1}" @click="toggleSelect"></div>
    <div class="content">
      <img :src="cartItem.image" alt="">
      <div class="detail">
        <div class="title" @click="$router.push(`/detail/${cartItem.iid}`)">{{cartItem.title}}</div>
        <div class="desc">{{cartItem.desc}}</div>
        <div class="info">
          <span class="price">{{cartItem.price}}</span>
          <div class="op">
            <span class="add" @click="add">+</span>
            <span class="del" @click="del">-</span>
          </div>
          <span class="count">x {{cartItem.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItem: Object,
    selected: Array
  },
  data() {
    return {

    }
  },
  methods: {
    toggleSelect() {
      this.$emit('toggle-select',this.cartItem.iid)
    },
    add() {
      this.$store.commit('addToCart', {iid: this.cartItem.iid})
    },
    del() {
      this.$store.commit('deleteFromCart', {iid: this.cartItem.iid})
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  padding: 7px;
}
.select {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  align-self: center;
  background-color: var(--color-tint);
  background-image: url(~assets/img/cart/tick.svg);
  background-position: 2px 2px;
  background-repeat: no-repeat;
  position: relative;
  left: -2px;
}
.un-select {
  background-color: #ddd;
}
.content {
  display: flex;
  width: calc(100% - 20px);
  flex: 1;
}
.content img {
  width: 80px;
  height: 100%;
  size: 100%;
  border-radius: 5px;
}
.detail {
  flex: 1;
  width: calc(100% - 80px);
  padding: 0 10px;
  font-size: 16px;
}
.title, .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title {
  height: 50px;
  color: #000;
  font-size: 16px;
}
.desc {
  height: 18px;
  color: var(--color-text);
  font-size: 14px;
}
.info {
  height: calc(100% - 18px - 50px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.price {
  color: orangered;
  flex: 1;
}
.count {
  color: #000;
  flex: 1;
  text-align: right;
}
.op {
  flex:1;
  display: flex;
  justify-content: space-around;
}
.add, .del {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-tint);
  text-align: center;
}
</style>