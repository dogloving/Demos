<template>
  <swiper class="swiper" ref="detailSwiper">
    <swiper-item v-for="item,idx of topImages" :key="idx" class="swiper-item">
      <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'


export default {
  name: 'DetailSwiper',
  components: {Swiper,SwiperItem},
  props: {
    topImages: Array
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    imgLoad() {
      this.count++
      if (this.count==this.topImages.length) this.$refs.detailSwiper.handleDom()
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
.swiper img {
  width: 100%;
}
</style>