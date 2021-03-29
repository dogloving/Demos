<template>
  <div class="shop-cart">
    <cart-nav-bar :count="Object.keys(getCartItems).length"></cart-nav-bar>
    <cart-item-list :cart-list="getCartItems" @toggle-select="toggleSelect"
      :selected="selectedItem" class="scroll"></cart-item-list>
    <cart-bottom-bar :total="total" @select-all="selectAll"
      :all="(selectedItem.length==Object.keys(getCartItems).length)&&selectedItem.length!=0"></cart-bottom-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartNavBar from './childCart/CartNavBar'
import CartItemList from './childCart/CartItemList'
import CartBottomBar from './childCart/CartBottomBar'

export default {
  components: {CartNavBar,CartItemList,CartBottomBar},
  computed: {
    ...mapGetters(['getCartItems']),
    total() {
      let res = 0
      for (let iid of this.selectedItem) {
        res += this.getCartItems[iid].count*this.getCartItems[iid].price
      }
      return Math.ceil(res)
    }
  },
  methods: {
    toggleSelect(iid) {
      if (this.selectedItem.indexOf(iid)==-1) this.selectedItem.push(iid)
      else this.selectedItem.splice(this.selectedItem.indexOf(iid),1)
    },
    selectAll() {
      if (this.selectedItem.length==Object.keys(this.getCartItems).length) this.selectedItem = []
      else this.selectedItem = Object.keys(this.getCartItems)
    }
  },
  data() {
    return {
      selectedItem: []
    }
  }
}
</script>

<style scoped>
.shop-cart {
  height: 100%;
}
.scroll {
  height: calc(100vh - 44px - 49px - 35px);
  overflow: scroll;
}
</style>