import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {text: '9点去洗枣', finished: true},
      {text: '10点去唱歌', finished: false},
      {text: '11点去吃饭', finished: false}
    ]
  },
  mutations: {
    addNewTodo (state, payload) {
      state.todos.push({text: payload.text.trim(), finished: false})
      this.newTodo = ''
    },
    toggleState (state, payload) {
      state.todos[payload.idx].finished = !state.todos[payload.idx].finished
    },
    deleteTodo (state, payload) {
      console.log('hello')
      state.todos.splice(payload.idx, 1)
    },
    editTodo (state, payload) {
      state.todos[payload.idx].text = payload.text
      state.todos[payload.idx].finished = false
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getTodo (state) {
      return state.todos
    }
  }
})
