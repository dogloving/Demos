<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1"
        v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  // import BackTop from "components/content/backTop/BackTop";

  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {BACK_POSITION} from "common/const";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      // BackTop,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList
    },
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0, // 离开Home页时的位置，使得回来的时候仍在那个位置
        itemImgListener: null
      }
    },
    computed: {
      goodsList () {
        return this.goods[this.currentType].list
      }
    },
    created () {
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated () {
      console.log('----come-----'+this.saveY)
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated () {
      this.saveY = this.$refs.scroll.scroll.y
      console.log('----leave-----'+this.saveY)
      // 取消全局事件监听，防止在其他界面也有goodsList时Home页面还在监听图片加载
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    mixins: [itemListenerMixin, backTopMixin],
    mounted () {
      // // 监听item中图片加载完成，使用refresh更新scroll的height(解决有时候划不动的bug)
      // const refresh = this.debounce(this.$refs.scroll.refresh, 500)
      // // 对监听事件进行保存
      // this.itemImgListener = ()=> {refresh()}
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取z组件中元素
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    },
    methods: {
      // 网络请求相关方法
      getHomeMultidata () {
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res=>{
          // this.goods[type].list.concat(res.data.list)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
        })
      },
      // 事件监听相关方法
      tabClick (index) {
        // 切换流行/新款/热销
        if (index == 0) this.currentType = 'pop'
        else if (index == 1) this.currentType = 'new'
        else if (index == 2) this.currentType = 'sell'
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // backTop () {
      //   this.$refs.scroll.scrollTo(0, 0, 500)
      // },
      contentScroll (position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > BACK_POSITION
        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore () {
        // 上拉加载
        // 可能会出现上拉不动的情况，因为图片是异步加载，此时图片还没加载完成，scroll的height还没更新
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.scroll.refresh()
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad () {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    //   debounce (func, delay=100) {
    //     // 防抖函数，防止频繁refresh
    //     let timer = null
    //     return function (...args) {
    //       if (timer) clearTimeout(timer)
    //       timer = setTimeout(()=> {
    //         func.apply(this, args)
    //       }, delay)
    //     }
    //   }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 10;*/
  }
  .tab-control {
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 10;*/
    position: relative;
    z-index: 10;
  }
  .content {
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    /*margin-top: 44px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
