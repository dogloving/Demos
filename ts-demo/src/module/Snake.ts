// 关于snake只需考虑snake头即可
export class Snake {
  private snake: HTMLElement
  private head: HTMLElement
  private body: HTMLCollection
  constructor() {
    this.snake = document.querySelector('#snake')!
    this.head = document.querySelector('#snake>div')!
    this.body = this.snake.children!
  }
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  get length() {
    return this.body.length
  }
  setPos(x:number,y:number) {
    let tx = this.X+x, ty = this.Y+y
    let lastX = this.X, lastY = this.Y
    for (let i = 1; i < this.body.length; i++) {
      let tempX = (this.body[i] as HTMLElement).offsetLeft;
      let tempY = (this.body[i] as HTMLElement).offsetTop;
      (this.body[i] as HTMLElement).style.left = lastX+'px';
      (this.body[i] as HTMLElement).style.top = lastY+'px';
      [lastX,lastY] = [tempX,tempY]
    }
    this.head.style.left = tx+'px'
    this.head.style.top = ty+'px'
  }
  isSafe():boolean {
    return (this.head.offsetLeft>=0&&this.head.offsetTop>=0&&
      this.head.offsetLeft<=this.head.offsetParent!?.clientWidth&&
      this.head.offsetTop<=this.head.offsetParent!?.clientHeight)
  }
  addBody(x:number,y:number) {
    let newHead = document.createElement('div')
    newHead.style.left = x+'px'
    newHead.style.top = y+'px'
    this.head = newHead
    this.snake.insertAdjacentElement('afterbegin',newHead)
    this.body = this.snake.children!
    for (let i = 0; i < this.body.length; i++) {
      (this.body[i] as HTMLElement).style.backgroundColor = '#000'
    }
    this.head.style.backgroundColor = 'red'
  }
}