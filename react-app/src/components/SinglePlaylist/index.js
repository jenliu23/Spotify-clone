import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import { deleteSongFromPL, fetchPlaylists } from "../../store/playlists";
import './SinglePlaylist.css'

const SinglePlaylist = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { playlistId } = useParams();
    // const playlists = Object.values(useSelector((state) => state.playlists));
    // const playlist = playlists[playlistId]
    // const allsongs = playlists[playlistId]?.songs
    const playlist = useSelector(state => state.playlists[playlistId]);
    // const songs = playlist?.songs
    // let allsongs = []
    // if(songs?.length >= 1){
    //     for(let i=0; i<songs.length; i++){
    //     allsongs.push(songs[i][i])
    // }
    // }
    // if(songs){
    //     allsongs = Object.values(songs)
    // }
    
    
    // console.log("allsongs", allsongs)
    // let allsongs = playlist?.songs
// console.log("playlist before1", playlist)
// console.log("playlist before2", allsongs)
// console.log("playlist before2", allsongs)
// console.log("playlist map before", allsongs?.map(e=>e.title))
    // useEffect(() => {
    //     dispatch(fetchPlaylists());
    // }, [dispatch]);
    
    const handleDeleteSongFromPL = async(e, song) => {
        e.preventDefault();
console.log("what is song", song)
        return dispatch(deleteSongFromPL(song))
            // .then(console.log("playlist after1", playlist))
            // .then(console.log("playlist after2", allsongs))
            // .then(console.log("playlist.song.map after", allsongs?.map(e=>e.title))) 
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
                {playlist?.songs?.map((song) => (
                <div key={song.songId}>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <audio controls>
                        <source src={song.songUrl} type="audio/mp3"/>
                    </audio>
                    <button onClick={(e)=>handleDeleteSongFromPL(e, song)}>Remove song</button>
                </div>
                ))}
            </div>
        </div>
    )

}

export default SinglePlaylist