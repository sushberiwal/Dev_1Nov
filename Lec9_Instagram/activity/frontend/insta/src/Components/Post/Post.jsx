import React, { Component } from 'react';
import "./Post.css"
// stateless functional component

class Post extends Component {
    // 1. initial state is set
    state = { 
        username:"",
        userImage:"" ,
        postImage:"" ,
        likes:""
     }

    // 3. component did Mount 
    componentDidMount(){
        // it triggers render function
        this.setState({
            username : this.props.post.username ,
            userImage : this.props.post.userImage ,
            postImage : this.props.post.postImage ,
            likes : this.props.post.likes
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