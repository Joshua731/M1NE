import ReactHowler from "react-howler";

export default function BackgroundMusic({playSound, setPlaySound, musicpath, loop}) {

    const handleEnd = () => {
        setPlaySound(false);
    }

    return (
        <ReactHowler
            src={musicpath}
            playing={playSound}
            onEnd={handleEnd}
            loop={loop}
        />
    )
}