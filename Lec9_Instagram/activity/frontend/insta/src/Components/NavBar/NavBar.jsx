import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <div className="nav logo">
            <img src="./logo.png" alt="" />
          </div>
        </Link>
        {this.props.isAuth ? (
          <React.Fragment>
            <div className="nav search-box">
              <input type="text" placeholder="Search" />
            </div>
            <div className="nav links">
              <Link to="/">
                <div className="home">Home</div>
              </Link>
              <Link to="/profile">
                <div className="profile">Profile</div>
              </Link>
              <Link to="/settings">
                <div className="profile">Settings</div>
              </Link>
              <Link to="/login">
                <div className="logout" onClick = {this.props.logout}>Logout</div>
              </Link>
            </div>
          </React.Fragment>
        ) : (
          <div className="nav links">
            <Link to="/login">
              <div className="login">Login</div>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
