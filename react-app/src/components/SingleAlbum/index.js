import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AudioPlayer from "../AudioPlayer";
import { fetchAlbums } from "../../store/albums";
import EditAlbumModal from "./EditAlbumModal";
import DeleteAlbumModal from "./DeleteAlbumModal";
import FavoriteIcon from "../FavoriteIcon";
import { editCurrentPlayer } from "../../store/player";
import AddSongToPLModal from "../AllSongsPage/AddSongToPLModal";
import LoginFormModal from "../LoginFormModal";
import "./SingleAlbum.css"

const SingleAlbum = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { albumId } = useParams();
    const album = useSelector(state=>state.albums[albumId]);

    let songs
    if(album && album.songs){
        songs = Object.values(album.songs);
    }
    const currentPlayer = useSelector((state) => state.player);
    const current_song = currentPlayer.current_song
    const isPlaying = currentPlayer.isPlaying
    const index = currentPlayer.index
    const songlist_type = "ALBUM" + albumId;

    const playOrPausePL = () => {
        if(isPlaying){
            if(currentPlayer.songlist_type === songlist_type){
                let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, false, "stop"))
            }else{
                if(songs.length > 0){
                    if(current_song.songId === songs[0].songId){
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, true, "start new playlist on same song")) 
                    }else{
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[0], 0, true, "start new playlist"))
                    }
                }
            }
        }else{
            if(currentPlayer.songlist_type === songlist_type){
                let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, true, "recover current song"))
            }else{
                if(songs.length > 0){
                    if(current_song.songId === songs[0].songId){
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, true, "start new playlist on same song")) 
                    }else{
                        let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[0], 0, true, "start new playlist"))
                    }
                }
            }
        }
    }

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    
    document.getElementsByClassName('bodyContainer')[0].style.background="linear-gradient(to top, rgb(33, 33, 33)75%, rgb(4, 37, 6)100%)"

    return (
        <div className="single-playlist-container">
            <div className="single-playlist-container-info">
                <div>
                    <img src={album?.coverImage} alt="cover"/>
                    <ul>
                        <h3>Album</h3>
                        <h1>{album?.title}</h1>
                        <h4>{album?.artist} · {album?.releasedYear} · {songs?.length} {songs?.length > 1 ? "songs":"song"}</h4>
                    </ul>
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
            <div className="playlist-buttons">
                <div className="play-button">
                    <button onClick={playOrPausePL}>
                    {isPlaying && currentPlayer.songlist_type === songlist_type ? (
                    <i className="fa-solid fa-circle-pause fa-lg"></i>
                    ):(
                    <i className="fa-solid fa-circle-play fa-lg"></i>
                    )}      
                    </button>
                </div>
                <div className="favIcon">
                    <FavoriteIcon 
                        sessionUser={sessionUser} 
                        listId={parseInt(albumId)} 
                        favType={"favorite_albums"}
                    />
                </div>
            </div>
            
            <div className="album-song-list-scroll">
                <div className="album-song-list-intro">
                    <h4><i className="fa-solid fa-headphones fa-sm"></i></h4>
                    <h4>Title</h4>
                    <h4></h4>
                    <h3>＋</h3>
                </div>
                <div className="song-list-details playlist-song-list-details album-song-list-details">
                    {songs?.map((song, index) => (
                    <div key={song.songId} className="album-song-list-each">
                        <AudioPlayer song={song} songs={songs} index={index} songlist_type={songlist_type} />
                        <section>
                            <h4>{song.title}</h4>
                            <h5>{song.artist}</h5>
                        </section>
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
        </div>
    )
}

export default SingleAlbum