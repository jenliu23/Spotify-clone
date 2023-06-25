import React, {useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AudioBarPlayBtn from "../AudioBar";
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "../SongList/AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";
import { editCurrentPlayer } from "../../store/player";
import './AudioPlayer.css'

const AudioPlayer = ({song, songs}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    // const currentPlayer = useSelector((state) => state.player);
// console.log("currentPlayer", currentPlayer)
    const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef();
// console.log("song in audioplayer", song)
// console.log("song index audioplayer", index)

    const playORpause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        let play = dispatch(editCurrentPlayer(songs, song, !isPlaying, false))
        if (!prevValue) {
            audioPlayer.current.play();
            // console.log("currentaudio", audioPlayer.current)
        }else {
            audioPlayer.current.pause();
        }
    }


    return (
        <>
            <button onClick={playORpause} className="audioPlayerBtn">
                {isPlaying? (
                    <i className="fa-solid fa-pause fa-lg"></i>
                    ):(
                    <i className="fa-solid fa-play fa-lg"></i>
                    )}
            </button>
            <audio ref={audioPlayer} src={song.songUrl} preload="metadata"></audio>
        </>
    )

}

export default AudioPlayer