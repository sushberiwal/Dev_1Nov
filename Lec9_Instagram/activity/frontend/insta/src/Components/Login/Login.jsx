import React, { Component } from 'react'

class Login extends Component {
    state = {  }
    render() { 
        return ( <div>
            <h1>Login Page !!</h1>
            <button onClick= {this.props.login}>Login With Google+</button>
        </div>  );
    }
}
 
export default Login;