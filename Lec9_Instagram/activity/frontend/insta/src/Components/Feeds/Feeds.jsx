import React, { Component } from 'react';
import Post from '../Post/Post';

class Feeds extends Component {
    state = { 
        posts : [{id:1} , {id:2} , {id:3} , {id:4} , {id:5} , {id:6} , {id:7} ,{id:8}]
     }
    render() { 
        return ( 
            <div className="feeds">
                {this.state.posts.map( post =>{
                    return <Post key={post.id} />
                } )}
            </div>
         );
    }
}
 
export default Feeds;