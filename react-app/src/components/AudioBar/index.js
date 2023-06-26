import './AudioBar.css'
import React, {useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCurrentPlayer } from '../../store/player';
import './AudioBar.css'

const AudioBar = () => {

    const dispatch = useDispatch();
    const [volume, setVolume] = useState(0.9)
    const sessionUser = useSelector((state) => state.session.user);
    const currentPlayer = useSelector((state) => state.player);

    const songlist_type = currentPlayer.songlist_type
    const songs = currentPlayer.current_songlist
    const current_song = currentPlayer.current_song
    const index = currentPlayer.index

    const isPlaying = currentPlayer.isPlaying
    const change = currentPlayer.change

    let audioPlayer = useRef()

    const playORpause = () => {
        if(Object.values(current_song).length > 0){
        const prevValue = isPlaying;
        let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, !isPlaying, "none"))
            if (!prevValue) {
                audioPlayer.current.play();
                // console.log("currentaudio", audioPlayer.current)
            }else {
                audioPlayer.current.pause();
            }    
        }
    }

    const playAhead = () => {
        if(index > 0 && songs.length > 1){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[index-1], index-1, true, "ahead song"))
        }
    }
    const playNext = () => {
        if(index < songs.length - 1){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[index+1], index+1, true, "next song"))
        }
    }
    const changeVolume = (value) => {
        audioPlayer.current.volume = value;
        setVolume(value)
    }

    let volumeIcon;
    if(volume == 0){
        volumeIcon = <i className="fa-solid fa-volume-xmark"></i>
    }else if (volume < 0.5){
        volumeIcon = <i className="fa-solid fa-volume-low"></i>
    }else {
        volumeIcon = <i className="fa-solid fa-volume-high"></i>
    }

    useEffect(()=>{
        if(change === "start new song"){
            audioPlayer.current.play();
        }
        if(change === "stop"){
            audioPlayer.current.pause();
        }
        if(change === "change song"){
            audioPlayer.current.play();
        }
        if(change === "recover current song"){
            audioPlayer.current.play();
        }
        if(change === "next song"){
            audioPlayer.current.play();
        }
        if(change === "ahead song"){
            audioPlayer.current.play();
        }
        if(change === "start new playlist"){
            audioPlayer.current.play();
        }
        if(change === "delete song"){
            audioPlayer.current.pause();
        }
    }, [change, current_song.songUrl])

    return (
        <div >
            <audio ref={audioPlayer} src={current_song.songUrl} preload="metadata" loop="loop"></audio>
            <div className="Audio-Bar">
                <div id="btn1">
                    <h4>{currentPlayer.current_song.title}</h4>
                    <h4>{currentPlayer.current_song.artist}</h4>
                </div>
                <div id="btn2">
                    <button onClick={playAhead} disabled={(index === 0 || songs.length === 1) ? true:false}>
                        <i className="fa-solid fa-backward-step">
                    </i></button>

                    <button onClick={playORpause}>
                    {isPlaying === true ? (
                    <i className="fa-regular fa-circle-pause fa-lg"></i>
                    ):(
                    <i className="fa-regular fa-circle-play fa-lg"></i>
                    )}      
                    </button>

                    <button onClick={playNext}  disabled={(index == songs.length - 1 || songs.length === 1) ? true:false}>
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                </div>
                <div id="btn3">
                    {volumeIcon}
                    <input type="range" min={0} max={1} step={0.02} value={volume} className="slider"
                        onChange={e => changeVolume(e.target.value)} />  
                </div>
            </div> 
        </div>
    )
}

export default AudioBar