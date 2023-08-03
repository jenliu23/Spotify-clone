import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import AddSongToPLModal from "../AllSongsPage/AddSongToPLModal"
import LoginFormModal from "../LoginFormModal";
import AudioPlayer from "../AudioPlayer";
import { fetchSongs } from "../../store/songs";
import { fetchAlbums } from "../../store/albums";
import FavoriteIcon from "../FavoriteIcon";
import './SongList.css'


const AllSongsPage = () => {
    const dispatch = useDispatch();
    const songs = Object.values(useSelector((state) => state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albums);
    const songlist_type = "ALL SONGS"

    useEffect(() => {
        dispatch(fetchSongs());
        dispatch(fetchAlbums())
    }, [dispatch]);

    document.getElementsByClassName('bodyContainer')[0].style.background="linear-gradient(to bottom, rgb(33, 33, 33)75%, rgb(95, 95, 95)100%)"
    return (
        <div className="song-list">
            <h3>Song-percent list:</h3>

            <div className="song-list-intro">
                <h5><i className="fa-solid fa-headphones"></i></h5>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                <h4></h4>
                {/* <button><i className="fa-regular fa-clock fa-lg"></i></button> */}
                <h3 className="green-info">＋</h3>
            </div>
            <div className="song-list-details">
            {songs?.map((song, index) => (
                <div key={song.id} className="song-list-each">
                    <AudioPlayer song={song} songs={songs} index={index} songlist_type={songlist_type}/>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    {song.albumId.length > 0 ? (
                        <NavLink exact to = {`/albums/${song.albumId[0]}`}>
                        <div className="album-info">
                            <img src={albums[song.albumId[0]]?.coverImage} alt="coverImage" width={22} height={22}/>
                            <h4 className="album-hover">{albums[song.albumId[0]]?.title}</h4>
                        </div>
                        </NavLink> 
                    ):(
                        <h4>--</h4>
                    )
                    }
                    <div className="favIcon-songlist">
                        <FavoriteIcon                         
                            sessionUser={sessionUser} 
                            listId={song.songId} 
                            favType={"favorite_songs"}
                        />
                    </div>
                    {sessionUser? (
                    <div className="add-to-playlist-btn green-info">
                        <OpenModalButton
                        buttonText="＋ Add to playlist"
                        modalComponent={<AddSongToPLModal song={song}/>}
                        />
                    </div>
                    ) : (
                    <div className="add-to-playlist-btn green-info">
                        <OpenModalButton
                        buttonText="＋ Add to playlist"
                        modalComponent={<LoginFormModal />}
                        />
                    </div>
                    )}
                </div>
            ))}
            </div>
            </div>

    )
}

export default AllSongsPage
