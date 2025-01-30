import { useState, useContext, createContext } from "react";

//создаем "пустой" контекст, в который потом добавим данные 
export const GameContext = createContext();
// 
export default function GameProvider({children}) {
// useState принимает в качестве параметра функцию пустого поля (матрицу)
    const [playerField, setPlayerField] = useState(createFieldWithShips());
    const [enemyField, setEnemyField] = useState(createFieldWithShips());
    // 
    const [currentPlayer, setCurrentPlayer] = useState("player");

    const value = {
        playerField,
        setPlayerField,
        enemyField,
        setEnemyField,
        currentPlayer,
        setCurrentPlayer
    }

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// пустое поле 6x6 за пределами компонента, чтобы оно создавалось 1 раз 

const createFieldWithShips = () => {
    const field = Array(6)
    .fill(null)
    .map(() => Array(6).fill(null));

    // устанавливаем кораблики
    field[1][1] = "ship";
    field[2][3] = "ship";
  
    return field;
}