const NUM_OF_CELLS = 16;

export default class GoblinGame {
  constructor(element) {
    this.element = element;
    this.cells = [];
    this.misses = 0;
    this.isHit = false;
    this.goblinInterval = null;
  }

  addCells(count = NUM_OF_CELLS) {
    this.cells = Array.from({ length: count }, () => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.element.append(cell);
      return cell;
    });
  }

  clearActive() {
    this.cells.forEach((cell) => cell.classList.remove("cell-active"));
  }

  addGoblin() {
    this.clearActive();

    let nextCell = Math.floor(Math.random() * this.cells.length);

    if (this.cells.length > 1) {
      while (nextCell === this.currentCell) {
        nextCell = Math.floor(Math.random() * this.cells.length);
      }
    }
    this.currentCell = nextCell;
    this.cells[nextCell].classList.add("cell-active");
  }

  startGame() {
    this.addCells();
    this.goblinInterval = setInterval(() => this.addGoblin(), 1500);
  }

  stopGame() {
    if (this.goblinInterval) {
      clearInterval(this.goblinInterval);
      this.goblinInterval = null;
    }
  }

  this.element.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cell")) return;

  if (e.target.classList.contains("cell-active")) {
    this.isHit = true;
    this.score += 1;
    console.log("Score:", this.score);

    e.target.classList.remove("cell-active");
  }
});
}

addGoblin() {
  this.clearActive();
  this.isHit = false;

  let nextCell = Math.floor(Math.random() * this.cells.length);

  while (nextCell === this.currentCell) {
    nextCell = Math.floor(Math.random() * this.cells.length);
  }

  this.currentCell = nextCell;
  const cell = this.cells[nextCell];

  cell.classList.add("cell-active");

  setTimeout(() => {
    if (!this.isHit) {
      this.misses += 1;
      console.log("Misses:", this.misses);

      if (this.misses >= 5) {
        alert("Game Over");
        this.stopGame();
        return;
      }
    }

    cell.classList.remove("cell-active");
  }, 1000);
}
