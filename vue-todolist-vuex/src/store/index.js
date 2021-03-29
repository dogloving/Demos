import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    addNewTodo (state, payload) {
      state.todos.push({text: payload.text.trim(), finished: false})
      this.newTodo = ''
      localStorage.setItem('todo',JSON.stringify(state.todos))
    },
    toggleState (state, payload) {
      state.todos[payload.idx].finished = !state.todos[payload.idx].finished
      localStorage.setItem('todo',JSON.stringify(state.todos))
    },
    deleteTodo (state, payload) {
      console.log('hello')
      state.todos.splice(payload.idx, 1)
      localStorage.setItem('todo',JSON.stringify(state.todos))
    },
    editTodo (state, payload) {
      state.todos[payload.idx].text = payload.text
      state.todos[payload.idx].finished = false
      localStorage.setItem('todo',JSON.stringify(state.todos))
    },
    restore(state, payload) {
      state.todos = payload
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
