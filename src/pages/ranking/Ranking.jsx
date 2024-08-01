import Main from "../../layouts/main/Main";
import {default_routes} from "../../utils/basic_routes";
import {ROUTE_SERVER} from "../../utils/configurations";
import React, { useEffect, useState } from 'react';
import './Ranking.css';

export default function Ranking(){
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
          try {
            const response = await fetch(`${ROUTE_SERVER}/ranking`);
            const data = await response.json();
            setRankings(data);
          } catch (error) {
            console.error('Failed to fetch rankings:', error);
          }
        };
    
        fetchRankings();
    }, []);

    return(
        <Main routes={default_routes}>
            <div className="ranking-container">
                <h1>Ranking</h1>
                <table className="ranking-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tempo</th>
                        <th>Dificuldade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rankings.map((rank, index) => (
                        <tr key={index}>
                        <td>{rank.name}</td>
                        <td>{Math.floor(rank.time / 60)}:{('0' + (rank.time % 60)).slice(-2)}</td>
                        <td>{rank.difficulty}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Main>
    )
}