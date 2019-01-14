import React, { Component } from 'react';
//import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
import About from './About.js';
import CitiesList from './CitiesList';
import CityWithPosts from './CityWithPosts';
import Profile from './Profile.js'


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
      <div className='landing-page'>
        <div className='profile-div-2'>
          <Profile />  
        </div>
        
        {/* <CitiesList /> <CityWithPosts /> */}
      </div> : 
    <React.Fragment>
      <Landing />
      <About />
    </React.Fragment>

    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        {showUp}

      </div>

    );
  }
}

export default App;
