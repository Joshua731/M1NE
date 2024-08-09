import Modal from "../Modal/Modal";
import "./OpcoesModal.css";

export default function OpcoesModal({isOpen, closeModal, setDifficulty, difficulties, difficulty , rows, cols, mines, actionOk}){
    const handleOk = () => {
        actionOk();
        closeModal();
    }
    return(
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h2>Opções</h2>
            <fieldset>
                <legend>Dificuldade</legend>
                <div className="container-opcoes-dificuldade">
                    <div className="radios">
                        {Object.values(difficulties).map((diff,index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={diff.value}
                                        checked={difficulty === diff.value}
                                        onChange={() => setDifficulty(diff.value)}
                                    />
                                    {diff.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="info">
                        <span>Largura: </span><strong>{rows}</strong><br/>
                        <span>Altura: </span><strong>{cols}</strong><br/>
                        <span>Bombas: </span><strong>{mines}</strong><br/>
                    </div>
                </div>
            </fieldset>
            <div className="actions">
                <button onClick={handleOk}>
                    OK
                </button>
                <button onClick={closeModal}>
                    Cancelar
                </button>
            </div>
        </Modal>
    )
}