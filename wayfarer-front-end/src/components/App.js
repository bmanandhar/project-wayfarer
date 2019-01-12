import React, { Component } from 'react';
//import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
import About from './About.js';

//import CitiesList from './CitiesList';
//import CityWithPosts from './CityWithPosts';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Landing />
        <About />

      </div>
    );
  }
}

export default App;
