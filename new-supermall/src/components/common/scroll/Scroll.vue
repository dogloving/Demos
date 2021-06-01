<template>
  <div class="wrapper" ref="scroll">
    <div class="content"><slot></slot></div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: Number,
    pullUpLoad: Boolean
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll('.wrapper', {
      click: true, // 默认scroll内click无效
      probeType: this.probeType, // 开启实时监听
      pullUpLoad: this.pullUpLoad, // 設爲true后可以監聽pullingUp事件
    })
    // 监听滚动位置发送位置给父组件，显示/隐藏backTOp按钮
    this.scroll.on('scroll',(pos)=>{
      this.$emit('scroll',pos.y)
    })
    // 拉到底部上拉加载更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('loadMore')
      this.scroll.finishPullUp()
      // this.scroll.refresh()
    })
  },
  methods: {
    scrollTo(x,y,time=1000) {
      this.scroll.scrollTo(x,y,time)
    },
    getPosY() {
      return this.scroll.y
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
</style>