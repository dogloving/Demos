<template>
    <div class="list-item" @blur="finishEdit">
        <span class="left pointer" :class="{deleted: finished===true}" v-if="!editable"  @click="toggleState">{{text}}</span>
        <input class="left" type="text" v-else v-model="text" @keyup.enter="finishEdit" @blur="finishEdit">
        <span class="right">
            <div class="btn glyphicon glyphicon-edit" aria-hidden="true" @click="editTodo"></div>
            <div class="btn glyphicon glyphicon-trash" aria-hidden="true"  @click="deleteTodo"></div>
        </span>
    </div>
</template>

<script>
  export default {
    name: "ListItem",
    props: {
      text: {
        type: String,
        default: ''
      },
      finished: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      }
    },
    data () {
      return {
        editable: false
      }
    },
    methods: {
      toggleState () {
        this.$store.commit('toggleState', {idx: this.index})
      },
      editTodo () {
        this.editable = !this.editable
      },
      deleteTodo () {
        this.$store.commit('deleteTodo', {idx: this.index})
      },
      finishEdit () {
        this.$store.commit('editTodo', {idx: this.index, text: this.text})
        this.editable = false
      }
    }
  }
</script>

<style scoped>
    .list-item {
        display: flex;
        height: 60px;
        line-height: 60px;
        border: gray solid 1px;
    }
    .left {
        flex: 8;
        text-align: left;
        padding-left: 4px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    input {
        outline-style: none ;
        border: 1px solid lightblue;
        border-radius: 3px;
    }
    .pointer {
        cursor: pointer;
    }
    .deleted {
        text-decoration: line-through;
        color: gray;
    }
    .right {
        line-height: 60px;
        flex: 2;
        text-align: right;
        display: flex;
        align-items: center;
    }
    .right .btn:hover {
        color: blue;
    }
</style>