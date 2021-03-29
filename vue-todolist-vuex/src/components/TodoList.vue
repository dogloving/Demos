<template>
  <div class="todo-list">
    <div class="list">
      <list-item v-for="(td,idx) in todos" :key="idx" :text="td.text" :index="idx" 
        :finished="td.finished" v-show="td.finished==finished"></list-item>
    </div>
  </div>
</template>

<script>
  import ListItem from "./ListItem";
  export default {
    name: "TodoList",
    components: {ListItem},
    props: {
      finished: Boolean
    },
    computed: {
      todos () {
        return this.$store.getters.getTodo
      }
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .todo-list {
    position: relative;
  }
  .list {
    left: 200px;
  }
</style>