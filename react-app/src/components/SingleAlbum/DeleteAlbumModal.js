import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePlaylist } from "../../store/playlists";
import { editCurrentPlayer } from "../../store/player";
import { deleteAlbum } from "../../store/albums";

const DeleteAlbumModal = ({album}) => {
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
                        
        return dispatch(deleteAlbum(album.id))
            .then(closeModal())
            // .then(history.push('/albums'))
    }
  
    const handleSubmitno = async (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Delete Album?</h2>
            <h4>This will delete {album.title} permanently.</h4>
            <div>
                <button onClick={handleSubmitno} className="nobtn">Cancel</button>
                <button onClick={handleSubmityes} className="yesbtn">Delete</button>
            </div>
        </div>
    )
}

export default DeleteAlbumModal