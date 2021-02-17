import React, { Component } from 'react';
import "./App.css";
import Feeds from "./Components/Feeds/Feeds";
import NavBar from "./Components/NavBar/NavBar";
import ProfileView from "./Components/ProfileView/ProfileView";
import Setting from "./Components/Setting/Setting";
import { BrowserRouter as Router , Redirect, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login.jsx";
import axios from 'axios';


class App extends Component {
  state = { 
    isAuth : false ,
    uid : null
  }

  login = () =>{
    // this.setState({
    //   isAuth:true
    // })
    window.location = "/auth/google";
  }

  logout = () => {
    this.setState({
      isAuth : false ,
      uid:null
    })
  }

  // first time aaunga
  componentDidMount(){
    // check if already logged in !!!
    axios.get("/auth/checkAuth").then( res => {
      let isAuth = res.data.isAuth;
      let uid = res.data.user.uid;
      this.setState({
        isAuth , 
        uid
      })
    }).catch(err =>{
      console.log(err);
    })
  }
  
  render() { 
    return (
      <Router>
        <React.Fragment>
          <NavBar isAuth = {this.state.isAuth} logout = {this.logout}/>
  
          <Route path="/" exact>
          {this.state.isAuth ? <div className="home-view">
            <Feeds uid={this.state.uid} />
            <ProfileView uid={this.state.uid}/>
          </div> : <Redirect to="/login"/> }
          </Route>
  
          <Route path = "/profile" exact>
            {this.state.isAuth ? <Profile uid={this.state.uid}/> : <Redirect to="/login" /> }
          </Route>
  
          <Route path ="/settings" exact>
            {this.state.isAuth ? <Setting uid={this.state.uid} /> : <Redirect to="/login" /> }
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