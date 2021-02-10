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
        followerCount:0,
        viewSelected:"posts" ,
        followers:[],
        following:[]
     }


    componentDidMount(){
        let posts=[];
        let user={};
        let followingCount=0;
        let followerCount=0;
        let followers=[];
        let following=[];
        axios.get(`/api/post/${uid}`).then(obj =>{
            if(obj.data.data){
                posts = obj.data.data;
                posts.sort((a,b)=>{
                    return new Date(b.createdOn) - new Date(a.createdOn);
                  })
            }
            return axios.get(`/api/user/${uid}`);
        }).then(obj =>{
            user = obj.data.data[0];
            return axios.get(`/api/request/followers/${uid}`)
        }).then(obj =>{
            followers = obj.data.followers;
            followerCount = obj.data.followers.length;
            return axios.get(`/api/request/following/${uid}`)
        })
        .then(obj =>{
            following = obj.data.following;
            followingCount = obj.data.following.length;
            this.setState({
                posts,
                user,
                followingCount , 
                followerCount ,
                followers , 
                following
            })
        })
    }

    viewHandler = ( view ) => {
        if(this.state.viewSelected != view){
            this.setState({
                viewSelected : view
            })
        }
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
                        <div className="profile-posts" onClick={ ()=> { this.viewHandler("posts") } }>
                            <div className="count">{this.state.posts.length}</div>
                            POSTS
                        </div>
                        <div className="profile-follower" onClick={ ()=>{ this.viewHandler("follower") } } >
                            <div className="count">{this.state.followerCount}</div>
                            FOLLOWERS
                        </div>
                        <div className="profile-following" onClick={ ()=> {this.viewHandler("following")} }>
                            <div className="count">{this.state.followingCount}</div>
                            FOLLOWING
                        </div>
                    </div>
                </div>
                {this.state.viewSelected == "posts" && <div className="profile-feeds">
                    {/* {this.state.posts.length && <h1>POSTS</h1> } */}
                    {this.state.posts.map(post =>{
                        return <Post key={post.pid} post={post} user={this.state.user}></Post>
                    })}
                </div> }
                {this.state.viewSelected == "follower" && <div className="profile-follower">
                    <h1>FOLLOWERS</h1>
                    {this.state.followers.map( follower =>{
                        return <div className="follower-item" key={follower.uid}> 
                        <div className="user-image">
                                <img src={follower.pimage} alt=""/>
                            </div>
                            <div className="user-info">
                                <div className="username">{follower.username}</div>
                                <div className="name">{follower.name}</div>
                            </div>
                        </div>
                    })}
                </div> }
                {this.state.viewSelected == "following" && <div className="profile-following">
                    <h1>FOLLOWING</h1>
                    {this.state.following.map( follow =>{
                        return <div className="follow-item" key={follow.uid}>
                            <div className="user-image">
                                <img src={follow.pimage} alt=""/>
                            </div>
                            <div className="user-info">
                                <div className="username">{follow.username}</div>
                                <div className="name">{follow.name}</div>
                            </div>
                        </div>
                    })}
                </div> }
            </div>
          );
    }
}
 
export default Profile;