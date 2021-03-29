<template>
  <div class="comment-info">
    <div class="comment">用户评价</div>
    <div class="comment-item" v-for="item,idx of commentInfo" :key="idx">
      <div class="comment-user">
        <img :src="item.user.avatar" alt="">{{item.user.uname}}
      </div>
      <div class="comment-content">{{item.content}}</div>
      <div class="comment-other">
        {{getDate(item.created)}} {{item.style}}
      </div>
      <div class="comment-image">
        <img :src="image" alt="" v-for="image,i of item.images" :key="i" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
import {getDate} from 'common/utils'
export default {
  props: {
    commentInfo: Array
  },
  methods: {
    getDate(ts) {
      return getDate(ts)
    },
    imgLoad() {
      this.$bus.$emit('imgLoad')
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 10px;
  border-bottom: 3px solid #ccc;
}
.comment {
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.comment-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}
.comment-user {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #000;
}
.comment-user img {
  height: 70%;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.comment-content {
  font-size: 14px;
  color: var(--color-text);
}
.comment-other {
  padding: 10px 0;
  font-size: 12px;
  color: var(--color-text);
}
.comment-image {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.comment-image img {
  width: 20%;
  margin-right: 5px;
}
</style>