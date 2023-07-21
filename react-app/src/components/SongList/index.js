import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "./AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";
import AudioPlayer from "../AudioPlayer";
import './SongList.css'

const SongList = ({songs}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albums);
    const songlist_type = "ALL SONGS"

    return (
        <div className="song-list">
            <h3>All Songs</h3>
            <div className="song-list-intro">
                <h5><i className="fa-solid fa-headphones"></i></h5>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                {/* <button><i className="fa-regular fa-clock fa-lg"></i></button> */}
                <h3>＋</h3>
            </div>
            <div className="song-list-details">
            {songs?.map((song, index) => (
                <div key={song.id} className="song-list-each">
                    <AudioPlayer song={song} songs={songs} index={index} songlist_type={songlist_type}/>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    {song.albumId.length > 0 ? (
                        <NavLink exact to = {`/albums/${song.albumId[0]}`}>
                        <h4>{albums[song.albumId[0]]?.title}</h4>
                        </NavLink> 
                    ):(
                        <h4>--</h4>
                    )
                    }
                    {sessionUser? (
                    <div className="add-to-playlist-btn">
                        <OpenModalButton
                        buttonText="＋ Add to playlist"
                        modalComponent={<AddSongToPLModal song={song}/>}
                        />
                    </div>
                    ) : (
                    <div className="add-to-playlist-btn">
                        <OpenModalButton
                        buttonText="＋ Add to playlist"
                        modalComponent={<LoginFormModal />}
                        />
                    </div>
                    )}
                </div>
            ))}
            </div>
        </div>
    )
}

export default SongList
