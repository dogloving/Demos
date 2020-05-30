<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :value="isSelectAll" @click.native="selectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计: {{totalPrice}}</div>
    <div class="calculate">去计算: {{checkLength}}</div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton"
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      totalPrice () {
        return '￥'+this.list.filter(item=> {
          return item.checked
        }).reduce((preVal, item)=> {
          return item.price*item.count+preVal
        }, 0)
      },
      checkLength () {
        return this.list.filter(item=> {
          return item.checked
        }).length
      },
      isSelectAll () {
        return this.list.filter(item=> {
          return item.checked
        }).length === this.list.length && this.list.length !== 0
      }
    },
    methods: {
      selectAll () {
        if (this.isSelectAll) {
          // 全选中 -> 全不选中
          for (let item of this.list) item.checked = false
        } else {
          //  全部选中 -> 全选中
          for (let item of this.list) item.checked = true
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    line-height: 40px;
    display: flex;
  }
  .check-all {
    flex: 2;
    display: flex;
    align-items: center;
  }
  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
  }
  .total-price {
    flex: 3;
  }
  .calculate {
    width: 100px;
    text-align: right;
    padding-right: 10px;
    background-color: red;
    color: #fff;
  }
</style>
