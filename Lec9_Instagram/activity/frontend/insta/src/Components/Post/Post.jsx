import axios from 'axios';
import React, { Component } from 'react';
import "./Post.css"
// stateless functional component

class Post extends Component {
    // 1. initial state is set
// caption: "This is my Third Post !!!"
// createdOn: "Feb 06 2021 16:09:55"
// pid: "9be6810e-892f-4499-9dca-79afae6ffbe5"
// postImage: "images/posts/1612607995721.jpg"
// uid: "0174eac2-c136-40be-8a0b-038aeb40cd64"
    state = { 
        username:"",
        userImage:"" ,
        postImage:"" ,
        caption:"",
        likes:""
     }

    // 3. component did Mount `
    componentDidMount(){
        axios.get(`/api/user/${this.props.post.uid}`).then(obj =>{
            let user = obj.data.data[0];
            console.log(user);
            this.setState({
                username:user.username,
                userImage : user.pimage,
                postImage:this.props.post.postImage ,
                caption : this.props.post.caption
            })
        })
    } 

    // 2. render function is called
    render() { 
        return ( 
            <div className="post">
                <div className="post-username">
                    <div className="post-username-image">
                    <img src={this.state.userImage} alt=""/>
                    </div>
                    <div className="username">{this.state.username}</div>
                </div>
                <div className="post-image">
                    <img src={this.state.postImage} alt=""/>
                </div>
                <div className="post-actions">
                    <div className="like">
                    <i className="far fa-heart"></i>
                    </div>
                    <div className="comment">
                    <i className="far fa-comment"></i>
                    </div>
                </div>
                <div className="post-likes-count">{this.state.likes} likes</div>
                <div className="post-comments"><strong>{this.state.username }</strong>{this.state.caption}</div>
                <div className="post-add-comment">
                    <input type="text" placeholder="Add a comment.."/>
                    <button>Post</button>    
                </div>
            </div>
         );
    }
}
 
export default Post;