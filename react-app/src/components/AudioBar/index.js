import './AudioBar.css'
import React, {useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getCurrentSongTrack } from '../../store/player';
import './AudioBar.css'

const AudioBar = () => {
    // console.log("song in audiobtn:", song)
    // console.log("index in audiobtn:", index)
    // console.log("songsssss:", songs)
    // console.log("ispalying in audiobtn:", isPlaying)
    // console.log("check isplaying", isPlaying === true)
    // if(isPlaying)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const currentPlayer = useSelector((state) => state.player);
// console.log("current Player:", currentPlayer)
    const current_song = currentPlayer.current_song
// console.log("current song:", current_song)
    const isPlaying = currentPlayer.isPlaying
// console.log("current isPlaying:", isPlaying)
//     const change = currentPlayer.change
// console.log("current change:", change)

//     let audioPlayer;
    // audioPlayer = new Audio();
    // audioPlayer.id = "current_song"
    // useEffect(()=>{
    //     audioPlayer = new Audio();
    //     audioPlayer.id = "current_song"
    //     audioPlayer.src = current_song.songUrl;
    // }, [current_song])
    // console.log("audioplayer 0:", audioPlayer)

    //     audioPlayer = new Audio();
    //     audioPlayer.id = "current_song"
    //     audioPlayer.src = current_song.songUrl;
    //     console.log("testtest")
    //     audioPlayer.play()
    //     console.log("audioplayer 1:", audioPlayer)

    // else if(isPlaying && !change){
    //     audioPlayer.pause()
    //     console.log("audioplayer 2:", audioPlayer)
    // }
    
    // const playORpause = () => {
    //     const prevValue = isPlaying;
    //     setIsPlaying(!prevValue);
    //     if (!prevValue) {
    //         audioPlayer.current.play();
    //         console.log("currentaudio", audioPlayer.current)
    //     }else {
    //         audioPlayer.current.pause();
    //     }
    // }

    return (
        <div >
            <div className="Audio-Bar">
                <div id="btn1">
                    <h4>{currentPlayer.current_song.title}</h4>
                    <h4>{currentPlayer.current_song.artist}</h4>
                </div>
                <div id="btn2">
                    <button><i className="fa-solid fa-backward-step"></i></button>
                    {isPlaying === true ? (
                    <button><i className="fa-regular fa-circle-pause fa-lg"></i></button>
                    ):(
                    <button><i className="fa-regular fa-circle-play fa-lg"></i></button>
                    )}    
                    <button><i className="fa-solid fa-forward-step"></i></button>
                </div>
                <div id="btn3">
                </div>
                {/* <input type="range" /> */}
            </div> 
        </div>
    )
}

export default AudioBar