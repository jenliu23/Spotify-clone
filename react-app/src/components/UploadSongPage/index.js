import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { uploadSong } from "../../store/songs";
import './UploadSongPage.css'

function UploadSongPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser){
        history.push("/")
    }

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [songUrlLoading, setSongUrlLoading] = useState("Loading");

    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title)
        formData.append("artist", artist)
        formData.append("songUrl", songUrl)

        return dispatch(uploadSong(formData))
            .then(setSongUrlLoading("Loading ."))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . .")
            }, 600))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . .")
            }, 1200))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . .")
            }, 1800))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . . .")
            }, 2400))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . . . .")
            }, 3000))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading .")
            }, 3600))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . .")
            }, 4200))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . .")
            }, 4800))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . .")
            }, 5400))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . . .")
            }, 6000))
            .then(setTimeout(() => {
                setSongUrlLoading("Loading . . . . . .")
            }, 6600))
            .then(setTimeout(() => {
                history.push('/uploaded-songs')
            }, 7500))
    };

    useEffect(() => {
        const errors = {};
        if(title.trim().length === 0){
            errors.title = "Must enter title"
        }
        if (title?.length > 30){
            errors.title = "less than 30 characters"
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
    
    return (
        <div className="upload-song-page">
            <h1>Upload Song</h1>
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
                    <h3>Choose file</h3>
                    <h4 className="errors">* {errors.songUrl}</h4>
                </div>
                <label className="fileinput">
                    <input
                    type="file"
                    accept=".mp3"
                    onChange={(e) => setSongUrl(e.target.files[0])}
                    required
                    />
                </label>
                <h4>{errors.songUrl}</h4>
                <button type="submit" disabled={!!Object.values(errors).length}>Submit</button>
                {(songUrlLoading !== "Loading")&& <h3 id="loading">{songUrlLoading}</h3>}
            </form>
            <h5>By proceeding, you agree to give Song% access to the file you choose to upload. Please make sure you have the right to upload the file.</h5>
        </div>
  );
}

export default UploadSongPage;