<template>
  <div id="detail-navbar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" class="title-item" :class="{active: index===currentIndex}"
          @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "Detail",
    components: {
      NavBar
    },
    data () {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick (index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick () {
        this.$router.back()
      }

    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    position: relative;
    left: 12px;
    top: 6px;
  }
</style>
