<template>
  <div class="toast">
    {{msg}}
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 200px;
  min-height: 10px;
  background-color: #666;
  opacity: .9;
  color: red;
  text-align: center;
  animation: inout 3s ease-in-out 0s 1 alternate forwards;
}
@keyframes inout {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
</style>