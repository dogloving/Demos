import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types"

// mutations唯一目的是修改state中的状态
// mutations中每个方法完成的事尽可能单一
export default {
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
