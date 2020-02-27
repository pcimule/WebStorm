import React from 'react';
//import logo from './logo.svg';
//import Photos from './components/Photos';
import RandomPhotos from './components/RandomPhotos';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header" >
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <RandomPhotos />

    </div >
  );
}

export default App;