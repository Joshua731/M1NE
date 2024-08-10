import ReactHowler from "react-howler";
import { useEffect, useState, useRef } from "react";
import "./PlayList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { tracks } from "../../../../utils/configurations";

export default function PlayList(){
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);
    const howlerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (howlerRef.current) {
                setSeek(howlerRef.current.seek());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleEnd = () => {
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0);
        }
    };

    useEffect(() => {
        setIsPlaying(true);
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
    const handleSeekChange = (e) => {
        const newSeek = parseFloat(e.target.value);
        setSeek(newSeek);
        howlerRef.current.seek(newSeek);
    };
    const onLoad = () => {
        setDuration(howlerRef.current.duration());
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="container-playlist">
            <ReactHowler
                src={tracks[currentTrackIndex].src}
                playing={isPlaying}
                volume={volume}
                onEnd={handleEnd}
                ref={howlerRef}
                loop={true}
                onLoad={onLoad}
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
                    <div>
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
                    </div>
                    <span>{Math.round(volume * 100)}%</span>
                </div>
                <div className="progress">
                    <div>
                        <label htmlFor="progress">Progresso: </label>
                        <input
                            id="progress"
                            type="range"
                            min="0"
                            max={duration}
                            step="0.01"
                            value={seek}
                            onChange={handleSeekChange}
                        />
                    </div>
                    <span>{formatTime(seek)} / {formatTime(duration)}</span>
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