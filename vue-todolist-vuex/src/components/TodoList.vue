<template>
  <div class="todo-list">
    <h1>{{listName}}</h1>
    <div class="new-todo">
      <input type="text" v-model="newTodo" placeholder="输入待办事项" @keyup.enter="addNewTodo">
    </div>
    <div class="list">
      <list-item v-for="(td,idx) in todos" :key="idx" :text="td.text" :index="idx" :finished="td.finished"></list-item>
    </div>
  </div>
</template>

<script>
  import ListItem from "./ListItem";
  export default {
    name: "TodoList",
    components: {ListItem},
    props: {
      listName: {
        type: String,
        default: ''
      }
    },
    computed: {
      todos () {
        return this.$store.getters.getTodo
      }
    },
    data () {
      return {
        newTodo: ''
      }
    },
    methods: {
      addNewTodo () {
        if (this.newTodo.trim() !== '') this.$store.commit('addNewTodo', {text: this.newTodo})
        this.newTodo = ''
      }
    }
  }
</script>

<style scoped>
  .todo-list {
    position: relative;
    width: 60%;
    left: 20%;
  }
  .new-todo {
    margin-bottom: 30px;
  }
  .new-todo input {
    width: 100%;
    height: 60px;
    font-size: 1.2em;
  }
  .list {
    left: 200px;
  }
</style>