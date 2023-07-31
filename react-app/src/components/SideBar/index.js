import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { fetchPlaylists } from "../../store/playlists";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import CreatePlaylist from "./CreatePlaylist";
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const favPL = sessionUser?.favorite_playlists;
    const favAlbum = sessionUser?.favorite_albums;
    
    const rawPlaylists = useSelector((state) => state.playlists);
    const albums = useSelector((state) => state.albums);
    const playlists = Object.values(useSelector((state) => state.playlists));
    const reversedPlaylists = playlists.reverse();

    const [ displayType, setDisplayType ] = useState("Playlists");
    const [ displayAlbum, setDisplayAlbum ] = useState("no");

    let currentUserPlaylists = []
    for (let playlist of reversedPlaylists){
        if(playlist.userId === sessionUser?.id){
            currentUserPlaylists.push(playlist)
        }
    }
    let currentUserFavPlaylists = []
    if(favPL){
        for (let pl of favPL){
            currentUserFavPlaylists.push(rawPlaylists[pl])
        }
    }
    
    let currentUserFavAlbums = []
    if(favAlbum){
        for (let al of favAlbum){
            currentUserFavAlbums.push(albums[al])
        }
    }
    
    let displayed;
    if(displayAlbum === "ALBUM"){
        displayed = currentUserFavAlbums
    }else if(displayType === "Playlists"){
        displayed = currentUserFavPlaylists
    }else if(displayType === "PlaylistsByU"){
        displayed = currentUserPlaylists
    }
    
    const handlePLType = () => {
        setDisplayAlbum("no")
        if(displayType === "Playlists"){
            setDisplayType("PlaylistsByU")
        }else{
            setDisplayType("Playlists")
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
                <h3 onClick={handlePLType}>{displayType}</h3>
                <h3 onClick={()=>setDisplayAlbum("ALBUM")}>Albums</h3>
            </div>    
            ):(
            <div className="sidebar-title">
                <h3>Create your first playlist</h3>
            </div>  
            )}

            <div className="sidebar-playlists">
                <NavLink exact to={`/playlists/liked-songs`} className={displayType === "Playlists" && displayAlbum === "no" ? "":"hidden"}>
                    <div className="sidebar-single-playlist">
                        <img src="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/loved-songs.jpeg" alt="cover"/>
                        <div>
                            <h4>Liked Songs</h4>
                            <h5><i className="fa-solid fa-thumbtack fa-sm"></i> Playlist . {sessionUser.favorite_songs.length} {sessionUser.favorite_songs.length > 1 ? "songs":"song"}</h5>
                        </div>
                    </div>
                </NavLink>
                {displayed?.map((playlist) => (
                <NavLink exact to={`/${displayAlbum === "ALBUM" ? "albums":"playlists"}/${playlist?.id}`} key={playlist?.id} >
                    <div className="sidebar-single-playlist">
                        <img src={playlist?.coverImage} alt="cover"/>
                        <div>
                            <h4>{playlist?.title}</h4>
                            <h5>Playlist . {playlist?.username}</h5>
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