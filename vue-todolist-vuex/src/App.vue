<template>
  <div id="app">
    <h2>TodoList</h2>
    <div class="new-todo">
      <input type="text" v-model="newTodo" placeholder="输入待办事项" @keyup.enter="addNewTodo">
    </div>
    <h4>待完成</h4>
    <todo-list list-name="Hjp's todolist(Vuex)" :finished="false"></todo-list>
    <h4>已完成</h4>
    <todo-list list-name="Hjp's todolist(Vuex)" :finished="true"></todo-list>
  </div>
</template>

<script>

  import TodoList from "./components/TodoList";
  export default {
    name: 'App',
    components: {
      TodoList
    },
    data() {
      return {
        newTodo: ''
      }
    },
    methods: {
      addNewTodo () {
        if (this.newTodo.trim() !== '') this.$store.commit('addNewTodo', {text: this.newTodo})
        this.newTodo = ''
      }
    },
    created() {
      this.$store.commit('restore',JSON.parse(localStorage.getItem('todo'))||[])
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    width: 90%;
    margin: auto;
  }
  .new-todo {
    margin-bottom: 30px;
  }
  .new-todo input {
    width: 100%;
    height: 60px;
    padding-left: 5px;
  }
</style>
