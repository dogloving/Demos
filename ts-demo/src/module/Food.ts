// 随机获取[min,max]之间步幅为step的一个整数
function getRandom(min:number,max:number,step:number):number {
  return min+step*Math.floor(Math.random()*(max-min+1)/step)
}

export class Food {
  private foodElement: HTMLElement
  private maxX: number
  private maxY: number
  constructor() {
    // !表示该元素不可能为null
    this.foodElement = document.getElementById('food')!
    this.maxX = this.foodElement.offsetParent!.clientWidth-this.foodElement.offsetWidth
    this.maxY = this.foodElement.offsetParent!.clientHeight-this.foodElement.offsetHeight
  }
  get X() {
    return this.foodElement.offsetLeft
  }
  get Y() {
    return this.foodElement.offsetTop
  }
  change() {
    this.foodElement.style.left = getRandom(0,this.maxX,10)+'px'
    this.foodElement.style.top = getRandom(0,this.maxY,10)+'px'
  }
}