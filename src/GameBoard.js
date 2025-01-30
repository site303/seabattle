import react, { useContext } from "react";
import { GameContext } from "./GameContext";
import styles from "./SeaBattle.module.css";
export default function GameBoard({ isPlayer }) {
  const {
    playerField,
    enemyField,
    currentPlayer,
    setCurrentPlayer,
    setPlayerField,
    setEnemyField,
  } = useContext(GameContext);

  const field = isPlayer ? playerField : enemyField;
  const setField = isPlayer ? setPlayerField : setEnemyField;

  if (!field?.length) return null;

  //кто ходит
  const handleCellClick = (row, col) => {
    if (currentPlayer !== (isPlayer ? "player" : "enemy")) return;

    // если по квадрату уже кликали
    if (field[row][col] === "hit" || field[row][col] === "miss") return;

    const newField = field.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col
          ? cell === "ship"
            ? "hit"
            : "miss"
          : cell
      )
    );
    // Обновляем состояние
    setField(newField);
    setCurrentPlayer(isPlayer ? "enemy" : "player");

    alert(newField[row][col] === "hit" ? "Попадание!" : "Мимо!");
  };
  return (
    <div className={styles.board}>
      {field.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            //эта запись помагает сделать так, чтобы при клике на корабль отмечались попадание или промах
            //   className={`cell ${cell}`}
            className={`${styles.cell} ${styles[cell] || ""}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {/* Отображаем результат */}
            {cell === "hit" && <span>x</span>}
            {cell === "miss" && <span>.</span>}
          </div>
        ))
      )}
    </div>
  );
}
