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
    // let songId;
    // let currentSongId;
    // if(songlist_type === "ALL SONGS"){
    //     songId = song.id;
    //     currentSongId = current_song.id
    // }else{
    //     songId = song.songId;
    //     currentSongId = current_song.songId
    // }

    let playIcon;
    if(isPlaying){
        if(song.songId === current_song.songId && songlist_type == currentPlayer.songlist_type){
            playIcon = <i className="fa-solid fa-pause fa-lg"></i>
        
        // else if(songlist_type !== "ALL SONGS" && currentPlayer.songlist_type === "ALL SONGS" && song.songId === current_song.songId){
        //     playIcon = <i className="fa-solid fa-pause fa-lg"></i>
        // }else if(songlist_type === "ALL SONGS" && currentPlayer.songlist_type !== "ALL SONGS" && song.songId === current_song.songId){
        //     playIcon = <i className="fa-solid fa-pause fa-lg"></i>
        }else {
            playIcon = <i className="fa-solid fa-play fa-lg"></i>
        }
    }else {
        playIcon = <i className="fa-solid fa-play fa-lg"></i>
    }

    const changeState = () => {
        if(isPlaying && songlist_type !== currentPlayer.songlist_type && song.songId === current_song.songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, isPlaying, "start new playlist on same song"))
        }else if(songlist_type !== currentPlayer.songlist_type){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, true, "start new playlist"))
        }else if(!isPlaying && Object.values(current_song).length === 0){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "start new song"))
        }else if(isPlaying && current_song.songId === song.songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "stop"))
        }else if(isPlaying && current_song.songId && current_song.songId !== song.songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, true, "change song"))
        }else if(!isPlaying && current_song.songId === song.songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "recover current song"))
        }else if(!isPlaying && current_song.songId && current_song.songId !== song.songId){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, song, index, !isPlaying, "start new song"))
        }
    }

    return (
        <>
            <button onClick={changeState} className="audioPlayerBtn">
                {playIcon}
            </button>
        </>
    )

}

export default AudioPlayer