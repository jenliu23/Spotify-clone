import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPlaylists } from "../../store/playlists";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import CreatePlaylist from "./CreatePlaylist";
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const playlists = Object.values(useSelector((state) => state.playlists));
    const reversedPlaylists = playlists.reverse();

    let currentUserPlaylists = []
    for (let playlist of reversedPlaylists){
        if(playlist.userId === sessionUser?.id){
            currentUserPlaylists.push(playlist)
        }
    }

    useEffect(() => {
        dispatch(fetchPlaylists());
      }, [dispatch]);

    return (
        <div>
        {sessionUser? (
        <div className="sidebar">
            <div className="sidebar-library">
                <h3><i className="fa-solid fa-swatchbook"></i> Your Library</h3>
                <OpenModalButton
                    buttonText="＋ Create playlist"
                    modalComponent={<CreatePlaylist />}
                />
            </div>
            {currentUserPlaylists.length > 0 ? (
            <div className="sidebar-title">
                <h3>Playlists</h3>
                <h3>By you</h3>
            </div>    
            ):(
            <div className="sidebar-title">
                <h3>Create your first playlist</h3>
            </div>  
            )}
            
            <div className="sidebar-playlists">
                {currentUserPlaylists?.map((playlist) => (
                <NavLink exact to={`/playlists/${playlist.id}`} key={playlist.id} >
                <div className="sidebar-single-playlist">
                    <img src={playlist.coverImage} alt="cover"/>
                    <div>
                        <h4>{playlist.title}</h4>
                        <h5>Playlist . {playlist.username}</h5>
                    </div>
                </div>
                </NavLink>
                ))}
            </div>
        </div>
        ) : (
        <div className="sidebar">
            <div className="sidebar-library">
                <h3><i className="fa-solid fa-compact-disc"></i> Your Library</h3>
            </div>
            <div className="sidebar-fornologin">
                <h3>Create your first playlist</h3>
                <h4>It's easy, we'll help you</h4>
                <OpenModalButton
                    buttonText="Create playlist"
                    modalComponent={<LoginFormModal />}
                />
            </div>
        </div>
        )}
        </div>
    )
}

export default SideBar