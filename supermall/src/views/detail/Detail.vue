<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"
  import GoodsList from "components/content/goods/GoodsList"

  import Scroll from "components/common/scroll/Scroll"
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from "common/utils"

  import {getDetail, getRecommend, Shop, Goods, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailParamInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,

      Scroll
    },
    data () {
      return {
        id: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        getThemeTopYs: null
      }
    },
    created () {
      this.id = this.$route.params.id
      getDetail(this.id).then(res=> {
        const data = res.result
        // 顶部轮播图信息
        this.topImages = res.result.itemInfo.topImages
        // 商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 商家信息
        this.shop = new Shop(data.shopInfo)
        // 商品详细信息
        this.detailInfo = data.detailInfo
        // 商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 商品评论
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        //
        this.$nextTick(()=> {
          // Dom渲染了，但是图片没有加载完，所以得不到正确的offsetTop
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        })
      })
      // 推荐数据
      getRecommend().then(res=> {
        this.recommends = res.data.list
      })
      // 对了
      this.getThemeTopYs = debounce(()=> {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      })
    },
    destroyed () {
      // 取消全局事件监听，防止在其他界面也有goodsList时Detail页面还在监听图片加载
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    mixins: [itemListenerMixin, backTopMixin],
    mounted () {
      // // 监听item中图片加载完成，使用refresh更新scroll的height(解决有时候划不动的bug)
      // const refresh = this.debounce(this.$refs.scroll.refresh, 500)
      // // 对监听事件进行保存
      // this.itemImgListener = ()=> {refresh()}
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    methods: {
      titleClick (index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      imageLoad () {
        this.$refs.scroll.refresh()
        this.getThemeTopYs()
      },
      contentScroll (position) {
        const y = -position.y
        if (y < this.themeTopYs[1]) this.$refs.detailNavBar.currentIndex = 0
        else if (y < this.themeTopYs[2]) this.$refs.detailNavBar.currentIndex = 1
        else if (y < this.themeTopYs[3]) this.$refs.detailNavBar.currentIndex = 2
        else this.$refs.detailNavBar.currentIndex = 3
        this.listenShowBackTop(position)
      },
      addToCart () {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.id = this.id
        // 将商品添加到购物车
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(msg=>{
          console.log('start')
          this.$toast.show(msg, 1500)
          console.log('end')
          // this.toastMessage=msg
          // setTimeout(()=> {
          //   this.toastMessage = ''
          // }, 1000)
        }) // dispatch用于异步(接收者为actions，commit接收者为mutations)
      }
      // debounce (func, delay=100) {
      //   // 防抖函数，防止频繁refresh
      //   let timer = null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(()=> {
      //       func.apply(this, args)
      //     }, delay)
      //   }
      // }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 10;
  }
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    position: relative;
    left: 0;
    right: 0;
  }
  .bottom-bar {
    height: 49px;
    background-color: #fff;
    position: relative;
    /*z-index: 10;*/
  }
</style>
