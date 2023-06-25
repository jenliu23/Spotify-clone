import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSong } from "../../store/songs";

const DeleteSongModal = ({song}) => {
    const dispatch = useDispatch();
    const {closeModal} =  useModal();

    const handleSubmityes = async (e) => {
        e.preventDefault();
        return dispatch(deleteSong(song))
            .then(closeModal())
    }
  
    const handleSubmitno = async (e) => {
        e.preventDefault()
        closeModal()
    }
   
    return(
        <div className="delete-modal">
            <h2>Delete Song?</h2>
            <h4>This will permanently remove your uploaded song:</h4>
            <h4> {song.title} from Song%.</h4>
            <div>
                <button onClick={handleSubmitno} className="nobtn">Cancel </button>
                <button onClick={handleSubmityes} className="yesbtn">Delete </button>
            </div>
        </div>
    )
}
export default DeleteSongModal
