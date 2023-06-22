import React, {useState, useRef }from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "./AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";
import AudioPlayer from "../AudioPlayer";
import AudioBarPlayBtn from "../AudioBar";
import './SongList.css'

const SongList = ({songs}) => {
    const sessionUser = useSelector((state) => state.session.user);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState("");
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef();
    
    const playORpause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (prevValue) {
            audioPlayer.current.play();
            console.log("currentaudio", audioPlayer.current)
            setCurrentSong(audioPlayer.current)
            console.log("crraesong", currentSong)
        }else {
            audioPlayer.current.pause();
        }
    }

    return (
        <div className="song-list">
            <div>All Songs</div>
            <div className="song-list-intro">
                <h4>.</h4>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                <h4>.</h4>
                <button><i className="fa-regular fa-clock fa-lg"></i></button>
                <h4>＋</h4>
            </div>
            <div className="song-list-details">
            {songs?.map((song) => (
                <div key={song.id} className="song-list-each">
                    {/* <button onClick={playORpause}>{isPlaying ? "pause" : "play"}</button>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <h4>.</h4>
                    <audio>

                    </audio>
                    <audio ref={audioPlayer} src={song.songUrl} preload="metadata"></audio>
                    <button><i className="fa-regular fa-heart"></i></button>
                    <h4>dura</h4> */}
                    <AudioPlayer song={song}/>
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
                    
                </div>
            ))}
            </div>

            <div className="bottom-container">
                <AudioBarPlayBtn currentSong={currentSong} songs={songs}/>
            </div>
        </div>
    )
}

export default SongList
