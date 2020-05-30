import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop"
import {BACK_POSITION} from "./const";

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    }
  },
  mounted () {
    // 监听item中图片加载完成，使用refresh更新scroll的height(解决有时候划不动的bug)
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 对监听事件进行保存
    this.itemImgListener = ()=> {refresh()}
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}
