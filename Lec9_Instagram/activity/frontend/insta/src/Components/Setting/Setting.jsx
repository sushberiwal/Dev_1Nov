import axios from "axios";
import React, { Component } from "react";
import "./Setting.css";
// import { uid } from '../../auth';


class Setting extends Component {
  state = {
    user: {
      bio: "",
      email: "",
      isPublic: null,
      name: "",
      pimage: "",
      pw: "",
      uid: "",
      username: "",
    },
    disabled : true
  };

  fileInput = React.createRef();

  setDisableFalse = () =>{
      this.setState({
          disabled : false
      })
  }

  onCancelHandler = () =>{
    let uid = this.props.uid;
    axios.get(`/api/user/${uid}`).then((obj) => {
        let user = obj.data.data[0];
        console.log(user);
        this.setState({
          user : user ,
          disabled : true
        });
      });  
  }

  onSaveHandler = () =>{
    let uid = this.props.uid;
    console.log(this.fileInput.current);
    let formData = new FormData();
    if(this.fileInput.current.files.length){
      let fileObject = this.fileInput.current.files[0];
      formData.append('user' , fileObject);
    }
    formData.append('name' , this.state.user.name);
    formData.append('username' , this.state.user.username);
    formData.append('bio' , this.state.user.bio);
    formData.append('email' , this.state.user.email);
    formData.append('pw' , this.state.user.pw);

    axios.patch(`/api/user/${uid}` , formData).then(obj =>{
      console.log("after save !!");
      console.log(obj);
      let userPromise = axios.get(`/api/user/${uid}`);
      return userPromise;
    }).then(obj =>{
      let user = obj.data.data[0];
      console.log(user);
      let userObj = {
        bio: user.bio ? user.bio : "",
        email: user.email ? user.email : "",
        isPublic: user.isPublic ? user.isPublic : "",
        name: user.name ? user.name : "",
        pimage: user.pimage ? user.pimage : "",
        pw: user.pw ? user.pw :"",
        uid: user.uid ? user.uid : "",
        username: user.username ?  user.username:"",
      }
      this.setState({
        user : userObj ,
        disabled : true
      });
    })
  }

  onChangeHandler = (e) =>{
      e.preventDefault();
      let key = e.target.id;
      let user = this.state.user;
      user[key] = e.target.value;
      this.setState({
          user        
      })
  }

  componentDidMount() {
    let uid = this.props.uid;
    axios.get(`/api/user/${uid}`).then((obj) => {
      let user = obj.data.data[0];
      console.log(user);
      let userObj = {
        bio: user.bio ? user.bio : "",
        email: user.email ? user.email : "",
        isPublic: user.isPublic ? user.isPublic : "",
        name: user.name ? user.name : "",
        pimage: user.pimage ? user.pimage : "",
        pw: user.pw ? user.pw :"",
        uid: user.uid ? user.uid : "",
        username: user.username ?  user.username:"",
      }
      this.setState({
        user : userObj ,
        disabled : true
      });
    });
  }



  render() {
      let {name , username , bio , email , isPublic , pimage , pw , uid } = this.state.user;
      let disabled = this.state.disabled;
    return (
      <div className="settings">
        <div className="left">
          <div className="profile-photo">
            <img src={pimage} alt="user.jpg" />
            {!disabled && <input type="file" id="profile-photo" ref={this.fileInput}/> }
          </div>
        </div>
        <div className="right">
          <div className="setting-input name">
            <label htmlFor="">Name</label>
            <input id="name" type="text" value={name} disabled={disabled} onChange = {(e) => {this.onChangeHandler(e)}}/>
          </div>
          <div className="setting-input user-name">
            <label htmlFor="">Username</label>
            <input id="username"  type="text" value={username} disabled={disabled} onChange = {(e) => {this.onChangeHandler(e)}}/>
          </div>
          <div className="setting-input email">
            <label htmlFor="">Email</label>
            <input id="email"  type="text" value={email} disabled={disabled} onChange = {(e) => {this.onChangeHandler(e)}}/>
          </div>
          <div className="setting-input password">
            <label htmlFor="">Password</label>
            <input id="pw"  type="text" value={pw} disabled={disabled} onChange = {(e) => {this.onChangeHandler(e)}}/>
          </div>
          <div className="setting-input bio">
            <label htmlFor="">Bio</label>
            <input id="bio"  type="text" value={bio} disabled={disabled} onChange = {(e) => {this.onChangeHandler(e)}}/>
          </div>
          <div className="ispublic">
            <label htmlFor="">Account Type</label>
            <select name="" id="">
              <option value="1">Public</option>
              <option value="0">Private</option>
            </select>
          </div>

          
          {disabled ? <button className="edit" onClick={this.setDisableFalse}>Edit</button> : 
          <React.Fragment>
              <button className="cancel" onClick={this.onCancelHandler}>Cancel</button>
              <button className="save" onClick={this.onSaveHandler}>Save</button>  
          </React.Fragment>
          }
          
        </div>
      </div>
    );
  }
}

export default Setting;
