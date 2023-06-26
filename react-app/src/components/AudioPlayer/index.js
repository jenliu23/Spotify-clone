import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCurrentPlayer } from "../../store/player";
import './AudioPlayer.css'

const AudioPlayer = ({song, songs, index, songlist_type}) => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => state.player);
    const current_song = currentPlayer.current_song
    const isPlaying = currentPlayer.isPlaying
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    let songId;
    let currentSongId;
    if(songlist_type === "ALL SONGS"){
        songId = song.id;
        currentSongId = current_song.id
    }else{
        songId = song.songId;
        currentSongId = current_song.songId
    }

    const changeState = () => {
        if(songlist_type !== currentPlayer.songlist_type){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, true, "start new playlist"))
        }
        else if(!isPlaying && Object.values(current_song).length === 0){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "start new song"))
        }else if(isPlaying && currentSongId === songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "stop"))
        }else if(isPlaying && currentSongId && currentSongId !== songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, true, "change song"))
        }else if(!isPlaying && currentSongId === songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "recover current song"))
        }else if(!isPlaying && currentSongId && currentSongId !== songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "start new song"))
        }
    }

    return (
        <>
            <button onClick={changeState} className="audioPlayerBtn">
                {isPlaying && songId === currentSongId && songlist_type == currentPlayer.songlist_type ?(
                    <i className="fa-solid fa-pause fa-lg"></i>
                    ):(
                    <i className="fa-solid fa-play fa-lg"></i>
                    )}
            </button>
        </>
    )

}

export default AudioPlayer