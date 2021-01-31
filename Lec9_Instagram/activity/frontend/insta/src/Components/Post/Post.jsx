import React, { Component } from 'react';
import "./Post.css"
// stateless functional component

class Post extends Component {
    state = { 
        username:"sushantberiwal",
        userImage:"default.png" ,
        postImage:"post.png" ,
        likes:12123
     }
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
                    <i class="far fa-heart"></i>
                    </div>
                    <div className="comment">
                    <i class="far fa-comment"></i>
                    </div>
                </div>
                <div className="post-likes-count">{this.state.likes} likes</div>
                <div className="post-comments">Comments</div>
                <div className="post-add-comment">
                    <input type="text" placeholder="Add a comment.."/>
                    <button>Post</button>    
                </div>
            </div>
         );
    }
}
 
export default Post;