import React, {useState, useRef, useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "./AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";
import AudioPlayer from "../AudioPlayer";
import AudioBarPlayBtn from "../AudioBar";
import { editCurrentPlayer } from "../../store/player";
import './SongList.css'

const SongList = ({songs}) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="song-list">
            <h3>All Songs</h3>
            <div className="song-list-intro">
                <h4><i className="fa-solid fa-headphones"></i></h4>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                {/* <button><i className="fa-regular fa-clock fa-lg"></i></button> */}
                <h4>＋</h4>
            </div>
            <div className="song-list-details">
            {songs?.map((song) => (
                <div key={song.id} className="song-list-each">
                    <AudioPlayer song={song} songs={songs}/>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <h4>--</h4>
                    {/* <audio id="audioplaying" src={song.songUrl} preload="metadata"></audio> */}
                    {/* <button><i className="fa-regular fa-heart"></i></button>
                    <h4>dura</h4> */}
                    {/* <h4>{song.duration}</h4> */}
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

            {/* <div className="bottom-container">
                <AudioBarPlayBtn songs={songs} />
            </div> */}
        </div>
    )
}

export default SongList
