<template>
  <div>
    <todo-info :all="cntAll" :active="cntActive" :done="cntDone"></todo-info>
  </div>
</template>

<script>
import TodoInfo from './TodoInfo'
import {mapGetters} from 'vuex'
export default {
 name: 'TodoBoard',
 components: {
   TodoInfo
 },
 computed: {
   ...mapGetters(['todosDone','todosAll']),
   cntAll() {
     return this.todosAll.length;
   },
   cntDone() {
     return this.todosDone.length;
   },
   cntActive() {
     return this.cntAll-this.cntDone;
   }
 }
}
</script>

<style>

</style>