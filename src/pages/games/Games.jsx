import { NavLink } from "react-router-dom";
import Main from "../../layouts/main/Main";
import {default_routes} from "../../utils/basic_routes";
import "./Games.css"

export default function Games(){
    return(
        <Main routes={default_routes}>
            <NavLink className={"game-box-container"} to={"/games/campo-minado"}>
                <div className="game-box-img campo-minado"></div>
                <div className="game-box-title">
                    <p>Campo Minado</p>
                    <p>(Básico)</p>
                </div>
            </NavLink>
        </Main>
    )
}