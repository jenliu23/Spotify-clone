import React from "react";
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "./AddSongToPLModal";
import './SongList.css'

// import { NavLink } from "react-router-dom";
const SongList = ({songs}) => {

    return (
        <div className="song-list">
            <div>All Songs</div>
            <div className="song-list-intro">
                <h4></h4>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                <h4></h4>
                <button><i className="fa-regular fa-clock fa-lg"></i></button>
                <h4>＋</h4>
            </div>
            <div className="song-list-details">
            {songs?.map((song) => (
                <div key={song.id} className="song-list-each">
                    <button><i className="fa-solid fa-play"></i></button>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <h4></h4>
                    {/* <audio controls>
                        <source src={song.songUrl} type="audio/mp3"/>
                    </audio> */}
                    <button><i className="fa-regular fa-heart"></i></button>
                    <h4>dura</h4>
                    <div>
                        <OpenModalButton
                        buttonText="＋ Add to playlist"
                        modalComponent={<AddSongToPLModal song={song}/>}
                        />
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SongList
