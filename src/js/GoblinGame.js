// const NUM_OF_CELLS = 16;

// export default class GoblinGame {
//   constructor(element) {
//     this.element = element;
//     this.cells = [];
//     this.misses = 0;
//     this.isHit = false;
//     this.goblinInterval = null;
//   }

//   addCells(count = NUM_OF_CELLS) {
//     this.cells = Array.from({ length: count }, () => {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       this.element.append(cell);
//       return cell;
//     });
//   }

//   clearActive() {
//     this.cells.forEach((cell) => cell.classList.remove("cell-active"));
//   }

//   addGoblin() {
//     this.clearActive();

//     let nextCell = Math.floor(Math.random() * this.cells.length);

//     if (this.cells.length > 1) {
//       while (nextCell === this.currentCell) {
//         nextCell = Math.floor(Math.random() * this.cells.length);
//       }
//     }
//     this.currentCell = nextCell;
//     this.cells[nextCell].classList.add("cell-active");
//   }

//   startGame() {
//     this.addCells();
//     this.goblinInterval = setInterval(() => this.addGoblin(), 1500);
//   }

//   stopGame() {
//     if (this.goblinInterval) {
//       clearInterval(this.goblinInterval);
//       this.goblinInterval = null;
//     }
//   }

//   this.element.addEventListener("click", (e) => {
//   if (!e.target.classList.contains("cell")) return;

//   if (e.target.classList.contains("cell-active")) {
//     this.isHit = true;
//     this.score += 1;
//     console.log("Score:", this.score);

//     e.target.classList.remove("cell-active");
//   }
// });
// }

// addGoblin() {
//   this.clearActive();
//   this.isHit = false;

//   let nextCell = Math.floor(Math.random() * this.cells.length);

//   while (nextCell === this.currentCell) {
//     nextCell = Math.floor(Math.random() * this.cells.length);
//   }

//   this.currentCell = nextCell;
//   const cell = this.cells[nextCell];

//   cell.classList.add("cell-active");

//   setTimeout(() => {
//     if (!this.isHit) {
//       this.misses += 1;
//       console.log("Misses:", this.misses);

//       if (this.misses >= 5) {
//         alert("Game Over");
//         this.stopGame();
//         return;
//       }
//     }

//     cell.classList.remove("cell-active");
//   }, 1000);
// }
import Score from './Score';
import Miss from './Miss';

const NUM_OF_CELLS = 16;
const GOBLIN_VISIBLE_TIME = 1000; 
const GOBLIN_INTERVAL = 1500; 

export default class GoblinGame {
  constructor(element) {
    this.element = element;
    this.cells = [];
    this.currentCell = null;
    this.goblinInterval = null;
    this.activeTimeout = null;
    this.isGameRunning = false;
    
    this.score = new Score();
    this.miss = new Miss();
    
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  addCells(count = NUM_OF_CELLS) {
    for (let i = 0; i < count; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', this.handleCellClick);
      this.element.appendChild(cell);
      this.cells.push(cell);
    }
  }

  removeCells() {
    this.cells.forEach(cell => {
      cell.removeEventListener('click', this.handleCellClick);
      cell.remove();
    });
    this.cells = [];
  }

  clearActive() {
    this.cells.forEach((cell) => cell.classList.remove('cell-active'));
  }

  removeGoblin() {
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }
    
    if (this.currentCell !== null && this.cells[this.currentCell]) {
      this.cells[this.currentCell].classList.remove('cell-active');
    }
    this.currentCell = null;
  }

  addGoblin() {
    if (!this.isGameRunning) return;
    
    this.removeGoblin();
    
    let nextCell = Math.floor(Math.random() * this.cells.length);
    
    if (this.cells.length > 1) {
      while (nextCell === this.currentCell) {
        nextCell = Math.floor(Math.random() * this.cells.length);
      }
    }
    
    this.currentCell = nextCell;
    const cell = this.cells[nextCell];
    cell.classList.add('cell-active');
    

    this.activeTimeout = setTimeout(() => {
      if (this.isGameRunning && this.currentCell === nextCell) {

        const misses = this.miss.addMiss();
        
        if (this.miss.isGameOver()) {
          this.gameOver();
        }
        
        cell.classList.remove('cell-active');
        this.currentCell = null;
      }
      this.activeTimeout = null;
    }, GOBLIN_VISIBLE_TIME);
  }

  handleCellClick(e) {
    if (!this.isGameRunning) return;
    
    const cell = e.target;
    const isActive = cell.classList.contains('cell-active');
    
    if (isActive && this.currentCell !== null) {

      this.score.addPoint();
      this.removeGoblin();
    }
  }

  startGame() {
    if (this.isGameRunning) return;
    

    this.score.reset();
    this.miss.reset();
    this.addCells();
    
    this.isGameRunning = true;
    this.currentCell = null;
    
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
    
    setTimeout(() => {
      alert(`Game Over!\nScore: ${this.score.getScore()}\nMisses: ${this.miss.getMisses()}`);
      this.resetGame();
    }, 50);
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