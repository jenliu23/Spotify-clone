import React, {useState, useRef } from "react";
import { useSelector } from "react-redux";
import AudioBarPlayBtn from "../AudioBar";
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "../SongList/AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";

const AudioPlayer = ({song, index, songs}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef();
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
        <>
            {/* <button onClick={playORpause}>{isPlaying ? "pause" : "play"}</button> */}
            <AudioBarPlayBtn song={song} index={song.id} songs={songs} isPlaying={isPlaying} audioPlayer={audioPlayer}/>
            <h4>{song.title}</h4>
            <h4>{song.artist}</h4>
            <h4>.</h4>
            <audio ref={audioPlayer} src={song.songUrl} preload="metadata"></audio>
            <button><i className="fa-regular fa-heart"></i></button>
            <h4>dura</h4>
            {sessionUser? (
            <div>
                <OpenModalButton
                    buttonText="＋ Add to playlist"
                    modalComponent={<AddSongToPLModal song={song}/>}
                />
            </div>
            ) : (
            <div>
                <OpenModalButton
                    buttonText="＋ Add to playlist"
                    modalComponent={<LoginFormModal />}
                />
            </div>
            )}

            <div className="bottom-container">
                <AudioBarPlayBtn song={song} index={song.id} songs={songs} isPlaying={isPlaying}/>
            </div>
        </>
    )

}

export default AudioPlayer