import Main from "../../../layouts/main/Main"; 
import {initializeBoard} from "../logics/GameLogic";
import {campo_minado_routes} from "../../../utils/basic_routes";
import React, {useEffect, useRef, useState} from "react";
import Board from "../components/board/Board";
import "./CampoMinado.css";
import Timer from "../components/timer/Timer";
import {ROUTE_SERVER} from "../../../utils/configurations";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export default function CampoMinado(){
    //const [difficulty, setDifficulty] = useState('easy');
    const {difficulty} = useParams(); 
    const [board, setBoard] = useState([]);
    const [isGameActive, setIsGameActive] = useState(true);
    const [isGameWon, setIsGameWon] = useState(false);
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(null);

    const difficulties = {
        easy: { rows: 9, cols: 9, mines: 10 },
        intermediate: { rows: 16, cols: 16, mines: 40 },
        hard: { rows: 16, cols: 30, mines: 99 },
    };

    const { rows, cols, mines } = difficulties[difficulty];

    useEffect(() => {
        setBoard(initializeBoard(rows, cols, mines));
        setIsGameActive(true);
        setIsGameWon(false);
        setTimer(0);
    }, [difficulty, rows, cols, mines]);

    useEffect(() => {
      if(isGameActive){
        intervalRef.current = setInterval(() => {
          setTimer((prevTime) => prevTime + 1);
        }, 1000);
      }else{
        clearInterval(intervalRef.current);
      }
      return () => clearInterval(intervalRef.current); 
    }, [])

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
    
    const handleBoardUpdate = (newBoard) => {
        setBoard(newBoard);
        if (checkWinCondition(newBoard)) {
            setIsGameWon(true);
            setIsGameActive(false);
            clearInterval(intervalRef.current);
            const name = prompt("Você venceu! Digite seu nome:");
            if (name) {
                saveWinData(name, timer, difficulty);
            }
            alert("Você venceu!");
        }
    };
    const handleGameOver = () => {
        setIsGameActive(false);
        clearInterval(intervalRef.current);
    }
    const playAgain = () => {
      setBoard(initializeBoard(rows, cols, mines));
      setIsGameActive(true);
      setIsGameWon(false);
      setTimer(0);
      clearInterval(intervalRef.current);
    }
    const renderButtonPlayAgain = () => {
       if(isGameWon || !isGameActive){
        return (
        <div className="container-playagain">
            <button onClick={playAgain}>
                Jogar denovo
            </button>
        </div>
        )
       }
    }
    const renderDificulty = () => {
      if(difficulty == "easy") return "Fácil";
      if(difficulty == "intermediate") return "Intermediário";
      if(difficulty == "hard") return "Difícil";
    }
    return (
        <Main routes={campo_minado_routes}>
            <div className="campo-minado-container">
              <div className="header">
                <div className="quant-bomb">
                    <h2>{mines} bombas</h2>
                </div>
                <div>
                  <h2>Nivel: {renderDificulty()}</h2>
                </div>
                <Timer time={timer}/>
              </div>
                <Board board={board} setBoard={handleBoardUpdate} gameOver={handleGameOver} isGameActive={isGameActive} />
                {renderButtonPlayAgain()}
            </div>
        </Main>
    )
}