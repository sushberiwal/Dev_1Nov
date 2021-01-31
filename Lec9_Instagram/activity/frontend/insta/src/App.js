import React from 'react';
import './App.css';
import Feeds from './Components/Feeds/Feeds';
import NavBar from './Components/NavBar/NavBar';
import ProfileView from './Components/ProfileView/ProfileView';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="home-view">
        <Feeds />
        <ProfileView />
      </div>
    </React.Fragment>
  );
}

export default App;
