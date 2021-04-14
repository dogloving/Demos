export class ScorePanel {
  score = 0
  level = 0
  scoreElement: HTMLElement
  levelElement: HTMLElement
  constructor(private maxLevel=10, private upScore=5) {
    this.scoreElement = document.getElementById('score')!
    this.levelElement = document.getElementById('level')!
  }
  getLevel() {
    return this.level
  }
  addScore() {
    this.scoreElement.innerText = String(++this.score)
    if (this.score%this.upScore==0) this.addLevel()
  }
  addLevel() {
    if (this.level<this.maxLevel) {
      this.levelElement.innerText = ['小蚯蚓','大蚯蚓','小蛇','大蛇',
    '小阿蛟','大阿蛟','巨蛟','小龙','大龙','巨龙','龙王'][++this.level]
    }
  }
}