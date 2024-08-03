import Main from "../../../layouts/main/Main"; 
import {initializeBoard} from "../logics/GameLogic";
import {campo_minado_routes} from "../../../utils/basic_routes";
import React, {useEffect, useState} from "react";
import Board from "../components/board/Board";
import "./CampoMinado.css";
import Timer from "../components/timer/Timer";
import {ROUTE_SERVER} from "../../../utils/configurations";

export default function CampoMinado(){
    const [difficulty, setDifficulty] = useState('easy');
    const [board, setBoard] = useState([]);
    const [isGameActive, setIsGameActive] = useState(true);
    const [isGameWon, setIsGameWon] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [timer, setTimer] = useState(0);

    const difficulties = {
        easy: { rows: 9, cols: 9, mines: 10 },
        intermediate: { rows: 16, cols: 16, mines: 40 },
        hard: { rows: 16, cols: 30, mines: 99 },
    };

    const { rows, cols, mines } = difficulties[difficulty];

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value)
    }

    useEffect(() => {
        setBoard(initializeBoard(rows, cols, mines));
        setIsGameActive(true);
        setIsGameWon(false);
        setResetTimer(prev => !prev);
    }, [difficulty, rows, cols, mines]);

    const checkWinCondition = (board) => {
        for (let row of board) {
          for (let cell of row) {
            if (!cell.isMine && !cell.isOpen) {
              return false;
            }
          }
        }
        return true;
    };

    const saveWinData = async (name, time, difficulty) => {
        const winData = { name, time, difficulty };
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
    
    const handleBoardUpdate = (newBoard) => {
        setBoard(newBoard);
        if (checkWinCondition(newBoard)) {
            setIsGameWon(true);
            setIsGameActive(false);
            const name = prompt("Você venceu! Digite seu nome:");
            if (name) {
                saveWinData(name, timer, difficulty);
            }
            alert("Você venceu!");
        }
    };

    const handleTimerUpdate = (time) => {
        setTimer(time);
    };
    const handleGameOver = () => {
        setIsGameActive(false);
    }
    return (
        <Main routes={campo_minado_routes}>
            <div className="campo-minado-container">
                <h1>Campo Minado</h1>
                <Board board={board} setBoard={handleBoardUpdate} gameOver={handleGameOver} isGameActive={isGameActive} />
                <Timer isActive={isGameActive} reset={resetTimer} onUpdate={handleTimerUpdate}/>
                <label>
                    Selecione a Dificuldade:
                    <select value={difficulty} onChange={handleDifficultyChange}>
                    <option value="easy">Fácil</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="hard">Difícil</option>
                    </select>
                </label>
            </div>
        </Main>
    )
}