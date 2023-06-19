import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../../store/playlists";
import { NavLink } from "react-router-dom";
import "./HomePage.css"


const HomePage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currentDate = new Date()
    const currentTime = currentDate.getHours()
// console.log("time:", currentTime)
    let greeting;
    if(currentTime >= 6 && currentTime < 12){
        greeting = "Good morning"
    }else if (currentTime >= 12 && currentTime < 18){
        greeting = "Good afternoon"
    }else if (currentTime >= 18 && currentTime < 21){
        greeting = "Good evening"
    }else {
        greeting = "Good night"
    }

    const playlists = Object.values(useSelector((state) => state.playlists));

    useEffect(() => {
      dispatch(fetchPlaylists());
    }, [dispatch]);
  
    return (
        <div className="home-page">
            <div className="home-page-title">
                <h2>{greeting}{sessionUser? ", ":""}{sessionUser?.username}</h2>
                <h3>Hear what's trending in Song%...</h3>
            </div>
           
            <div className="playlists">
                {playlists?.map((playlist) => (
                <div key={playlist.id} className="single-playlist">
                    <NavLink exact to={`/playlists/${playlist.id}`}>
                    <img src={playlist.coverImage} />
                    <h4>{playlist.title}</h4>
                    <h4>by {playlist.username}</h4>
                    </NavLink>
                </div>
                ))}
            </div>
        </div>
    )
  }
  
  export default HomePage