import axios from 'axios';
import React, { Component } from 'react'
import { uid } from '../../auth';
import Post from '../Post/Post';
import "./Profile.css";

class Profile extends Component {
    state = { 
        posts:[],
        user:{},
        followingCount:0,
        followerCount:0
     }


    componentDidMount(){
        let posts;
        let user;
        let followingCount;
        let followerCount;
        axios.get(`/api/post/${uid}`).then(obj =>{
            posts = obj.data.data;
            return axios.get(`/api/user/${uid}`);
        }).then(obj =>{
            user = obj.data.data[0];
            return axios.get(`/api/request/followers/${uid}`)
        }).then(obj =>{
            followerCount = obj.data.followers.length;
            return axios.get(`/api/request/following/${uid}`)
        })
        .then(obj =>{
            followingCount = obj.data.following.length;
            this.setState({
                posts,
                user,
                followingCount , 
                followerCount
            })

        })
    }
    render() { 
        return (
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-info">
                        <div className="profile-image">
                            <img src={this.state.user.pimage} alt=""/>
                        </div>
                        <div className="profile-name">{this.state.user.name}</div>
                        <div className="profile-username">{this.state.user.username}</div>
                        <div className="profile-bio">{this.state.user.bio}</div>
                    </div>
                    <div className="profile-stats">
                        <div className="profile-posts">
                            <div className="count">{this.state.posts.length}</div>
                            POSTS
                        </div>
                        <div className="profile-follower">
                            <div className="count">{this.state.followerCount}</div>
                            FOLLOWERS
                        </div>
                        <div className="profile-following">
                            <div className="count">{this.state.followingCount}</div>
                            FOLLOWING
                        </div>
                    </div>
                </div>
                <div className="profile-feeds">
                    {this.state.posts.map(post =>{
                        return <Post key={post.pid} post={post} ></Post>
                    })}
                </div>
            </div>
          );
    }
}
 
export default Profile;