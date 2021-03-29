<template>
  <div id="home">
    <!-- navbar -->
    <nav-bar class="home-nav">
      <template v-slot:center><span>购物街</span></template>
    </nav-bar>
    <!-- 下面这个是为了实现tabControl的吸顶效果 -->
    <tab-control :titles="['流行','新款','精选']" class="tab-control-fixed"
      @itemClick="itemClick" :current-index="currentIndex" ref="tabControl2"
      v-show="tabControlFixed"></tab-control>
    <scroll class="content" ref="homeScroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
      @loadMore="loadMore">
      <template>
        <div>
          <!-- 轮播图 -->
          <home-swiper :banners="banners"></home-swiper>
          <!-- 推荐栏 -->
          <home-recommend :recommends="recommends"></home-recommend>
          <!-- 本周流行 -->
          <home-feature class="feature"></home-feature>
          <!-- 流行-新款-精选 -->
          <tab-control :titles="['流行','新款','精选']" class="tab-control"
            @itemClick="itemClick" :current-index="currentIndex" ref="tabControl"></tab-control>
          <!-- 商品展示 -->
          <goods-list :goods="goods[currentType].list"></goods-list>
        </div>
      </template>
    </scroll>
    <back-top class="back-top" @click.native="backTop" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from './childHome/HomeSwiper'
import HomeRecommend from './childHome/HomeRecommend'
import HomeFeature from './childHome/HomeFeature'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: 'Home',
  components: {NavBar,HomeSwiper,HomeRecommend,HomeFeature,
  TabControl,GoodsList,Scroll,BackTop},
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 1, list: []},
        'new': {page: 1, list: []},
        'sell': {page: 1, list: []},
      },
      currentType: 'pop',
      currentIndex: 0,
      showBackTop: false,
      tabControlFixed: false,
      saveY: 0
    }
  },
  methods: {
    // 请求轮播图、推荐栏数据
    getHomeMultidata() {
      getHomeMultidata().then(data=> {
        this.banners = data.data.banner.list
        this.recommends = data.data.recommend.list
      })
    },
    // 请求商品数据
    getHomeGoods(type) {
      getHomeGoods(type,this.goods[type].page).then(data=> {
        this.goods[type].list.push(...data.data.list)
        this.goods[type].page++
      })
    },
    // 选择流行/新款/精选
    itemClick(idx) {
      this.currentIndex = idx
      if (idx==0) this.currentType = 'pop'
      else if (idx==1) this.currentType = 'new'
      else if (idx==2) this.currentType = 'sell'
    },
    // 回到顶部
    backTop() {
      this.$refs.homeScroll.scrollTo(0,0,1000)
    },
    // 获取scroll y坐标，以显示隐藏backtop
    contentScroll(y) {
      // backTop显示/隐藏
      this.showBackTop = y<-1000
      // tabControl是否吸顶(把另一个tabControl显示出来)
      this.tabControlFixed = -y>(this.$refs.tabControl.$el.offsetTop)
    },
    // 加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    }
  },
  created() {
    // 请求轮播图、推荐栏数据
    this.getHomeMultidata()
    // 请求商品数据
    for (let type in this.goods) {
      this.getHomeGoods(type)
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.homeScroll.refresh)
    this.$bus.$on('imgLoaded',refresh)
  },
  deactivated() {
    this.saveY = this.$refs.homeScroll.getPosY()
    this.$bus.$off('imgLoaded', this.itemImgListener)
  },
  activated() {
    this.$refs.homeScroll.refresh()
    this.$refs.homeScroll.scrollTo(0,this.saveY,0)
    this.$refs.homeScroll.refresh()
  }
}
</script>

<style scoped>
.home-nav {
  /* 用了better-scroll，下面代码注释掉 */
  /* position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
  background-color: var(--color-tint);
  color: #fff;
  box-shadow: 0 2px 2px rgba(0,0,0,.1);
}
.feature {
  margin-top: -20px;
}
.tab-control {
  /* position: sticky;
  top: 43px;
  z-index: 10; */
  background-color: #fff;
}
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}
.back-top {
  position: fixed;
  bottom: 60px;
  right: 10px;
}
.tab-control-fixed {
  position: fixed;
  width: 100%;
  top: 43px;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #fff;
}
</style>