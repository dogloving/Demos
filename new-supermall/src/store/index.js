import Vue from 'vue'
import Vuex from 'vuex'

const STORAGE_NAME = 'shopcart';
function setData(data) {
  window.localStorage.setItem(STORAGE_NAME,JSON.stringify(data));
}
function getData() {
  return JSON.parse(window.localStorage.getItem(STORAGE_NAME)||'{}');
}

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建Store对象
const store = new Vuex.Store({
  state: {
    // iid，image,title,desc,count,price
    cart: getData(),
  },
  mutations: {
    addToCart(state, payload) {
      if (payload.iid in state.cart) state.cart[payload.iid].count++
      else {
        payload.count = 1
        // state.cart[payload.iid] = payload
        Vue.set(state.cart,payload.iid,payload)
      }
      setData(state.cart);
    },
    deleteFromCart(state,payload) {
      if (payload.iid in state.cart) {
        state.cart[payload.iid].count--
        if (state.cart[payload.iid].count==0) {
          // delete state.cart[payload.iid]
          Vue.delete(state.cart,payload.iid)
        }
      }
      setData(state.cart);
    },
    restore(state,payload) {
      state.cart = payload['shopcart']
    }
  },
  getters: {
    getCartItems(state) {
      return state.cart
    }
  }
})

// 3. 导出
export default store
