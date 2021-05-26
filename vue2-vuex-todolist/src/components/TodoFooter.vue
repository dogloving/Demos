<template>
  <div class="todo-footer">
    <p>雙擊編輯内容，單擊修改狀態。</p>
    <p><a href="https://github.com/dogloving/Demos/tree/master/vue2-vuex-todolist/">項目github地址</a></p>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
}
</script>

<style scoped>
.todo-footer {
  margin-top: 100px;
  font-size: 12px;
  color: #aaa;
  text-align: center;
}
p {
  margin-top: 10px;
}
</style>