import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AudioPlayer from "../AudioPlayer";
import { fetchAlbums } from "../../store/albums";
import EditAlbumModal from "./EditAlbumModal";
import DeleteAlbumModal from "./DeleteAlbumModal";

const SingleAlbum = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { albumId } = useParams();
    const album = useSelector(state=>state.albums[albumId]);

    let songs
    if(album && album.songs){
        songs = Object.values(album.songs);
    }
    const songlist_type = "ALBUM" + albumId;

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="single-playlist-container">
            <div className="single-playlist-container-info">
                <img src={album?.coverImage} alt="cover"/>
                <div>
                    <h4>Album</h4>
                    <h1>{album?.title}</h1>
                    <h5>{album?.artist} · {album?.releasedYear} · {songs?.length} songs</h5>
                </div>
                {sessionUser && album?.userId === sessionUser.id && (
                <section>
                    <OpenModalButton
                        buttonText="＋ Edit details"
                        modalComponent={<EditAlbumModal album={album}/>}
                    />
                    <OpenModalButton
                        buttonText="－ Delete album"
                        modalComponent={<DeleteAlbumModal album={album}/>}
                    />
                </section>
                )}
            </div>
            {/* <div className="playlist-button">
                <button onClick={playOrPausePL}>
                {isPlaying && currentPlayer.songlist_type === songlist_type ? (
                    <i className="fa-regular fa-circle-pause fa-lg"></i>
                ):(
                    <i className="fa-regular fa-circle-play fa-lg"></i>
                )}      
                </button>
            </div> */}
            {/* <div className="song-list-intro playlist-song-list-intro">
                <h5><i className="fa-solid fa-headphones"></i></h5>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4> */}
                {/* <button><i className="fa-regular fa-clock fa-lg"></i></button> */}
                {/* <h3 className={sessionUser?.id === playlist?.userId ? "":"hidden"}>－</h3> */}
            {/* </div> */}
            <div className="song-list-details playlist-song-list-details">
            {songs?.map((song, index) => (
                <div key={song.songId} className="song-list-each">
                    <AudioPlayer song={song} songs={songs} index={index} songlist_type={songlist_type} />
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <h4>--</h4>
                    {/* <button onClick={(e) => handleDeleteSongFromPL(song, index)} className={sessionUser?.id === playlist?.userId ? "":"hidden"}>
                        Remove song
                    </button> */}
                </div>
                ))}
            </div>
        </div>
    )
}

export default SingleAlbum