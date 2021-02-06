import React, { Component } from "react";
import Post from "../Post/Post";
import axios from "axios";

class Feeds extends Component {
  state = {
    posts: [],
    caption:""
  };

  fileInput = React.createRef();

  componentDidMount(){
    axios.get("/api/post").then(obj =>{
      console.log(obj);
      let posts = obj.data.data;
      posts.sort((a,b)=>{
        return new Date(b.createdOn) - new Date(a.createdOn);
      })

      this.setState({
        posts:posts,
        caption:""
      })
    })
  }

  onChangeHandler = (e) =>{
    this.setState({
      caption:e.target.value
    })
  }


  onUploadHandler = () =>{
    if(this.fileInput.current.files){
      let file = this.fileInput.current.files[0];
      let formData = new FormData();
      formData.append('post' , file);
      formData.append('caption' , this.state.caption);
      formData.append('uid' , '0174eac2-c136-40be-8a0b-038aeb40cd64');
      axios.post("/api/post" , formData).then(obj =>{
        this.componentDidMount();
      })
    }
  }

  render() {
    return (
      <div className="feeds">
        <div className="upload-post">
          <input type="file" name="" id="" ref={this.fileInput}/>
          <input type="text" value={this.state.caption} onChange={(e) => {this.onChangeHandler(e)}}/>
          <button onClick={this.onUploadHandler}>Upload Post</button>
        </div>
        {this.state.posts.map((post) => {
          return <Post key={post.pid} post= {post} />;
        })}
      </div>
    );
  }
}

export default Feeds;
