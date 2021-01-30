import React, { Component } from 'react'

class InputBox extends Component {
    state = { 
        todo:""
     }

     onChangeHandler = (e) =>{
         console.log("on chnage called");
         console.log(e.target.value);
         this.setState({
             todo : e.target.value
         })
     }

     onAddHandler = () =>{
         let addTodo = this.props.handleAdd;
         addTodo(this.state.todo);
         this.setState({
             todo:""
         })
     }

    render() { 
        return (
        <div className="input-group mt-5 mb-5">
        <input type="text" className="form-control" value={this.state.todo} onChange={ (e)=>{this.onChangeHandler(e)} }/>
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={this.onAddHandler}>Add Todo</button>
        </div>
      </div> );
    }
}
 
export default InputBox;