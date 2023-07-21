import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSongToPL } from "../../store/playlists";
import OpenModalButton from "../OpenModalButton";
import CreatePlaylist from "../SideBar/CreatePlaylist";
import { editCurrentPlayer } from "../../store/player";
import { fetchPlaylists } from "../../store/playlists";

function AddSongToPLModal({song}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const playlists = Object.values(useSelector((state) => state.playlists));
    const currentPlayer = useSelector((state) => state.player);

    const songlist_type = currentPlayer.songlist_type
    const songs = currentPlayer.current_songlist
    const current_song = currentPlayer.current_song
    const index = currentPlayer.index
    const isPlaying = currentPlayer.isPlaying
    const change = currentPlayer.change

    let currentUserPlaylists = []
    for (let playlist of playlists){
        if(playlist.userId === sessionUser?.id){
            currentUserPlaylists.push(playlist)
        }
    }
    let error;
    if(currentUserPlaylists.length === 0) {
        error = "Please create a playlist first"
    }

    const [value, setValue] = useState(currentUserPlaylists[0]?.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(addSongToPL(song, value))
        closeModal()

        if(songlist_type && parseInt(songlist_type.slice(8)) === value){
            let newSongs;
            if(songs[songs.length-1].songId < song.songId){
                newSongs = songs
                newSongs.push(song)
                return dispatch(editCurrentPlayer(songlist_type, newSongs, current_song, index, isPlaying, "none"))
            }else if(songs[0].songId > song.songId){
                newSongs = songs
                newSongs.unshift(song)
                return dispatch(editCurrentPlayer(songlist_type, newSongs, current_song, index+1, isPlaying, "none"))
            }else{
                for(let i=0; i<songs.length; i++){
                    if(songs[i].songId > song.songId){
                        newSongs = [...songs.slice(0, i), song, ...songs.slice(i)]
                        let newIndex;
                        if(index >= i-1){
                            newIndex = index + 1
                        }else{
                            newIndex = index
                        }
                        return dispatch(editCurrentPlayer(songlist_type, newSongs, current_song, newIndex, isPlaying, "none"))
                    }
                }
            } 
        }
    };

    return (
        <div className="create-playlist add-song-to-playlist">
            <h2>Add:  {song.title} to playlist</h2>
            <div className="create-playlist-info">
                {currentUserPlaylists.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Choose a playlist</h3>
                        <label>
                            <select id="pl" 
                                    onChange={(e)=>setValue(document.getElementById("pl").value)}>
                                {currentUserPlaylists?.map((pl)=>(
                                <option value={pl.id} key={pl.id}>
                                    {pl.title}
                                </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>    
                ) : (
                <div className="add-to-song-create-playlist">
                    <h3>Please create a playlist first</h3>
                    <OpenModalButton
                    buttonText="＋ Create playlist"
                    modalComponent={<CreatePlaylist />}
                    />
                </div>
                )}
                
            </div>
        </div>
  );
}

export default AddSongToPLModal;