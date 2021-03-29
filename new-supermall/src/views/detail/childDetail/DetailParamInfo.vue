<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length!=0">
    <div class="table-info">
      <div class="row-info" v-for="item,idx of paramInfo.sizes" :key="idx">
        <div class="left">{{item[0]}}</div>
        <div class="right" v-for="i of item.length-1" :key="i">{{item[i]}}</div>
      </div>
    </div>
    <div class="table-info">
      <div class="row-info" v-for="item,idx of paramInfo.infos" :key="idx">
        <div class="left">{{item.key}}</div>
        <div class="right2">{{item.value}}</div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    paramInfo: Object
  },

}
</script>

<style scoped>
.param-info {
  /* height: 500px; */
  padding: 5px 10px;
  font-size: 14px;
  padding-bottom: 20px;
  border-bottom: 3px solid #ccc;
}
.table-info:first-of-type {
  border-bottom: 1px solid #eee;
}
.row-info {
  padding: 10px 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #eee;
}
.left {
  width: 100px;
  align-self: center;
}
.right {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.right2 {
  flex: 1;
  color: var(--color-tint);
}
</style>