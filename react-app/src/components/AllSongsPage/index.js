import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs } from "../../store/songs";
import { fetchAlbums } from "../../store/albums";
import SongList from "../SongList";


const AllSongsPage = () => {
    const dispatch = useDispatch();
    const songs = Object.values(useSelector((state) => state.songs));

    useEffect(() => {
      dispatch(fetchSongs());
      dispatch(fetchAlbums())
    }, [dispatch]);
  
    return (
        <div>
            <SongList songs={songs} />
        </div>
    )
  }
  
  export default AllSongsPage