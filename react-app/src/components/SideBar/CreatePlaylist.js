import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addPlaylist } from "../../store/playlists";
import './SideBar.css'

function CreatePlaylist() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_default.png");

    const [errors, setErrors] = useState({});

    const coverImage = () => {
        const imgUrl = document.getElementById("coverImage").value;
        setValue(imgUrl)
        console.log("value:", value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let playlist = {
            userId: sessionUser.id,
            title,
            coverImage: value
        }

        return dispatch(addPlaylist(playlist))
            .then(closeModal())
    };

    return (
        <div className="create-playlist">
            <h2>Create Playlist</h2>
            <div className="create-playlist-info">
                <img src={value} alt="Cover Image"/>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            />
                        </label>
                        <label>Choose a theme
                            <select 
                            id="coverImage"
                            onChange={coverImage}
                            >
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_default.png">
                                --default--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_smile.jpg">
                                --smile--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_balloon.jpg">
                                --balloon
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_sleep.jpg">
                                --sleep--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_spring.jpg">
                                --spring--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_workout.jpg">
                                --workout--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_cry-a-little.jpeg">
                                --cry a little--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_rose-smoke.jpg">
                                --rose smoke--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_pink-or-blue.jpg">
                                --pink or blue--
                            </option>
                            <option value="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_universe-and-planets.jpg">
                                --universe & planets
                            </option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
  );
}

export default CreatePlaylist;