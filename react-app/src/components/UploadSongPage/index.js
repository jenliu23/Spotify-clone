import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { uploadSong } from "../../store/songs";

function UploadSongPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [songUrlLoading, setSongUrlLoading] = useState(false);

    const [errors, setErrors] = useState({});
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title)
        formData.append("artist", artist)
        formData.append("songUrl", songUrl)
        // for (let key of formData.entries()) {
        //     console.log(key[0] + ' ----> ' + key[1])
        // }
        setSongUrlLoading(true);

        return dispatch(uploadSong(formData))
            .then(setSongUrlLoading(false))
            .then(history.push('/uploaded-songs'))
            // .catch(async (res) => {
            //     const errBackend = await res.json();
            //     return errBackend
            // })
    };

    return (
        <div>
            <h1>Upload Song</h1>
             <form onSubmit={handleSubmit} encType="multipart/form-data"> 
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
                <label>Choose file
                    <input
                    type="file"
                    accept=".mp3"
                    onChange={(e) => setSongUrl(e.target.files[0])}
                    required
                    />
                </label>
                <button type="submit">Submit</button>
                {(songUrlLoading)&& <p>Loading...</p>}
            </form>
        </div>
  );
}

export default UploadSongPage;