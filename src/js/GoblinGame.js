import Score from './Score';
import Miss from './Miss';
import goblinImg from '../img/goblin.png';

const NUM_OF_CELLS = 16;
const GOBLIN_VISIBLE_TIME = 1000;
const GOBLIN_INTERVAL = 1500;

export default class GoblinGame {
  constructor(element) {
    this.element = element;
    this.cells = [];
    this.currentCell = null;
    this.previousCell = null;
    this.goblinInterval = null;
    this.activeTimeout = null;
    this.isGameRunning = false;

    this.score = new Score();
    this.miss = new Miss();

    this.resultBlock = document.querySelector('.game-result');

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  addCells(count = NUM_OF_CELLS) {
    for (let i = 0; i < count; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      cell.addEventListener('click', this.handleCellClick);

      this.element.append(cell); 
      this.cells.push(cell);
    }
  }

  removeCells() {
    this.cells.forEach((cell) => {
      cell.removeEventListener('click', this.handleCellClick);
      cell.remove();
    });

    this.cells = [];
  }

  removeGoblin() {
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }

    if (this.currentCell !== null && this.cells[this.currentCell]) {
      const cell = this.cells[this.currentCell];
      const goblin = cell.querySelector('img');

      if (goblin) {
        goblin.remove();
      }
    }

    this.currentCell = null;
  }

  addGoblin() {
    if (!this.isGameRunning) return;

    this.removeGoblin();

    let nextCell;

    do {
      nextCell = Math.floor(Math.random() * this.cells.length);
    } while (
      this.cells.length > 1 &&
      nextCell === this.previousCell
    );

    this.currentCell = nextCell;
    this.previousCell = nextCell;

    const cell = this.cells[nextCell];

    const goblin = document.createElement('img');
    goblin.src = goblinImg;
    goblin.classList.add('goblin');

    cell.append(goblin);

    this.activeTimeout = setTimeout(() => {
      if (this.isGameRunning && this.currentCell === nextCell) {
        this.miss.addMiss();

        if (this.miss.isGameOver()) {
          this.gameOver();
        }

        this.removeGoblin();
      }

      this.activeTimeout = null;
    }, GOBLIN_VISIBLE_TIME);
  }

  handleCellClick(e) {
    if (!this.isGameRunning) return;

    const cell = e.currentTarget;
    const goblin = cell.querySelector('.goblin');

    if (goblin && this.currentCell !== null) {
      this.score.addPoint();
      this.removeGoblin();
    }
  }

  startGame() {
    if (this.isGameRunning) return;

    this.score.reset();
    this.miss.reset();

    if (this.resultBlock) {
      this.resultBlock.textContent = '';
    }

    this.addCells();

    this.isGameRunning = true;
    this.currentCell = null;
    this.previousCell = null;

    this.goblinInterval = setInterval(() => {
      this.addGoblin();
    }, GOBLIN_INTERVAL);
  }

  gameOver() {
    this.isGameRunning = false;

    if (this.goblinInterval) {
      clearInterval(this.goblinInterval);
      this.goblinInterval = null;
    }

    this.removeGoblin();

    if (this.resultBlock) {
      this.resultBlock.textContent = `Конец игры!\nСчет: ${this.score.getScore()}\nПромахи: ${this.miss.getMisses()}`;
    }

    setTimeout(() => {
      this.resetGame();
    }, 4000);
  }

  resetGame() {
    this.removeGoblin();
    this.removeCells();
    this.startGame();
  }

  stopGame() {
    this.isGameRunning = false;

    if (this.goblinInterval) {
      clearInterval(this.goblinInterval);
      this.goblinInterval = null;
    }

    this.removeGoblin();
    this.removeCells();
  }
}