import React, { Component } from 'react';
//import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
import About from './About';

import CitiesList from './CitiesList';
import CityWithPosts from './CityWithPosts';

class App extends Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount = () => {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }

  loggedIn = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  loggedOut = () => {
    this.setState({
      isLoggedIn: false
    })
    localStorage.clear();
  }

  render() {

    let showUp= this.state.isLoggedIn ? 
    <>
    <CitiesList />
    <CityWithPosts />
    </> : <Landing />

    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        {showUp}
        
        <Header />
        <Landing />
        <About />

      </div>
    );
  }
}

export default App;
