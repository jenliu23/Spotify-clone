import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import { deleteSongFromPL, fetchPlaylists } from "../../store/playlists";
import AudioPlayer from "../AudioPlayer";
import { editCurrentPlayer } from '../../store/player';
import './SinglePlaylist.css'
import { fetchAlbums } from "../../store/albums";

const SinglePlaylist = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector((state) => state.albums);
    const currentPlayer = useSelector((state) => state.player);
    const current_song = currentPlayer.current_song
    const isPlaying = currentPlayer.isPlaying
    const index = currentPlayer.index
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
            if(songs.length > 1){
                songs.splice(index, 1)
                let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[0], 0, false, "delete song")) 
            }else{
                let play = dispatch(editCurrentPlayer("", [], {}, NaN, false, "delete last song"))
            }
        }else{
            songs.splice(index, 1)
            let newIndex
            for(let i=0; i<songs.length; i++){
                if(songs[i].songId === current_song.songId){
                    newIndex = i
                }
            }
            let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, newIndex, isPlaying, "delete other song"))
        }
        
        let deleted = await dispatch(deleteSongFromPL(song))
    }

    const playOrPausePL = () => {
        if(isPlaying){
            if(currentPlayer.songlist_type === songlist_type){
                let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, false, "stop"))
            }else{
                if(songs.length > 0){
                    if(current_song.songId === songs[0].songId){
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, true, "start new playlist on same song")) 
                    }else{
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[0], 0, true, "start new playlist"))
                    }
                }
            }
        }else{
            if(currentPlayer.songlist_type === songlist_type){
                let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, true, "recover current song"))
            }else{
                if(songs.length > 0){
                    if(current_song.songId === songs[0].songId){
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, true, "start new playlist on same song")) 
                    }else{
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[0], 0, true, "start new playlist"))
                    }
                }
            }
        }
    }

    useEffect(() => {
        dispatch(fetchPlaylists());
        dispatch(fetchAlbums());
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
                <button onClick={playOrPausePL}>
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
                    {song.albumId?.length > 0 ? (
                        <NavLink exact to = {`/albums/${song.albumId[0]}`}>
                        <h4>{albums[song.albumId[0]]?.title}</h4>
                        </NavLink> 
                    ):(
                        <h4>--</h4>
                    )
                    }
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