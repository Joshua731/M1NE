import Main from "../../layouts/main/Main";
import {default_routes} from "../../utils/basic_routes";
import {ROUTE_SERVER} from "../../utils/configurations";
import React, { useEffect, useState } from 'react';
import './Ranking.css';
import medalha_ouro from '../../imgs/medalha-de-ouro.png';
import medalha_prata from "../../imgs/medalha-de-prata.png";
import medalha_bronze from "../../imgs/medalha-de-bronze.png";

export default function Ranking(){
    const [wins, setWins] = useState([]);
    const [filteredWins, setFilteredWins] = useState([]);
    const [difficulty, setDifficulty] = useState("all");
    document.title = "Ranking";
  
    useEffect(() => {
      fetch(`${ROUTE_SERVER}/wins`)
        .then((response) => response.json())
        .then((data) => {
          setWins(data);
          filterAndSortWins(wins,"all")
        })
        .catch((error) => console.error("Error fetching wins:", error));
    }, []);
  
    const handleDifficultyChange = (event) => {
      const selectedDifficulty = event.target.value;
      setDifficulty(selectedDifficulty);
      filterAndSortWins(wins, selectedDifficulty);
    };
  
    const filterAndSortWins = (wins, difficulty) => {
      let filtered = wins;
      if (difficulty !== "all") {
        filtered = wins.filter((win) => win.difficulty === difficulty);
      }
      const sorted = filtered.sort((a, b) => a.time - b.time);
      setFilteredWins(sorted);
    };
  
    useEffect(() => {
      filterAndSortWins(wins, difficulty);
    }, [wins, difficulty]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const renderMedal = (index) => {
        if(index == 0) {
            return (
                <td className="container_medalha"><img src={medalha_ouro} alt="Medalha de ouro" /></td>
            )
        }else if(index == 1){
            return(
                <td className="container_medalha"><img src={medalha_prata} alt="Medalha de prata" /></td>
            )
        }else if(index == 2){
            return (
                <td className="container_medalha"><img src={medalha_bronze} alt="Medalha de bronze" /></td>
            )
        }
        return(
            <td className="posicao"><strong>{index + 1}</strong></td>
        )
    }
    const renderDificulty = (di) => {
        if(di == "easy") return "Fácil";
        if(di == "intermediate") return "Intermediário";
        if(di == "hard") return "Difícil";
    }

    return(
        <Main routes={default_routes}>
            <div className="ranking-container">
                <h1>Ranking</h1>
                <br/>
                <div className="ranking-filtro">
                    <label>
                        Filtrar por Dificuldade:
                        <select value={difficulty} onChange={handleDifficultyChange}>
                            <option value="all">Todas</option>
                            <option value="easy">Fácil</option>
                            <option value="intermediate">Intermediário</option>
                            <option value="hard">Difícil</option>
                        </select>
                    </label>
                </div>
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Jogador</th>
                            <th>Tempo</th>
                            <th>Dificuldade</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWins.map((win, index) => (
                            <tr key={index}>
                                {renderMedal(index)}
                                <td>{win.name}</td>
                                <td>{formatTime(win.time)}</td>
                                <td>{renderDificulty(win.difficulty)}</td>
                                <td>{new Date(win.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Main>
    )
}