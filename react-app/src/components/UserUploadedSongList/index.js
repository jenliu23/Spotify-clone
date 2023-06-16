import React, { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchSongs } from "../../store/songs";
import EditSongPage from "./EditSongPage";
import DeleteSongModal from "./DeleteSongModal";

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
        <div>
            <div>Uploaded Songs List</div>
            {userSongs?.map((song) => (
                <div key={song.id}>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <audio controls>
                        <source src={song.songUrl} type="audio/mp3"/>
                    </audio>
                    <OpenModalButton
                      buttonText="Edit Song Details"
                      modalComponent={<EditSongPage song={song}/>}
                    />
                    <OpenModalButton
                      buttonText="Delete Song"
                      modalComponent={<DeleteSongModal song={song}/>}
                    />
                    {/* <button onClick={handleUpdateSong}>Edit song</button> */}
                    {/* <ReactPlayer url={song.songUrl}/> */}
                </div>
            ))}
        </div>
    )
  }
  
  export default UserUploadedSongList