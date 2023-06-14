import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomeLogo from "./components/HomeLogo";
import Playlists from "./components/Playlists";

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
          {isLoaded && (
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
          )}
        </div>
        <div className="bodyContainer">
            <div>

            </div>
            <div>
              
            </div>
        </div>

      </div>
      

    </div>
  );
}

export default App;
