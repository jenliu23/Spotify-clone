import React, { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchSongs } from "../../store/songs";
import EditSongPage from "./EditSongPage";
import DeleteSongModal from "./DeleteSongModal";
import './UserUploadedSongList.css'

const UserUploadedSongList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    
    if(!sessionUser){
        history.push("/")
    }

    const songs = Object.values(useSelector((state) => state.songs));

    let userSongs = []
    if(songs.length > 0) {
        for (let song of songs) {
            if (song.userId === sessionUser?.id){
                userSongs.push(song)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);
  
    return (
        <div className="uploaded-song-list">
            <h2>Uploaded Songs List :</h2>
            <div className="uploaded-song-list-intro">
                <h4>#</h4>
                <h4>Title</h4>
                <h4>Artist</h4>
                <h4>Album</h4>
                <h4>Date added</h4>
                <button><i className="fa-solid fa-pencil fa-lg"></i></button>
                <button><i className="fa-solid fa-trash-can fa-lg"></i></button>
            </div>
            <div className="uploaded-song-list-details">
            {userSongs?.map((song, index) => (
            <div key={song.id}  className="uploaded-song-list-each">
                <h4>{index+1}</h4>
                <h4>{song.title}</h4>
                <h4>{song.artist}</h4>
                <h4>--</h4>
                <h4>{song.createdAt.slice(4, 16)}</h4>
                {/* <audio controls>
                    <source src={song.songUrl} type="audio/mp3"/>
                </audio> */}
                <OpenModalButton
                    buttonText="Edit"
                    modalComponent={<EditSongPage song={song}/>}
                    />
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteSongModal song={song}/>}
                    />
                {/* <button onClick={handleUpdateSong}>Edit song</button> */}
                {/* <ReactPlayer url={song.songUrl}/> */}
            </div>
            ))}
            </div>
        </div>
    )
  }
  
  export default UserUploadedSongList