import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSong } from "../../store/songs";

const DeleteSongModal = ({song}) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        <div>
            <h1>Delete Song</h1>
            <h4>Are you sure you want to delete this song?</h4>
            <button onClick={handleSubmityes}>Yes </button>
            <button onClick={handleSubmitno}>No </button>
        </div>
    )
}
export default DeleteSongModal
