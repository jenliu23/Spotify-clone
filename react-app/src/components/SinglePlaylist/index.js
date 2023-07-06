import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import { deleteSongFromPL, fetchPlaylists } from "../../store/playlists";
import AudioPlayer from "../AudioPlayer";
import { editCurrentPlayer } from '../../store/player';
import './SinglePlaylist.css'

const SinglePlaylist = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currentPlayer = useSelector((state) => state.player);
    const current_song = currentPlayer.current_song
    const isPlaying = currentPlayer.isPlaying
    const { playlistId } = useParams();
    const songlist_type = "PLAYLIST" + playlistId
 
    let songs
    const playlist = useSelector(state => state.playlists[playlistId]);
    if(playlist && playlist.songs){
        songs = Object.values(playlist.songs);
    }
    
    const handleDeleteSongFromPL = async(song, index) => {
        // e.preventDefault();
        if(song.songId === current_song.songId){
           let play = dispatch(editCurrentPlayer(songlist_type, songs.splice(index, 1), {}, index, false, "delete song")) 
        }else{
            let play = dispatch(editCurrentPlayer(songlist_type, songs.splice(index, 1), current_song, index, isPlaying, "delete other song"))
        }
        
        let deleted = await dispatch(deleteSongFromPL(song))
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
            <div className="playlist-button">
                <button>
                {isPlaying && currentPlayer.songlist_type === songlist_type ? (
                    <i className="fa-regular fa-circle-pause fa-lg"></i>
                ):(
                    <i className="fa-regular fa-circle-play fa-lg"></i>
                )}      
                </button>
            </div>
            <div className="song-list-intro playlist-song-list-intro">
                <h5><i className="fa-solid fa-headphones"></i></h5>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                {/* <button><i className="fa-regular fa-clock fa-lg"></i></button> */}
                <h3 className={sessionUser?.id === playlist?.userId ? "":"hidden"}>－</h3>
            </div>
            <div className="song-list-details playlist-song-list-details">
            {songs?.map((song, index) => (
                <div key={song.songId} className="song-list-each">
                    <AudioPlayer song={song} songs={songs} index={index} songlist_type={songlist_type} />
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <h4>--</h4>
                    <button onClick={(e) => handleDeleteSongFromPL(song, index)} className={sessionUser?.id === playlist?.userId ? "":"hidden"}>
                        Remove song
                    </button>
                </div>
                ))}
            </div>
        </div>
    )

}

export default SinglePlaylist