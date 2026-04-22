export default class Score {
  constructor() {
    this.score = 0;
    this.scoreElement = document.querySelector('.score');
  }

  addPoint() {
    this.score++;
    this.updateDisplay();
    return this.score;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.score = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`;
    }
  }
}