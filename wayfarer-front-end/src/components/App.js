import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';

//import CitiesList from './CitiesList';
//import CityWithPosts from './CityWithPosts';
import Profile from './Profile';

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

  loggedOut = (e) => {
    e.preventDefault()
    this.setState({
      isLoggedIn: false
    })
    localStorage.clear();
  }

  render() {

    /*
    let showUp= this.state.isLoggedIn ? 
    <div className="landing-page">
      <Profile />
    </div> : 
    <Landing />
    //*/

    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        <Switch>
          <Route path='/profile'
            render={()=>{
            return (
              this.state.isLoggedIn ?
            <div className="landing-page">
              <Profile />
            </div> 
            :
            <Redirect to="/" />
            )
          }}/>
          <Route path='/logout'
            render={()=>{
            return (
              <Redirect to="/" />
            )
          }}/>
          <Route path='/'
            render={() => {
              return (
                !this.state.isLoggedIn ?
              <Landing /> :
              <Redirect to="/profile" />
              )
            }}/>
        </Switch>
      </div>
    );
  }
}

export default App;
