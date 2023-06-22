import React, {useState, useRef } from "react";

const AudioPlayer = ({song}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef();

    const playORpause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            console.log("currentaudio", audioPlayer.current)
        }else {
            audioPlayer.current.pause();
        }
    }

    return (
        <>
            <button onClick={playORpause}>{isPlaying ? "pause" : "play"}</button>
            <h4>{song.title}</h4>
            <h4>{song.artist}</h4>
            <h4>.</h4>
            <audio ref={audioPlayer} src={song.songUrl} preload="metadata"></audio>
            <button><i className="fa-regular fa-heart"></i></button>
            <h4>dura</h4>
        </>
    )

}

export default AudioPlayer