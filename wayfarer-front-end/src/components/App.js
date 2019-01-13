import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
import Logout from './Header/Logout.js';

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
      this.setState({ isLoggedIn: true })
    } else {
      //this.setState({ isLoggedIn: false })
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

  forcedLogOut = () => {
    this.setState({
      isLoggedIn: false
    })
    localStorage.clear();
  }

  render() {

    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        <Switch>
          <Route path='/profile'>
          {
          this.state.isLoggedIn ?
            <div className="landing-page">
              <Profile forcedLogOut={this.forcedLogOut}/>
            </div> : <Redirect to="/" />
          }
          </Route>  
          <Route path='/logout' >
            <React.Fragment>
              <Logout forcedLogOut={this.forcedLogOut} />
              <Redirect to="/" />
            </React.Fragment>
          </Route>
          <Route path='/'>
            { !this.state.isLoggedIn ? <Landing /> : <Redirect to="/profile" /> }
          </Route>    
        </Switch>
      </div>
    );
  }
}

export default App;
