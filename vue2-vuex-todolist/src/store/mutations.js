const STORAGE_NAME = 'todo-list-hjp';
function setData(data) {
  window.localStorage.setItem(STORAGE_NAME,JSON.stringify(data));
}

export default {
  addTask(state,todo) {
    state.todos.push(todo);
    setData(state.todos);
  },
  deleteTask(state,payload) {
    state.todos = state.todos.filter(todo=>todo.tid!==payload.tid);
    setData(state.todos);
  },
  editTask(state,payload) {
    for (const todo of state.todos) {
      if (todo.tid===payload.tid) {
        todo.content = payload.content;
        break;
      }
    }
    setData(state.todos);
  },
  toggleTask(state,payload) {
    for (const todo of state.todos) {
      if (todo.tid===payload.tid) {
        todo.done = !todo.done;
        break;
      }
    }
    setData(state.todos);
  }
}