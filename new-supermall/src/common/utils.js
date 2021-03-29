// 防抖函数
export function debounce(func,delay=100) {
  let timer = null
  return (...args)=> {
    clearTimeout(timer)
    timer = setTimeout(()=>func.apply(this,args), delay);
  }
}

// 时间戳转日期
export function getDate(timestamp) {
  let d = new Date(timestamp)
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
}