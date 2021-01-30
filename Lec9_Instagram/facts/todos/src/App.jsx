import React, { Component } from 'react';
import InputBox from './Components/InputBox';
import TodoList from './Components/TodoList';

class App extends Component {

  state = { 
    todos : [{id:1 , todo:"Learn JSX"} , {id:2  , todo:"Learn React"} , {id:3 , todo:"Learn JS"} , {id:4 , todo:"Learn CSS"} ]
   }
  render() { 
    return (<React.Fragment>
      <InputBox />
      <TodoList />   
    </React.Fragment> 
      );
  }


}
 
export default App;




// nodejs
// require("react");
// module.exports = function;

// language => javascript
// require => import
// module.exports => export default App;
