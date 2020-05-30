import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types"

export default {
  addCart(context, payload) {
    // 检查是否已经存在于购物车，如果有对应counter加1，没有则添加进去
    return new Promise((resolve, reject)=> {
      let exsit = false
      payload.count = 1
      for (let item of context.state.cartList) {
        if (item.id === payload.id) {
          exsit = true
          context.commit(ADD_COUNTER, item)
          resolve('当前商品数量+1')
          break
        }
      }
      if (!exsit) context.commit(ADD_TO_CART, payload)
      resolve('添加了新商品')
    })
  }

}
