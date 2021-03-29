<template>
  <div class="detail">
    <detail-nav-bar class="nav-bar" @itemClick="itemClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScoll"
      :probe-type="3" :pull-up-load="true">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" ref="goods"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>
    <detail-buttom-bar @addOne="addOne"></detail-buttom-bar>
    <back-top class="back-top" @click.native="backTop" v-if="showBackTop"></back-top>
    <toast msg="商品已加入购物车" v-if="showAddCart"></toast>
  </div>  
</template>

<script>
import DetailNavBar from './childDetail/DetailNavBar'
import DetailSwiper from './childDetail/DetailSwiper'
import DetailBaseInfo from './childDetail/DetailBaseInfo'
import DetailShopInfo from './childDetail/DetailShopInfo'
import DetailGoodsInfo from './childDetail/DetailGoodsInfo'
import DetailParamInfo from './childDetail/DetailParamInfo'
import DetailCommentInfo from './childDetail/DetailCommentInfo'
import DetailButtomBar from './childDetail/DetailButtomBar'

import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import Toast from 'components/common/toast/Toast'


import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
export default {
  name: 'Detail',
  components: {DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,Scroll,Toast,
    DetailGoodsInfo,DetailParamInfo,BackTop,DetailCommentInfo,GoodsList,DetailButtomBar},
  data() {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      detailImages: {},
      paramInfo: {},
      commentInfo: [],
      recommendInfo: [],
      showBackTop: false,
      itemY: [],
      showAddCart: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScoll(y) {
      this.showBackTop = y<-1000
      for (let i = 3; i >= 0; i--) {
        if (y<=this.itemY[i]) {
          this.$refs.navbar.currentIndex = i
          break
        }
      }
    },
    itemClick(idx) {
      this.$refs.scroll.scrollTo(0,this.itemY[idx])
    },
    addOne() {
      this.showAddCart = true
      setTimeout(()=>this.showAddCart=false,3000)
      this.$store.commit('addToCart', {
        iid: this.iid,
        title: this.goods.title,
        price: this.goods.realPrice,
        desc: this.goods.desc,
        image: this.topImages[0]
      })
    }
  },
  updated() {
    this.itemY = []
        this.itemY.push(0)
        this.itemY.push(-this.$refs.param.$el.offsetTop)
        this.itemY.push(-this.$refs.comment.$el.offsetTop)
        this.itemY.push(-this.$refs.recommend.$el.offsetTop)
  },
  created() {
    this.iid = this.$route.params.iid
    // 通过iid获取商品信息
    getDetail(this.iid).then(data=>{
      // 顶部轮播图
      this.topImages = data.result.itemInfo.topImages
      // 商品信息
      this.goods = new Goods(data.result.itemInfo,data.result.columns,
        data.result.shopInfo.services)
      // 店铺信息
      this.shop = new Shop(data.result.shopInfo)
      // 商品详情
      this.detailInfo = data.result.detailInfo
      const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on('imgLoaded',refresh)
      // 参数信息
      this.paramInfo = new GoodsParam(data.result.itemParams.info,data.result.itemParams.rule)
      // 评论信息
      this.commentInfo = data.result.cRate==0?[]:data.result.rate.list
    })
    // 获取推荐数据
    getRecommend().then(data=>{
      this.recommendInfo = data.data.list
    })
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 1000;
  background-color: #fff;
  min-height: 100vh;
}
.nav-bar {
  height: 44px;
}
.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
.back-top {
  position: fixed;
  bottom: 60px;
  right: 10px;
}
</style>