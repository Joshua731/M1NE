import { NavLink } from "react-router-dom";
import Main from "../../layouts/main/Main";
import {default_routes} from "../../utils/basic_routes";
import "./ComeceAJogar.css";
import {useState} from "react";

export default function ComeceAJogar(){
    const [difficulty, setDifficulty] = useState('easy');

    const difficulties = {
        easy: { label: "Fácil", value: "easy" },
        intermediate: { label: "Intermediário", value: "intermediate" },
        hard: { label: "Difícil", value: "hard" },
    };
    return(
        <Main routes={default_routes}>
            <div className="container-comece-jogar">
                <h1>Começe a jogar</h1>
                <div className="options">
                    <h2>Escolha a dificuldade</h2>
                    <div className="difficulty-options">
                        {Object.values(difficulties).map((diff) => (
                            <label key={diff.value}>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value={diff.value}
                                    checked={difficulty === diff.value}
                                    onChange={() => setDifficulty(diff.value)}
                                />
                                {diff.label}
                            </label>
                        ))}
                    </div>
                </div>
                <br/>
                <NavLink className={"btn-comece-jogar"} to={`/campo-minado/${difficulty}`}>
                    Jogar
                </NavLink>
            </div>
        </Main>
    )
}