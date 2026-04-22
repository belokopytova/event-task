export default class Miss {
  constructor() {
    this.misses = 0;
    this.missElement = document.querySelector('.misses');
  }

  addMiss() {
    this.misses++;
    this.updateDisplay();
    return this.misses;
  }

  getMisses() {
    return this.misses;
  }

  reset() {
    this.misses = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.missElement) {
      this.missElement.textContent = `Misses: ${this.misses}`;
    }
  }

  isGameOver() {
    return this.misses >= 5;
  }
}