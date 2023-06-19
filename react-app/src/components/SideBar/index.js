import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../../store/playlists";
import OpenModalButton from "../OpenModalButton";
import CreatePlaylist from "./CreatePlaylist";
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const playlists = Object.values(useSelector((state) => state.playlists));
    
    
    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    return (
        <div className="sidebar">
            <div className="sidebar-library">
                <h3><i className="fa-solid fa-compact-disc"></i> Your Library</h3>
                <OpenModalButton
                    buttonText="＋ Create playlist"
                    modalComponent={<CreatePlaylist />}
                />
                {/* <button>
                    <i className="fa-solid fa-plus fa-xl"></i>
                </button> */}
            </div>

            <div className="sidebar-title">
                <h3>Playlists</h3>
                <h3>By you</h3>
            </div>
            
            <div className="sidebar-playlists">
                {playlists?.map((playlist) => (
                <div key={playlist.id} className="sidebar-single-playlist">
                    <img src={playlist.coverImage} />
                    <div>
                        <h4>{playlist.title}</h4>
                        <h5>Playlist . {playlist.username}</h5>
                    </div>
                </div>
                ))}
            </div>
            
        </div>
    )
}

export default SideBar