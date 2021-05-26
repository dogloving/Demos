<template>
  <div class="main">
    <h1 class="title">Todo List</h1>
    <input-area :todo-text="todoText" @add-task="addOneTask" class="input-area"></input-area>
    <todo-board class="todo-board"></todo-board>
    <router-view :key="$route.fullPath"></router-view>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import InputArea from './components/InputArea'
import TodoBoard from './components/TodoBoard'
import TodoFooter from './components/TodoFooter'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    InputArea, TodoBoard, TodoFooter
  },
  data() {
    return {
      todoText: '',
    }
  },
  methods: {
    ...mapMutations(['addTask']),
    addOneTask(text) {
      if (text==='') return;
      this.todoText = text;
      this.addTask({tid:Math.random()+Date.now(),
        content:this.todoText, done:false});
      this.todoText = '';
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border-radius: 1px;
}
.main {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 50px auto;
}
h1 {
  text-align: center;
  color: #c3e3d4;
}
.input-area {
  margin-top: 30px;
}
.todo-board {
  margin-top: 20px;
  box-shadow: 0 0 4px #ccc;
}
</style>