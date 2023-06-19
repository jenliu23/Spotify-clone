import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../../store/playlists";
import { NavLink, useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import './SinglePlaylist.css'

const SinglePlaylist = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { playlistId } = useParams();
    const playlist = useSelector(state => state.playlists[playlistId]);

    return (
        <div className="single-playlist-container">
            <div className="single-playlist-container-info">
                <img src={playlist?.coverImage}/>
                <div>
                    <h4>Playlist</h4>
                    <h1>{playlist?.title}</h1>
                    <h5>{playlist?.username}</h5>
                </div>
                {sessionUser && playlist?.userId === sessionUser.id && (
                <section>
                    <OpenModalButton
                        buttonText="＋ Edit details"
                        modalComponent={<EditPlaylistModal playlist={playlist}/>}
                    />
                    <OpenModalButton
                        buttonText="－ Delete playlist"
                        modalComponent={<DeletePlaylistModal playlist={playlist}/>}
                    />
                </section>
                )}
            </div>
            <div className="single-playlist-container-songs">

            </div>
        </div>
    )

}

export default SinglePlaylist