import { useState, useEffect } from "react";
import Main from "../../layouts/main/Main";
import {campo_minado_routes} from "../../utils/basic_routes";
import OpcoesModal from "./components/OpcoesModal/OpcoesModal";
import Header from "./components/Header/Header";
import "./CampoMinado.css";
import {initializeBoard, checkWinCondition, saveWinData} from "./logics/GameLogic";
import Board from "./components/Board/Board";
import MessageModal from "./components/MessageModal/MessageModal";
import Timer from "./components/Timer/Timer";

export default function CampoMinado(){
    const [isOpcoesModalOpen, setOpcoesModalOpen] = useState(false);
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);
    const [difficulty, setDifficulty] = useState('easy');
    const [board, setBoard] = useState([]);
    const [isGameActive, setIsGameActive] = useState(true);
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLoser, setIsGameLoser] = useState(false);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const [resetTimer, setResetTimer] = useState(false);
    const [playerName, setPlayerName] = useState("");
    

    const difficulties = {
        easy: { label: "Fácil", value: "easy", rows: 9, cols: 9, mines: 10 },
        intermediate: { label: "Intermediário", value: "intermediate", rows: 16, cols: 16, mines: 40 },
        hard: { label: "Difícil", value: "hard", rows: 16, cols: 30, mines: 99 },
    };

    const { rows, cols, mines } = difficulties[difficulty];



    useEffect(() => {
        setBoard(initializeBoard(rows, cols, mines));
        setIsGameActive(true);
        setIsGameWon(false);
        setIsGameLoser(false);
    }, []);
    useEffect(() => {
        if(resetTimer) setResetTimer(false);
    }, [resetTimer])

    const openOpcoesModal = () => {
        setOpcoesModalOpen(true);
    }
    const closeOpcoesModal = () => {
        setOpcoesModalOpen(false);
    }
    const openMessageModal = () => {
        setMessageModalOpen(true);
    }
    const closeMessageModal = () => {
        setMessageModalOpen(false);
    }
    const handleDifficulty = (value) => {
        setDifficulty(value);
    }
    const handleGetTime = (time) => {
        setTime(time);
    }

    const handleOkOpcoesModal = () => {
        setBoard(initializeBoard(rows, cols, mines));
        setIsGameActive(true);
        setIsGameWon(false);
        setResetTimer(true);
        setTimerActive(true);
        setTime(0);
    }
    const novoJogo = () => {
        setBoard(initializeBoard(rows, cols, mines));
        setIsGameActive(true);
        setIsGameWon(false);
        setIsGameLoser(false);
        setResetTimer(true);
        setTimerActive(true);
        setTime(0);
    }
    const handleBoardUpdate = (newBoard) => {
        setBoard(newBoard);
        if (checkWinCondition(newBoard)) {
            setIsGameWon(true);
            setIsGameLoser(false);
            setIsGameActive(false);
            openMessageModal();
        }
    };

    const handlePlayerName = (event) => {
        setPlayerName(event.target.value);
    }

    const handleAddPlayerOnRanking = () => {
        if(playerName) {
            saveWinData(playerName, time,difficulty);
        }
    }

    const handleGameOver = () => {
        setIsGameActive(false);
        setIsGameLoser(true);
        setTimerActive(false);
        openMessageModal()
    }
    return (
        <Main routes={campo_minado_routes}>
            <div className="container-campo">
                <Header handleNovoJogo={novoJogo} openOpcoesModal={openOpcoesModal}/>
                <div className="info">
                    <h3>Campo: {rows}x{cols}</h3>
                    <h3>{mines} bombas</h3>
                </div>
                <div className="content">
                    <Timer isActive={timerActive} getTime={handleGetTime} resetTimer={resetTimer}/>
                    <Board board={board} isGameActive={isGameActive} setBoard={handleBoardUpdate} gameOver={handleGameOver}  />
                </div>

                <OpcoesModal 
                    isOpen={isOpcoesModalOpen} 
                    closeModal={closeOpcoesModal} 
                    difficulties={difficulties} 
                    difficulty={difficulty} 
                    setDifficulty={handleDifficulty} 
                    cols={cols}
                    mines={mines}
                    rows={rows}
                    actionOk={handleOkOpcoesModal}
                    />
                <MessageModal 
                    actionOk={novoJogo}
                    isOpen={isMessageModalOpen}
                    closeModal={closeMessageModal}
                    isGameWon={isGameWon} isGameLose={isGameLoser}
                    playerName={playerName} handlePlayerName={handlePlayerName}
                    handleAddPlayerOnRanking={handleAddPlayerOnRanking}
                />
            </div>
        </Main>
    )
}