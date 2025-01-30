import { useState, useContext } from "react";
import GameBoard from "./GameBoard";
import GameProvider from "./GameContext";
import styles from "./SeaBattle.module.css";
import background from "./images/background.jpg";

function App() {
  return (
    <GameProvider>
      <div className={styles.wrapper}>
        <div className={styles.boards}>
          <div>
            <h2 className={styles.title}>Игрок 1</h2>
            <GameBoard isPlayer={true} />
          </div>
          <div>
            <h2 className={styles.title}>Игрок 2</h2>
            <GameBoard isPlayer={false} />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;


