import React, { Component } from 'react';
import "./ProfileView.css"
import axios from "axios";
import { uid } from '../../auth';

class ProfileView extends Component {
    //local state()
    state = { 
        user : {username:"" , name:"" , pimage : ""} ,
        suggestions : []
     }


     componentDidMount(){   
        // bio: "I am black widow"
        // email: "thenat@gmail.com"
        // isPublic: 0
        // name: "NATASHA ROMANOFF"
        // pimage: "default.png"
        // pw: "123456789"
        // uid: "0174eac2-c136-40be-8a0b-038aeb40cd64"
        // username: "blackwidow"
        
        let user;
        axios.get(`/api/user/${uid}`).then( obj =>{
             console.log(obj);
             user = obj.data.data[0];
         })
         .then( () =>{
             return axios.get(`/api/request/suggestions/${uid}`);
         })
         .then( obj =>{
             let suggestions = obj.data.suggestions;
             this.setState({
                 user , 
                 suggestions
             })
         })
     }

    render() { 
        return ( 
            <div className="profile-view">
                <div className="user">
                    <div className="user-image">
                        <img src={this.state.user.pimage} alt="user.png"/>
                    </div>
                    <div className="user-detail">
                        <div className="username">{this.state.user.username}</div>
                        <div className="fullname">{this.state.user.name}</div>
                    </div>
                </div>
                <div className="suggestions">
                    Suggestions
                    {this.state.suggestions.map( suggestion =>{
                        return (<div key = {suggestion.uid} className="suggestion-user">
                        <div className="suggestion-user-image">
                            <img src={suggestion.pimage} alt=""/>
                        </div>
                        <div className="suggestion-user-name">{suggestion.name}</div>
                        <button className="suggestion-user-follow">Follow</button>
                    </div>)
                    })}
                </div>
            </div>
         );
    }
}
 
export default ProfileView;