import Main from "../../layouts/main/Main";
import {default_routes} from "../../utils/basic_routes";

export default function Home(){
    return (
        <Main routes={default_routes}>
            <h1>Página principal</h1>
        </Main>
    )
}