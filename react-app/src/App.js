import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomeLogo from "./components/HomeLogo";
import Playlists from "./components/Playlists";
import HomePage from "./components/HomePage";

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
          <HomeLogo />
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
            <Route exact path="/" >
              <HomePage />
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
