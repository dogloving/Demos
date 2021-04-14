/**
 * 这里有两种逻辑：一种是把snake看作一个静态对象，然后在另一个对象gameControl中
 * 控制snake、food、scorePanel之间的关系；还有一种是觉得snake的运动以及运动方向
 * 属于snake的动作，因此把这些方法都写在Snake类中。个人觉得两种都可，这里选择第一种。
 */
import {Food} from './Food'
import { ScorePanel } from './ScorePanel';
import {Snake} from './Snake'

export class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  direction: string = 'ArrowRight'
  pause: boolean = true
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.init()
  }
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run.call(this)
  }
  keydownHandler(event:KeyboardEvent) {
    if ((event.key=='ArrowRight'||event.key=='Right')&&
      ((this.direction!='ArrowLeft'&&this.direction!='Left')||this.snake.length==1)) {
      this.direction = event.key
    } else if ((event.key=='ArrowLeft'||event.key=='Left')&&
      ((this.direction!='ArrowRight'&&this.direction!='Right')||this.snake.length==1)) {
      this.direction = event.key
    } else if ((event.key=='ArrowDown'||event.key=='Down')&&
      ((this.direction!='ArrowUp'&&this.direction!='Up')||this.snake.length==1)) {
      this.direction = event.key
    } else if ((event.key=='ArrowUp'||event.key=='Up')&&
      ((this.direction!='ArrowDown'&&this.direction!='Down')||this.snake.length==1)) {
      this.direction = event.key
    } else if (event.key=='Spacebar'||event.key==' ') {
      this.pause = !this.pause
    }
    if (['ArrowRight','Right','ArrowLeft','Left','Up','ArrowUp',
      'Down','ArrowDown'].indexOf(event.key)!=-1) this.direction = event.key
  }
  checkSafe():boolean {
    return this.snake.isSafe()
  }
  checkMeet() {
    if (this.direction=='ArrowRight'||this.direction=='Right') {
      return (this.snake.X+10==this.food.X)&&(this.snake.Y==this.food.Y)
    }
    if (this.direction=='ArrowLeft'||this.direction=='Left') {
      return (this.snake.X-10==this.food.X)&&(this.snake.Y==this.food.Y)
    }
    if (this.direction=='ArrowDown'||this.direction=='Down') {
      return (this.snake.Y+10==this.food.Y)&&(this.snake.X==this.food.X)
    }
    if (this.direction=='ArrowUp'||this.direction=='Up') {
      return (this.snake.Y-10==this.food.Y)&&(this.snake.X==this.food.X)
    }
  }
  run() {
    let gap = this.pause?0:10
    if (this.checkMeet()) {
      this.snake.addBody(this.food.X,this.food.Y)
      this.food.change()
      this.scorePanel.addScore()
    }
    switch (this.direction) {
      case "ArrowRight":
      case "Right":
        this.snake.setPos(gap,0)
        break
      case "ArrowLeft":
      case "Left":
        this.snake.setPos(-gap,0)
        break
      case "ArrowDown":
      case "Down":
        this.snake.setPos(0,gap)
        break
      case "ArrowUp":
      case "Up":
        this.snake.setPos(0,-gap)
        break
    }
    if (!this.checkSafe()) {
      alert('失败！！！')
      return
    }
    if (this.checkMeet()) {
      this.snake.addBody(this.food.X,this.food.Y)
      this.food.change()
      this.scorePanel.addScore()
    }
    setTimeout(this.run.bind(this),250-this.scorePanel.getLevel()*20)
  }
}