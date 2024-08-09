import winImg from "../../../../imgs/win.png";
import loseImg from "../../../../imgs/loser_white.png";
import "./Status.css";

export default function Status({isGameWon, isGameLose}){

    const renderStatus = () => {
        if(isGameWon) {
            return (
                <img src={winImg} alt="You win"/>
            )
        }else if(isGameLose) {
            return (
                <img src={loseImg} alt="You lose"/>
            )
        }
    }

    return (
        <div className="container-status">
            {renderStatus()}
        </div>
    )
}