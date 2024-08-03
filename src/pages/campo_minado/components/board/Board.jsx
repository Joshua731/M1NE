import React from "react";
import Cell from "../cell/Cell";
import "./Board.css";

function Board({board, setBoard, stopGame, isGameActive }) {

  const handleCellClick = (row,col) => {
    if(isGameActive){
      // Lógica para tratar cliques na célula
      if(board[row][col].isOpen || board[row][col].isFlagged) return;
      
      const newBoard = [...board];
      newBoard[row][col].isOpen = true;

      if(newBoard[row][col].isMine){
        // Fim do jogo
        alert("Game over!");
        setBoard(newBoard);
        stopGame();
        return;
      }

      if(newBoard[row][col].neighborMines === 0){
        openAdjacentCells(newBoard, row, col);
      }

      setBoard(newBoard);
    }
  }

  const handleCellRightClick = (event, row, col) => {
    if(isGameActive){
      event.preventDefault();
      if (board[row][col].isOpen) return;

      const newBoard = [...board];
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
    }
  };

  const openAdjacentCells = (board, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        !board[newRow][newCol].isOpen &&
        !board[newRow][newCol].isMine
      ) {
        board[newRow][newCol].isOpen = true;
        if (board[newRow][newCol].neighborMines === 0) {
          openAdjacentCells(board, newRow, newCol);
        }
      }
    }
  };

  return(
    <div className="board">
        {board.map((row,rowIndex) => (
          <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <Cell 
                key={colIndex} 
                value={cell} 
                onClick={() => handleCellClick(rowIndex,colIndex)}
                onContextMenu={(e) => handleCellRightClick(e,rowIndex,colIndex)}/>
              ))}
          </div>
        ))}
    </div>
  )
}

export default Board;
