import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { fetchSongs } from "../../store/songs";
import { fetchAlbums } from "../../store/albums";
import { editCurrentPlayer } from "../../store/player";
import { deleteSongFromAlbum } from "../../store/albums";

const DeleteSongInAlbumModal = ({song, album}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} =  useModal();

    const currentPlayer = useSelector((state) => state.player);
    const songlist_type = currentPlayer.songlist_type

    const handleSubmityes = async (e) => {
        e.preventDefault();

        if(songlist_type.slice(5) == album.id){
            dispatch(editCurrentPlayer("", [], {}, NaN, false, "delete playlist"))
        }
                        
        return dispatch(deleteSongFromAlbum(album.songs[song.id], album.id))
            .then(closeModal())
    }
  
    const handleSubmitno = async (e) => {
        e.preventDefault()
        closeModal()
    }

    useEffect(() => {
        dispatch(fetchSongs());
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="delete-modal">
            <h2>Remove Song from this Album?</h2>
            <h4>This will remove song: {song.title} from Album: {album.title}.</h4>
            <div>
                <button onClick={handleSubmitno} className="nobtn">Cancel</button>
                <button onClick={handleSubmityes} className="yesbtn">Remove</button>
            </div>
        </div>
    )
}

export default DeleteSongInAlbumModal