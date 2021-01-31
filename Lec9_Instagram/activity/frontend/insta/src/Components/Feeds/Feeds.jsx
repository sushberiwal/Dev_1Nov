import React, { Component } from "react";
import Post from "../Post/Post";

class Feeds extends Component {
  state = {
    posts: [
      {
        id: 1,
        username: "sushantberiwal",
        userImage: "default.png",
        postImage: "post2.png",
        likes: 12123,
      },
      {
        id: 2,
        username: "steverogers",
        userImage: "default.png",
        postImage: "post.png",
        likes: 1333,
      },
      {
        id: 3,
        username: "tonystark",
        userImage: "default.png",
        postImage: "post3.png",
        likes: 121233,
      },
      {
        id: 4,
        username: "natasha",
        userImage: "default.png",
        postImage: "post2.png",
        likes: 121233,
      }
    ],
  };
  render() {
    return (
      <div className="feeds">
        {this.state.posts.map((post) => {
          return <Post key={post.id} post = {post} />;
        })}
      </div>
    );
  }
}

export default Feeds;
