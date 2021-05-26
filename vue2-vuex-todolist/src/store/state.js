const STORAGE_NAME = 'todo-list-hjp';
export default {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_NAME)||'[]'),
}