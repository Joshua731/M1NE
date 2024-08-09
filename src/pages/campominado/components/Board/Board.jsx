import React from "react";
import "./Board.css";
import { revealAllMines } from "../../logics/GameLogic.js";
import Cell from "../Cell/Cell.jsx";

export default function Board({board, setBoard, gameOver, isGameActive }) {

  const handleCellClick = (row,col) => {
    if(isGameActive){
      // Lógica para tratar cliques na célula
      if(board[row][col].isOpen || board[row][col].isFlagged) return;
      
      const newBoard = [...board];
      newBoard[row][col].isOpen = true;

      if(newBoard[row][col].isMine){
        // Fim do jogo
        const newBoard = revealAllMines(board);
        setBoard(newBoard);
        gameOver();
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

  const renderColumnLabels = () => {
    if (!board || board.length === 0) return null;

    return (
      <div className="board-row">
        <div className="label-cell" />
        {board[0].map((_, colIndex) => (
          <div key={colIndex} className="label-cell">
            {colIndex + 1} {/* 1, 2, 3, ... */}
          </div>
        ))}
      </div>
    );
  };

  return(
    <div className="board">
      {renderColumnLabels()}
      {board.map((row,rowIndex) => (
        <div key={rowIndex} className="board-row">
          <div className="label-cell">{String.fromCharCode(65 + rowIndex)}</div> {/* A, B, C, ... */}
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