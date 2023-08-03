import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { uploadAlbum } from "../../store/albums";


function UploadAlbumPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser){
        history.push("/")
    }

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [releasedYear, setReleasedYear] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [songUrlLoading, setSongUrlLoading] = useState("Loading");

    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title)
        formData.append("artist", artist)
        formData.append("releasedYear", releasedYear)
        formData.append("coverImage", coverImage)

        return dispatch(uploadAlbum(formData))
            .then(setSongUrlLoading("Loading ."))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . .")
            }, 500))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . .")
            }, 1000))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . .")
            }, 1500))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . . .")
            }, 2000))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . . . .")
            }, 2500))
            .then(setTimeout(() => {
                history.push('/uploads')
            }, 2700))
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
        if(!releasedYear){
            errors.releasedYear = "Must enter released year"
        }
        if (releasedYear > 2024 || releasedYear < 0 || isNaN(releasedYear) ){
            errors.releasedYear = "invalid released year"
        }
        setErrors(errors);
        // for (let key of formData.entries()) {
        //     console.log(key[0] + ' ----> ' + key[1])
        // }
        // setSongUrlLoading(true);
    },[title, artist, releasedYear])
    
    document.getElementsByClassName('bodyContainer')[0].style.background="linear-gradient(to bottom, rgb(33, 33, 33)85%, rgb(95, 95, 95)100%)"

    return (
        <div className="upload-song-page upload-album-page">
            <h1>Create Album</h1>
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
                <div>
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
                <h4>{errors.coverImage}</h4>
                <button type="submit" disabled={!!Object.values(errors).length}>Submit</button>
                {(songUrlLoading !== "Loading")&& <h3 id="loading">{songUrlLoading}</h3>}
            </form>
            <h5>By proceeding, you agree to give Song% access to the file you choose to upload. Please make sure you have the right to upload the file.</h5>
        </div>
  );
}

export default UploadAlbumPage;