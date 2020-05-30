<template>
    <div class="todo-list">
        <h1>{{listName}}</h1>
        <div class="new-todo">
            <input type="text" v-model="newTodo" placeholder="输入待办事项" @keyup.enter="addNewTodo">
        </div>
        <div class="list">
            <list-item v-for="(td,idx) in todos" :key="idx" :text="td.text" :index="idx" :finished="td.finished"
                       @toggleState="toggleState" @deleteTodo="deleteTodo" @editTodo="editTodo"></list-item>
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
    data () {
      return {
        newTodo: '',
        todos: [
          {text: '9点去洗枣', finished: true},
          {text: '10点去唱歌', finished: false},
          {text: '11点去吃饭', finished: false},
        ]
      }
    },
    methods: {
      addNewTodo () {
        console.log('fuck')
        if (this.newTodo.trim() !== '') this.todos.push({text: this.newTodo.trim(), finished: false})
        this.newTodo = ''
      },
      toggleState (idx) {
        this.todos[idx].finished = !this.todos[idx].finished
      },
      deleteTodo (idx) {
        this.todos.splice(idx, 1)
      },
      editTodo (option) {
        this.todos[option.idx].text = option.text
        this.todos[option.idx].finished = false
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