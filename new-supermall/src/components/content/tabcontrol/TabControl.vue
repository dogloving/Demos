<template>
  <div class="tab-control">
    <div v-for="item,idx of titles" :key="idx" class="tab-control-item"
      :class="{active: idx==currentIndex}" @click="itemClick(idx)">
      <span>{{item}}</span>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    titles: Array,
    currentIndex: 0,
  },
  data() {
    return {

    }
  },
  methods: {
    itemClick(idx) {
      this.$emit('itemClick', idx)
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  transition: all 1s;
}
.tab-control-item {
  flex: 1;
}
.active span {
  color: var(--color-tint);
  border-bottom: 3px solid var(--color-tint);
  padding: 0 5px 8px;
}
</style>