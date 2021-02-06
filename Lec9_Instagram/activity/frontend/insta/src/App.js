import React from "react";
import "./App.css";
import Feeds from "./Components/Feeds/Feeds";
import NavBar from "./Components/NavBar/NavBar";
import ProfileView from "./Components/ProfileView/ProfileView";
import Setting from "./Components/Setting/Setting";
import { BrowserRouter as Router , Route } from "react-router-dom";
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
          <h1>Profile page</h1>
        </Route>

        <Route path ="/settings" exact>
          <Setting />
        </Route>

      </React.Fragment>
    </Router>
  );
}

export default App;
