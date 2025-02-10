import { useState, useContext, createContext } from "react";

//создаем "пустой" контекст, в который потом добавим данные
export const GameContext = createContext();
//
export default function GameProvider({ children }) {
  // Создаем состояния для хранения полей игрока и противника, которые генерируются случайным образом
  const [playerField, setPlayerField] = useState(generateRandomField());
  const [enemyField, setEnemyField] = useState(generateRandomField());
  const [currentPlayer, setCurrentPlayer] = useState("player");

  // функция для сброса  и генерации новых полуй при нажатии на кнопку
  const resetFields = () => {
    setPlayerField(generateRandomField());
    setEnemyField(generateRandomField());
  };
  //

  const value = {
    playerField,
    setPlayerField,
    enemyField,
    setEnemyField,
    currentPlayer,
    setCurrentPlayer,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Первая версия добавления кораблей вручную. Пустое поле 6x6 за пределами компонента, чтобы оно создавалось 1 раз

// const createFieldWithShips = () => {
//     const field = Array(6)
//     .fill(null)
//     .map(() => Array(6).fill(null));

//     устанавливаем кораблики
//     field[1][1] = "ship";
//     field[2][3] = "ship";

//     return field;
// }

// Функция генерации случайного поля с кораблями
function generateRandomField() {
  // размер игрового поля 6х6
  const size = 6;
  const field = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
  // Определяем количество кораблей: 1 четырехпалубный, 2 трехпалубных, 3 двухпалубных, 4 однопалубных
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  //   размещаем каждый корабль на поле
  for (let shipSize of ships) {
    placeShip(field, shipSize);
  }
  return field;
}

// Функция размещения одного корабля на поле
function placeShip(field, shipSize) {
  const size = field.length;
  let placed = false;

  while (!placed) {
    // случайное определение ориентации
    const isVertical = Math.random() < 0.5;
    //   случайная строка
    const row = Math.floor(Math.random() * size);
    // случайный столбец
    const col = Math.floor(Math.random() * size);
// проверяем, можно ли разместить корабль 
    if (canPlaceShip(field, row, col, shipSize, isVertical)) {
      for (let i = 0; i < shipSize; i++) {
        if (isVertical) {
          field[row + i][col] = "ship";
        } else {
          field[row][col + i] = "ship";
        }
      }
    //   корабль успешно размещен 
      placed = true;
    }
  }
}

// Функция проверки возможности размещения корабля
function canPlaceShip(field, row, col, shipSize, isVertical) {
  const size = field.length;

  for (let i = 0; i < shipSize; i++) {
    const newRow = isVertical ? row + i : row;
    const newCol = isVertical ? col : col + i;

    // проверяем, не выходит ли корабль за границы и не накладывается ли на другой корабль  
    if (
      newRow >= size ||
      newCol >= size ||
      field[newRow][newCol] !== null ||
      !isSurroundingAreaClear(field, newRow, newCol)
    ) {
      return false;
    }
  }
  return true;
}

// Функция проверки, свободна ли зона вокруг клетки корабля
function isSurroundingAreaClear(field, row, col) {
  const size = field.length;
// возможные смещения для проверки соседних клеток 
  const directions = [-1, 0, 1];

  return !directions.some((i) =>
    directions.some((j) => {
      const newRow = row + i;
      const newCol = col + j;
    //   проверка, находится ли новая клетка в пределах поля и не занята ли кораблем 
      return (
        newRow >= 0 &&
        newRow < size &&
        newCol >= 0 &&
        newCol < size &&
        field[newRow][newCol] === "ship"
      );
    })
  );
}
