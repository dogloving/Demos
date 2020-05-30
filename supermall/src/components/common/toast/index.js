// 参考https://blog.csdn.net/chengQunBin/article/details/82318861
import Toast from './Toast'

const obj = {}
obj.install = function (Vue) {
  // document.body.appendChild(Toast.$el)
  // Vue.protoType.$toast = Toast
  // console.log('toast installed')

  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2. new一个实例
  const toast = new toastConstructor()
  // 3. 将组建实例手动挂载到某元素上
  toast.$mount(document.createElement('div'))
  // 4. toast.$el就是对应的div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj
