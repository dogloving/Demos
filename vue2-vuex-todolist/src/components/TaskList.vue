<template>
  <div class="task-list">
    <todo-item v-for="todo,idx of showList" :todo="todo" :key="idx"></todo-item>
    <div v-if="showList.length!==0" class="end"></div>
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import {mapGetters} from 'vuex';
export default {
  name: 'TaskList',
  data() {
    return {
      showList: [],
    }
  },
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters(['todosAll','todosActive','todosDone']),
  },
  methods: {
    updateData() {
      if (this.$route.meta.tab==='all') this.showList = this.todosAll;
      else if (this.$route.meta.tab==='active') this.showList = this.todosActive;
      else if (this.$route.meta.tab==='done') this.showList = this.todosDone;
    },
  },
  watch: {
    $route() {
      this.updateData();
    },
    todosAll() {
      this.updateData();
    },
  },
  created() {
    this.updateData();
  },
}
</script>

<style>
.task-list {
  box-shadow: 0 0 3px #ccc;
  position: relative;
}
.end {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 98%;
  height: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}
.end::after {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 98%;
  height: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}
</style>