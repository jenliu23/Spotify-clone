import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSongToPL } from "../../store/playlists";
import OpenModalButton from "../OpenModalButton";
import CreatePlaylist from "../SideBar/CreatePlaylist";

function AddSongToPLModal({song}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const playlists = Object.values(useSelector((state) => state.playlists));

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
        console.log("value:", value);

        return dispatch(addSongToPL(song, value))
            .then(closeModal())
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