import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePlaylist } from "../../store/playlists";

const DeletePlaylistModal = ({playlist}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} =  useModal();

    const handleSubmityes = async (e) => {
        e.preventDefault();
        return dispatch(deletePlaylist(playlist.id))
            .then(closeModal())
            .then(history.push('/'))
    }
  
    const handleSubmitno = async (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Delete from Library?</h2>
            <h4>This will delete {playlist.title} from Your Library.</h4>
            <div>
                <button onClick={handleSubmitno} id="nobtn">Cancel</button>
                <button onClick={handleSubmityes} id="yesbtn">Delete</button>
            </div>
        </div>
    )
}

export default DeletePlaylistModal