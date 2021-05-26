import { mapMutations } from 'vuex';
<template>
  <div class="todo-item">
    <div class="checkbox">
      <input type="checkbox" @click="toggleTask({tid:todo.tid})" :checked="todo.done">
    </div>
    <div class="content">
      <input type="text" autofocus v-if="isEdit" v-model="todo.content" @blur="editOk" @keydown.enter="editOk">
      <p v-else @click="toggleTask({tid:todo.tid})" @dblclick="isEdit=!isEdit" :class="{done:todo.done}">{{todo.content}}</p>
    </div>
    <div class="remove">
      <div class="delete" @click="deleteTask({tid:todo.tid})"></div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      isEdit: false,
    }
  },
  methods: {
    ...mapMutations(['editTask','toggleTask','deleteTask']),
    editOk() {
      this.isEdit = false;
      this.editTask(this.todo);
      if (this.todo.done) this.toggleTask(this.todo);
    }
  }
}
</script>

<style scoped>
.todo-item {
  min-height: 48px;
  width: 100%;
  display: flex;
  border: 1px solid #f0f0f0;
}
.todo-item:hover {
  background-color: #eee;
}
.checkbox {
  width: 10%;
  position: relative;
}
.checkbox input {
  display: block;
  width: 29px;
  height: 29px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.checkbox input:hover {
  cursor: pointer;
}
.content {
  width: 80%;
  padding: 10px;
  word-break: break-all;
}
.content:hover {
  cursor: pointer;
}
.content input {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 1em;
  padding-left: 10px;
}
.done {
  color: #ccc;
  text-decoration: line-through;
}
.remove {
  width: 10%;
  position: relative;
}
.delete {
  border-radius: 50%;
  width: 29px;
  height: 29px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-image: url(../assets/remove.png);
  background-size: 29px 29px;
}
.delete:hover {
  cursor: pointer;
  background-size: 31px 31px;
}
</style>