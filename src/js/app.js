import "../css/style.css";
import "../css/goblin-game/goblin-game.css";
import GoblinGame from "./GoblinGame";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const goblinGame = new GoblinGame(document.querySelector(".goblin-game"));
  goblinGame.startGame();

  window.addEventListener("beforeunload", () => {
    goblinGame.stopGame();
  });
});
