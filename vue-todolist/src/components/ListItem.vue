<template>
    <div class="list-item" @blur="finishEdit">
        <span class="left pointer" :class="{deleted: finished===true}" v-if="!editable"  @click="toggleState">{{text}}</span>
        <input class="left" type="text" v-else v-model="text2" @keyup.enter="finishEdit" @blur="finishEdit">
        <span class="right">
            <span class="btn glyphicon glyphicon-edit" aria-hidden="true" @click="editTodo"></span>
            <span class="btn glyphicon glyphicon-trash" aria-hidden="true"  @click="deleteTodo"></span>
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
        text2: this.text,
        editable: false
      }
    },
    methods: {
      toggleState () {
        this.$emit('toggleState', this.index)
      },
      editTodo () {
        this.editable = !this.editable
      },
      deleteTodo () {
        this.$emit('deleteTodo', this.index)
      },
      finishEdit () {
        this.$emit('editTodo', {idx: this.index, text: this.text2})
        this.editable = false
      }
    }
  }
</script>

<style scoped>
    .list-item {
        display: flex;
        height: 60px;
        font-size: 1.2em;
        line-height: 60px;
        border: gray solid 1px;
    }
    .list-item:hover {
        background-color: lightgray;
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
        padding-right: 14px;
    }
    .right .btn:hover {
        color: blue;
    }
</style>