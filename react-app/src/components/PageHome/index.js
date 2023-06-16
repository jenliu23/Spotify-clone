import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs } from "../../store/songs";
import "./HomePage.css"


const HomePage = () => {
    const dispatch = useDispatch();
    // const songs = Object.values(useSelector((state) => state.songs));

    // useEffect(() => {
    //   dispatch(fetchSongs());
    // }, [dispatch]);
  
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
  }
  
  export default HomePage