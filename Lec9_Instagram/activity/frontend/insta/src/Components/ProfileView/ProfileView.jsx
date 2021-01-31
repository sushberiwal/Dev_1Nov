import React, { Component } from 'react';
import "./ProfileView.css"

class ProfileView extends Component {
    state = { 
        user : {username:"steverogers" , fullname:"Steve Rogers" , userImage : "default.png"} ,
        suggestions : [ {suggestionImage : "post.png" , suggestionName:"Tony Stark"} ,{suggestionImage : "post.png" , suggestionName:"Steve Rogers"}   ]
     }
    render() { 
        return ( 
            <div className="profile-view">
                <div className="user">
                    <div className="user-image">
                        <img src={this.state.user.userImage} alt=""/>
                    </div>
                    <div className="user-detail">
                        <div className="username">{this.state.user.username}</div>
                        <div className="fullname">{this.state.user.fullname}</div>
                    </div>
                </div>
                <div className="suggestions">
                    {this.state.suggestions.map( suggestion =>{
                        return (<div className="suggestion-user">
                        <div className="suggestion-user-image">
                            <img src={suggestion.suggestionImage} alt=""/>
                        </div>
                        <div className="suggestion-user-name">{suggestion.suggestionName}</div>
                        <button className="suggestion-user-follow">Follow</button>
                    </div>)
                    })}
                </div>
            </div>
         );
    }
}
 
export default ProfileView;