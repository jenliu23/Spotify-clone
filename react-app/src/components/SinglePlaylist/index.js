import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import { deleteSongFromPL } from "../../store/playlists";
import './SinglePlaylist.css'

const SinglePlaylist = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { playlistId } = useParams();

    let songs
    const playlist = useSelector(state => state.playlists[playlistId]);
console.log("whatis playlist", playlist)
    if(playlist?.songs){
        songs = Object.values(playlist.songs);
console.log("whatis songs", songs)
    }
    
    const handleDeleteSongFromPL = async(song) => {
        // e.preventDefault();
console.log("what is song", song)
        let deleted = await dispatch(deleteSongFromPL(song))
        console.log("whatis playlist after", playlist)
        console.log("whatis songs after", songs)
        // let again = await dispatch(fetchPlaylists())
    }

    return (
        <div className="single-playlist-container">
            <div className="single-playlist-container-info">
                <img src={playlist?.coverImage}/>
                <div>
                    <h4>Playlist</h4>
                    <h1>{playlist?.title}</h1>
                    <h5>{playlist?.username}</h5>
                </div>
                {sessionUser && playlist?.userId === sessionUser.id && (
                <section>
                    <OpenModalButton
                        buttonText="＋ Edit details"
                        modalComponent={<EditPlaylistModal playlist={playlist}/>}
                    />
                    <OpenModalButton
                        buttonText="－ Delete playlist"
                        modalComponent={<DeletePlaylistModal playlist={playlist}/>}
                    />
                </section>
                )}
            </div>
            <div className="single-playlist-container-songs">
                {songs?.map((song) => (
                <div key={song.songId}>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <audio controls>
                        <source src={song.songUrl} type="audio/mp3"/>
                    </audio>
                    <button onClick={(e) => handleDeleteSongFromPL(song)}>Remove song</button>
                </div>
                ))}
            </div>
        </div>
    )

}

export default SinglePlaylist