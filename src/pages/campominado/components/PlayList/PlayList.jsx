import ReactHowler from "react-howler";
import { useEffect, useState } from "react";
import "./PlayList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { tracks } from "../../../../utils/configurations";

export default function PlayList(){
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.5);

    const handleEnd = () => {
        // Avança para a próxima música quando a atual termina
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0); // Reinicia a playlist
        }
    };


    useEffect(() => {
        setIsPlaying(true); // Inicia a reprodução ao montar o componente
    }, []);
    
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };
    
    const handleNext = () => {
        setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
    };
    
    const handlePrev = () => {
        setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
    };

    const renderListMusics = () => {
        return (
            tracks.map((track, index) => (
                <li key={index} onClick={() => playMusic(index)}>
                    <img src={track.img} alt={track.title} /> <p>{track.title}</p>
                </li>
            ))
        )
    }
    const playMusic = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    }
    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className="container-playlist">
            <ReactHowler
                src={tracks[currentTrackIndex].src}
                playing={isPlaying}
                volume={volume}
                onEnd={handleEnd}
                loop={true}
            />
            <div className="controls">
                <div className="info">
                    <strong>Tocando: {tracks[currentTrackIndex].title}</strong>
                </div>
                <div className="buttons-controls">
                    <button onClick={handlePrev}>
                        <FontAwesomeIcon icon={faBackward}/>
                    </button>
                    <button onClick={handlePlayPause}>
                        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </button>
                    <button onClick={handleNext}><FontAwesomeIcon icon={faForward}/></button>
                </div>
                <div className="volume">
                    <label htmlFor="volume">Volume: </label>
                    <input
                        id="volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <span>{Math.round(volume * 100)}%</span>
                </div>
            </div>
            <nav className="playlist">
                <ul>
                    {renderListMusics()}
                </ul>
            </nav>
        </div>
    )
}