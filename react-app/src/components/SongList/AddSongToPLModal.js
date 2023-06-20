import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addSongToPL } from "../../store/playlists";

function AddSongToPLModal({song}) {
    const dispatch = useDispatch();
    const history = useHistory();
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

    // useEffect(() => {
        
    // },[value])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("value:", value);

        return dispatch(addSongToPL(song, value))
            .then(closeModal())
    };

    return (
        <div className="create-playlist">
            <h2>Add to playlist</h2>
            <div className="create-playlist-info">
                <div>{error}</div>
                {/* {currentUserPlaylists.length > 0} */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Choose a playlist
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
            </div>
        </div>
  );
}

export default AddSongToPLModal;