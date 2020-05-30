<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data () {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show (msg, duration=1500) {
        console.log('-----')
        this.message = msg
        this.isShow = true
        setTimeout(()=> {
          this.message = ''
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 30%;
    padding: 8px 10px;
    color: #fff;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
  }
</style>
