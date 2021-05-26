<template>
  <div>
    <input type="text" v-model="text" placeholder="What needs to be done?"
      @keydown.enter="addTask" autofocus>
  </div>
</template>

<script>
export default {
 name: 'InputArea',
 props: {
   todoText: {
     type: String,
     required: true,
   }
 },
 data() {
   return {
     text: this.todoText,
   }
 },
 methods: {
   addTask() {
     this.$emit('add-task',this.text.trim());
     this.text = '';
   }
 },
}
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  height: 48px;
  font-size: 1em;
  padding: 4px 10px;
}
</style>