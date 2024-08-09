import "./Header.css";

export default function Header({openOpcoesModal , handleNovoJogo}){
    return (
        <header className="campo-minado-header">
            <button onClick={handleNovoJogo}>
                Novo jogo
            </button>
            <button onClick={openOpcoesModal}>
                Opções
            </button>
        </header>
    )
}