import { Routes, Route } from "react-router";
import Home from "../pages/home/Home";
import Games from "../pages/games/Games";
import CampoMinado from "../pages/campo_minado/basic/CampoMinado";
import Ranking from "../pages/ranking/Ranking";
import ComeceAJogar from "../pages/comece_a_jogar/ComeceAJogar";

export default function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/games" element={<Games/>}/>
            <Route path="/comece-a-jogar" element={<ComeceAJogar/>}/>
            <Route path="/campo-minado/:difficulty" element={<CampoMinado/>}/>
            <Route path="/ranking" element={<Ranking/>}/>
        </Routes>
    )
}