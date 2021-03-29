<template>
  <nav-bar class="nav-bar">
    <template v-slot:left>
      <div style="text-align;center;padding-top:5px;" @click="$router.back()">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <span v-for="title,idx of titles" :key="idx" class="title-item"
          :class="{active:idx===currentIndex}" @click="itemClick(idx)">{{title}}</span>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {NavBar},
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(idx) {
      this.currentIndex = idx
      this.$emit('itemClick',idx)
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 14px;
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
</style>