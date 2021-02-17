import React, { Component } from 'react';
import "./App.css";
import Feeds from "./Components/Feeds/Feeds";
import NavBar from "./Components/NavBar/NavBar";
import ProfileView from "./Components/ProfileView/ProfileView";
import Setting from "./Components/Setting/Setting";
import { BrowserRouter as Router , Redirect, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login.jsx";


class App extends Component {
  state = { 
    isAuth : true
  }

  login = () =>{
    this.setState({
      isAuth:true
    })
  }

  logout = () => {
    this.setState({
      isAuth : false
    })
  }
  
  render() { 
    return (
      <Router>
        <React.Fragment>
          <NavBar isAuth = {this.state.isAuth} logout = {this.logout}/>
  
          <Route path="/" exact>
          {this.state.isAuth ? <div className="home-view">
            <Feeds />
            <ProfileView />
          </div> : <Redirect to="/login"/> }
          </Route>
  
          <Route path = "/profile" exact>
            {this.state.isAuth ? <Profile /> : <Redirect to="/login" /> }
          </Route>
  
          <Route path ="/settings" exact>
            {this.state.isAuth ? <Setting /> : <Redirect to="/login" /> }
          </Route>


          <Route path="/login" exact>
            {this.state.isAuth ? <Redirect to="/" /> : <Login login={this.login} /> }
          </Route>

        </React.Fragment>
      </Router>
    );
  }
}
 
export default App;