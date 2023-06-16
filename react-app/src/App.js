import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomeBar from "./components/HomeBar";
import Playlists from "./components/SideBar";
import UploadSongPage from "./components/UploadSongPage";
import HomePage from "./components/PageHome";
import SongPage from "./components/PageSong";
import UserUploadedSongList from "./components/UserUploadedSongList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="mainContainer">
      <div className="leftContainer">
        <div className="headerContainer">
          <HomeBar />
        </div>
        <div className="barContainer">
          <Playlists />
        </div>
      </div>
      
      <div className="rightContainer">
        <div className="navContainer">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div className="bodyContainer">
          {isLoaded && (
          <Switch>
            <Route exact path = "/" >
              <HomePage />
            </Route>
            <Route exact path = "/songs" >
              <SongPage />
            </Route>
            <Route exact path = "/songs/new" >
              <UploadSongPage />
            </Route>
            <Route exact path = "/uploaded-songs" >
              <UserUploadedSongList />
            </Route>
            <Route>
              <h1>Page Not Found</h1>
            </Route>
          </Switch>
          )}
        </div>

      </div>
      

    </div>
  );
}

export default App;
