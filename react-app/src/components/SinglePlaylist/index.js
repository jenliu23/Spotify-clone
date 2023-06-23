import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import { deleteSongFromPL, fetchPlaylists } from "../../store/playlists";
import AudioBar from "../AudioBar";
import './SinglePlaylist.css'

const SinglePlaylist = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { playlistId } = useParams();

    let songs
    const playlist = useSelector(state => state.playlists[playlistId]);
// console.log("whatis playlist", playlist)
    if(playlist && playlist.songs){
        songs = Object.values(playlist.songs);
// console.log("whatis songs", songs)
    }
    
    const handleDeleteSongFromPL = async(song) => {
        // e.preventDefault();
        let deleted = await dispatch(deleteSongFromPL(song))
        // let again = await dispatch(fetchPlaylists())
    }

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    return (
        <div className="single-playlist-container">
            <div className="single-playlist-container-info">
                <img src={playlist?.coverImage} alt="cover"/>
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
                        <source src={song.songUrl} type="audio/mp3" id="audio"/>
                    </audio>
                    <button onClick={(e) => handleDeleteSongFromPL(song)}>Remove song</button>
                </div>
                ))}
            </div>

            <div className="bottom-container">
                <AudioBar />
            </div>
        </div>
    )

}

export default SinglePlaylist