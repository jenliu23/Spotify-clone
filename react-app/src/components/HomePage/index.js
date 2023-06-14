import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs } from "../../store/songs";
import SongList from "../SongList"
import "./HomePage.css"


const HomePage = () => {
    const dispatch = useDispatch();
    const songs = Object.values(useSelector((state) => state.songs));
console.log("songs in homepage:", songs)
    useEffect(() => {
      dispatch(fetchSongs());
    }, [dispatch]);
  
    return (
        <div>
            <SongList songs={songs}/>
        </div>
    )
  }
  
  export default HomePage