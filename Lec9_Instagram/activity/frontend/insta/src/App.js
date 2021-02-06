import React from "react";
import "./App.css";
import Feeds from "./Components/Feeds/Feeds";
import NavBar from "./Components/NavBar/NavBar";
import ProfileView from "./Components/ProfileView/ProfileView";
import Setting from "./Components/Setting/Setting";
import { BrowserRouter as Router , Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        
        <Route path="/" exact>
        <div className="home-view">
          <Feeds />
          <ProfileView />
        </div>
        </Route>

        <Route path = "/profile" exact>
          <Profile />
        </Route>

        <Route path ="/settings" exact>
          <Setting />
        </Route>

      </React.Fragment>
    </Router>
  );
}

export default App;
