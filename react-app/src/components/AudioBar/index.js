import './AudioBar.css'
import React, {useState, useRef } from "react";
import { useSelector } from "react-redux";

const AudioBarPlayBtn = ({song, index, songs, audioPlayer}) => {
    console.log("song in audiobtn:", song)
    console.log("index in audiobtn:", index)
    console.log("songsssss:", songs)
    // console.log("ispalying in audiobtn:", isPlaying)
    // console.log("check isplaying", isPlaying === true)
    // if(isPlaying)
    const sessionUser = useSelector((state) => state.session.user);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    // const audioPlayer = useRef();
console.log("song in audioplayer", song)
console.log("song index audioplayer", index)
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
        <div >
            <div className="Audio-Bar">
                <button><i className="fa-solid fa-backward-step"></i></button>
                {isPlaying === true ? (
                <button onClick={playORpause}><i className="fa-regular fa-circle-pause fa-lg"></i></button>
                ):(
                <button onClick={playORpause}><i className="fa-regular fa-circle-play fa-lg"></i></button>
                )}    
                <button><i className="fa-solid fa-forward-step"></i></button>
                <input type="range" />
            </div> 
        </div>
    )
}

export default AudioBarPlayBtn