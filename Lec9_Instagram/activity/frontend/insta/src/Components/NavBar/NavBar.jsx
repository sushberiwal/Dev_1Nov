import React, { Component } from 'react';
import "./NavBar.css";

class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <div className="navbar">
                <div className="nav logo">
                    <img src="./logo.png" alt=""/>
                </div>
                <div className="nav search-box">
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="nav links">
                    <div className="home">Home</div>
                    <div className="profile">Profile</div>
                </div>
            </div>
          );
    }
}
 
export default NavBar;