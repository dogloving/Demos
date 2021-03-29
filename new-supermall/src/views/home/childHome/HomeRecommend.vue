<template>
  <div class="recommend">
    <div v-for="item,idx of recommends" :key="idx" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: Array
  }
}
</script>

<style>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.recommend-item img {
  width: 65%;
  height: 65%;
}
.recommend-item div {
  height: 20px;
  line-height: 20px;
}
</style>