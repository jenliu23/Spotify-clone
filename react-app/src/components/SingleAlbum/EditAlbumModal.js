import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editAlbum
 } from "../../store/albums";
const EditAlbumModal = ({album}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser){
        history.push("/")
    }

    const [title, setTitle] = useState(album.title);
    const [artist, setArtist] = useState(album.artist);
    const [releasedYear, setReleasedYear] = useState(album.releasedYear);
    const [coverImage, setCoverImage] = useState(album.coverImage);
    const [songUrlLoading, setSongUrlLoading] = useState("Loading");

    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newalbum = {
            ...album,
            title,
            artist,
            releasedYear,
            // coverImage
        }

        return dispatch(editAlbum(newalbum))
            .then(closeModal())

    };

    useEffect(() => {
        const errors = {};
        if(title.trim().length === 0){
            errors.title = "Must enter title"
        }
        if (title?.length > 50){
            errors.title = "less than 50 characters"
        }
        if(artist.trim().length === 0){
            errors.artist = "Must enter artist"
        }
        if (artist?.length > 20){
            errors.artist = "less than 20 characters"
        }
        setErrors(errors);
        // for (let key of formData.entries()) {
        //     console.log(key[0] + ' ----> ' + key[1])
        // }
        // setSongUrlLoading(true);
    },[title, artist])

    return(
        <div className="create-playlist edit-song-details">
            <h1>Edit Album</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data"> 
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
                <div>
                    <h3>Released Year</h3>
                    <h4 className="errors">* {errors.releasedYear}</h4>
                </div>
                <label>
                    <input
                    type="number"
                    value={releasedYear}
                    onChange={(e) => setReleasedYear(e.target.value)}
                    required
                    />
                </label>
                {/* <div>
                    <h3>Choose file</h3>
                    <h4 className="errors">* {errors.songUrl}</h4>
                </div>
                <label className="fileinput">
                    <input
                    type="file"
                    accept=".jpg, .jpeg, .webp, .png"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    required
                    />
                </label>
                <h4>{errors.coverImage}</h4> */}
                <button type="submit" disabled={!!Object.values(errors).length}>Submit</button>
                {/* {(songUrlLoading !== "Loading")&& <h3 id="loading">{songUrlLoading}</h3>} */}
            </form>
        </div>
    )
}

export default EditAlbumModal