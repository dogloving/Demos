<template>
  <swiper ref="homeSwiper">
    <swiper-item v-for="item,idx of banners" :key="idx">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  components: {Swiper,SwiperItem},
  props: {
    banners: Array
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    imgLoad() {
      this.count++
      if (this.count==this.banners.length) this.$refs.homeSwiper.handleDom()
    }
  }
}
</script>

<style>

</style>