import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editSong } from "../../store/songs";
import { editCurrentPlayer } from "../../store/player";
import { addSongToAlbum } from "../../store/albums";

const AddSongToAlbumModal = ({song, albums}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} =  useModal();

    const currentPlayer = useSelector((state) => state.player);
    const songlist_type = currentPlayer.songlist_type

    const [value, setValue] = useState(albums[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(songlist_type.slice(5) == value.id){
            dispatch(editCurrentPlayer("", [], {}, NaN, false, "delete playlist"))
        }
                        
        return dispatch(addSongToAlbum(song.songId, value.id))
            .then(closeModal())
    }
   
    return(
        <div className="create-playlist add-song-to-playlist">
            <h2>Add:  {song.title} to album</h2>
            <div className="create-playlist-info">
                {albums.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Choose an album</h3>
                        <label>
                            <select id="pl" 
                                onChange={(e)=>setValue(document.getElementById("pl").value)}>
                                {albums?.map((pl)=>(
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
                    <h3>Please create an album first</h3>
                    {/* <OpenModalButton
                    buttonText="＋ Create playlist"
                    modalComponent={<CreatePlaylist />}
                    /> */}
                </div>
                )}
            </div>
        </div>
    )
}
export default AddSongToAlbumModal