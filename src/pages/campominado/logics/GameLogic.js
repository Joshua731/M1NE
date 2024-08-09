import {ROUTE_SERVER} from "../../../utils/configurations";

export const initializeBoard = (rows, cols, mines) => {
    const board = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ isMine: false, isOpen: false, isFlagged: false, neighborMines: 0 }));
   
    // Lógica para distribuir minas no tabuleiro
    let placedMines = 0;
    while (placedMines < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].isMine) {
            board[row][col] = {
              ...board[row][col],
              isMine: true,
            };
            placedMines++;
        }
    }

      // Calcular o número de minas vizinhas para cada célula
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isMine) {
                let minesCount = 0;
                // Verificar todas as células vizinhas
                for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols &&
                    board[newRow][newCol].isMine
                    ) {
                    minesCount++;
                    }
                }
                }
                board[row][col] = {
                ...board[row][col],
                neighborMines: minesCount,
                };
            }
        }
    }


    return board;
};

export const revealAllMines = (board) => {
    const newBoard = board.map(row => 
      row.map(cell => {
        if (cell.isMine) {
          return { ...cell, isOpen: true };
        }
        return cell;
      })
    );
    return newBoard;
};

export const checkWinCondition = (board) => {
    for (let row of board) {
      for (let cell of row) {
        if (!cell.isMine && !cell.isOpen) {
          return false;
        }
      }
    }
    return true;
};

export const saveWinData = async (name, time, difficulty) => {
    const winData = {
      name,
      time,
      difficulty,
      date: new Date().toISOString(),
    };
    try {
      const response = await fetch(`${ROUTE_SERVER}/saveWin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winData),
      });
      if (response.ok) {
        console.log('Win saved successfully');
      } else {
        console.error('Failed to save win');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};