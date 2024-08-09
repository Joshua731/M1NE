import { Routes, Route } from "react-router";
import Games from "../pages/games/Games";
import Ranking from "../pages/ranking/Ranking";
import CampoMinado from "../pages/campominado/CampoMinado";
import Home from "../pages/home/Home";


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