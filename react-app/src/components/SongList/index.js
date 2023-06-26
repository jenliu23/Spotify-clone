import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "./AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";
import AudioPlayer from "../AudioPlayer";
import './SongList.css'

const SongList = ({songs}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const songlist_type = "ALL SONGS"

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
            {songs?.map((song, index) => (
                <div key={song.id} className="song-list-each">
                    <AudioPlayer song={song} songs={songs} index={index} songlist_type={songlist_type}/>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <h4>--</h4>
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
        </div>
    )
}

export default SongList
