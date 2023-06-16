import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editSong } from "../../store/songs";

const EditSongPage = ({song}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} =  useModal();

    const [title, setTitle] = useState(song?.title);
    const [artist, setArtist] = useState(song?.artist);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        
    },[title, artist])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const editedSong = {
            ...song,
            title,
            artist
        }

        if (title==="") {
            errors.reviews = "Title is required";
        }
        if (artist==="") {
            errors.stars = "Artist is required";
        }
        setErrors(errors);

        return dispatch(editSong(editedSong))
            // .then(()=>history.push())
            .then(closeModal())
    }
   
    return(
        <div>
            <h1>Edit Song Details</h1>
            <form onSubmit={handleSubmit}> 
                {/* <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul> */}
                <label>Title
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label>Artist
                    <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    
    )
}
export default EditSongPage
