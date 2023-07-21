import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomeBar from "./components/HomeBar";
import SideBar from "./components/SideBar";
import UploadSongPage from "./components/UploadSongPage";
import HomePage from "./components/HomePage";
import AlbumsPage from "./components/AlbumsPage";
import SingleAlbum from "./components/SingleAlbum";
import UploadAlbumPage from "./components/UploadAlbumPage";
import AllSongsPage from "./components/AllSongsPage";
import UserUploadedList from "./components/UserUploadedList";
import SinglePlaylist from "./components/SinglePlaylist";
import AudioBar from "./components/AudioBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="mainContainer">
        <div className="leftContainer">
          <div className="headerContainer">
            <HomeBar />
          </div>
          <div className="barContainer">
            <SideBar />
          </div>
        </div>
      
        <div className="rightContainer">
          <div className="bodyContainer">
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
            <Switch>
              <Route exact path = "/" >
                <HomePage />
              </Route>
              <Route exact path = "/albums" >
                <AlbumsPage />
              </Route>
              <Route exact path = "/albums/new">
                <UploadAlbumPage />
              </Route>
              <Route exact path = "/albums/:albumId" >
                <SingleAlbum />
              </Route>
              <Route exact path = "/songs" >
                <AllSongsPage />
              </Route>
              <Route exact path = "/songs/new" >
                <UploadSongPage />
              </Route>
              <Route exact path = "/playlists/:playlistId" >
                <SinglePlaylist />
              </Route>
              <Route exact path = "/uploaded-songs" >
                <UserUploadedList />
              </Route>
              <Route>
                <h1>Page Not Found</h1>
              </Route>
            </Switch>
            )}
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <AudioBar />
      </div>
    </>
  );
}

export default App;
