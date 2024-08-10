import { useState } from "react";
import Modal from "../Modal/Modal";
import Status from "../Status/Status";
import "./MessageModal.css";

export default function MessageModal({isOpen, closeModal, actionOk, isGameLose, isGameWon, playerName, handlePlayerName, handleAddPlayerOnRanking}){
    const [added, setAdded] = useState(false);

    const handleActionOk = () => {
        actionOk();
        setAdded(false);
        closeModal();
    }
    const action = () => {
        handleAddPlayerOnRanking();
        setAdded(true);
    }
    const renderForm = () => {
        if(added) {
            return (
                <p className="success">Adicionado!</p>
            )
        }
        return (
            <div className="container-form">
                <input value={playerName} onChange={handlePlayerName}/>
                <button onClick={action}>Adicionar</button>
            </div>
        )
    }
    const renderInput = () => {
        if(isGameWon) {
            return (
                <div className="container-game-won">
                    <div>
                        <div>
                            <strong>Você venceu! Parabéns</strong>
                            <p>Informe seu nome para adicionarmos ao ranking</p>
                        </div>
                        {renderForm()}
                    </div>
                </div>
            )
        }
    }
    return(
        <Modal isOpen={isOpen} onClose={closeModal}>
            <Status  isGameLose={isGameLose}  isGameWon={isGameWon}/>
            {renderInput()}
            <div className="actions">
                <button onClick={handleActionOk}>
                    Novo jogo
                </button>
                <button onClick={closeModal}>
                    Cancelar
                </button>
            </div>
        </Modal>
    )
}