import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import CitiesList from './CitiesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CitiesList />
      </div>
    );
  }
}

export default App;
