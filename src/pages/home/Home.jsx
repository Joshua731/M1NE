import Main from "../../layouts/main/Main";
import {default_routes} from "../../utils/basic_routes";
import explosionGif from "../../imgs/explosion.gif";
import "./Home.css";
import { NavLink } from "react-router-dom";

export default function Home(){
    document.title = "Página principal";
    return (
        <Main routes={default_routes}>
            <div className="body-pagina-principal">
                <h1>Página principal</h1>
                <section className="intro">
                    <h2>Introdução</h2>
                    <p>Campo Minado é um clássico jogo de lógica onde o objetivo é descobrir todas as minas escondidas no
                        tabuleiro sem detoná-las.</p>
                </section>
                <section className="rules">
                    <h2>Regras Básicas</h2>
                    <ul>
                        <li>O tabuleiro é composto por uma grade de células, algumas contendo minas ocultas.</li>
                        <li>Seu objetivo é revelar todas as células que não contêm minas.</li>
                        <li>Clicar em uma célula que contém uma mina termina o jogo.</li>
                        <li>O número em uma célula indica quantas minas estão nas células adjacentes.</li>
                    </ul>
                </section>
                <section className="how-to-play">
                    <h2>Como Jogar</h2>
                    <ol>
                        <li>Clique em uma célula para revelá-la.</li>
                        <li>Se a célula contiver uma mina, o jogo termina.</li>
                        <li>Se a célula não contiver uma mina, um número será exibido indicando quantas minas estão nas células
                            adjacentes.</li>
                        <li>Use esses números para deduzir quais células são seguras para clicar.</li>
                        <li>Continue revelando células até que todas as que não contêm minas sejam reveladas.</li>
                    </ol>
                </section>
                <section className="tips">
                    <h2>Dicas e Truques</h2>
                    <ul>
                        <li>Se uma célula revelada exibir "0", todas as células adjacentes são seguras para revelar.</li>
                        <li>Use bandeiras para marcar células que você suspeita conterem minas. Clique com o botão direito do
                            mouse para colocar uma bandeira.</li>
                        <li>Comece clicando em áreas do tabuleiro que têm mais espaço aberto para reduzir a chance de clicar em
                            uma mina.</li>
                    </ul>
                </section>
                <section className="good-luck">
                    <h2>Boa Sorte!</h2>
                    <img src={explosionGif} alt="Boa sorte!" />
                </section>
                <div className="container-footer-startgame">
                    <NavLink to={"campo-minado"} className={"btnstartgame"}>
                        Começe a jogar
                    </NavLink>
                    
                </div>
            </div>
        </Main>
    )
}