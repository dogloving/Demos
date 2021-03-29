<template>
  <div class="item-list">
    <cart-item v-for="iid,idx of Object.keys(cartList)" :key="idx" 
    :cart-item="cartList[iid]" @toggle-select="toggleSelect" :selected="selected"></cart-item>
  </div>  
</template>

<script>
import CartItem from './CartItem'

export default {
  components: {CartItem},
  props: {
    cartList: Object,
    selected: Array
  },
  watch: {
    cartList() {}
  },
  methods: {
    toggleSelect(iid) {
      this.$emit('toggle-select',iid)
    }
  }
}
</script>

<style>

</style>