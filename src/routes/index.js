import { Routes, Route } from "react-router";
import Home from "../pages/home/Home";
import Games from "../pages/games/Games";
import CampoMinado from "../pages/campo_minado/basic/CampoMinado";
import Ranking from "../pages/ranking/Ranking";

export default function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/games" element={<Games/>}/>
            <Route path="/campo-minado" element={<CampoMinado/>}/>
            <Route path="/ranking" element={<Ranking/>}/>
        </Routes>
    )
}