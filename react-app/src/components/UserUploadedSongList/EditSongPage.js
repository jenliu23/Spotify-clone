import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
        const errors = {};
        if (title && title.length > 50){
            errors.title = "less than 50 characters"
        }
        if (artist && artist.length > 20){
            errors.artist = "less than 20 characters"
        }
        setErrors(errors);
    },[title, artist])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const editedSong = {
            ...song,
            title,
            artist
        }

        // if (title==="") {
        //     errors.reviews = "Title is required";
        // }
        // if (artist==="") {
        //     errors.stars = "Artist is required";
        // }
        // setErrors(errors);

        return dispatch(editSong(editedSong))
            // .then(()=>history.push())
            .then(closeModal())
    }
   
    return(
        <div  className="create-playlist">
            <h1>Edit Song Details</h1>
            <form onSubmit={handleSubmit}> 
                {/* <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul> */}
                <div>
                    <h3>Title</h3>
                    <h4 className="errors">* {errors.title}</h4>
                </div>
                <label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <div>
                    <h3>Artist</h3>
                    <h4 className="errors">* {errors.artist}</h4>
                </div>
                <label>
                    <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                    />
                </label>
                <button type="submit" disabled={!!Object.values(errors).length}>Submit</button>
            </form>
        </div>
    
    )
}
export default EditSongPage
