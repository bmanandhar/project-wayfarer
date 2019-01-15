import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
import Logout from './Header/Logout.js';

import CitiesList from './CitiesList';

import Profile from './Profile';

import Axios from 'axios';

const baseURL = "http://localhost:8001"


class App extends Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      cities: []
    }
  }

  componentDidMount = () => {
    // retrieve cities info
    Axios.get(`${baseURL}/cities/all`)
    .then(res=>{
      this.setState({ cities: res.data.cities})
    })
    .catch(err=>{ console.log(err) })

    // check if token is stored
    if (localStorage.token) {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false })
    }
  }

  loggedIn = () => {
    this.setState({ isLoggedIn: true })
  }

  loggedOut = (e) => {
    e.preventDefault()
    this.forcedLogOut()
  }

  forcedLogOut = () => {
    this.setState({ isLoggedIn: false })
    localStorage.clear();
  }

  render() {
    
    return (
      <div className="App">
        <Header cities={this.state.cities}
          isLoggedIn={this.state.isLoggedIn} 
          handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        <Switch>
          {
          this.state.isLoggedIn ?
            <React.Fragment>
              <Route path="/profile"  
                  render={()=>{ return (<div className="landing-page">
                  <div className='profile-div-2'>
                    <Profile cities={this.state.cities} forcedLogOut={this.forcedLogOut} /> 
                  </div>
                </div>)}} />
              <Route path="/cities"  
                  render={()=>{ return <CitiesList />}} />
              <Route exact path="/"  
                  render={()=>{ return <CitiesList />}} />
              <Redirect to="/profile" />
            </React.Fragment> 
          :
            <React.Fragment>
              <Route exact path="/*" 
                render={()=>{ return (
                <>
                  <Landing cities={this.state.cities} />
                </>
                )}} />
            </React.Fragment> 
          }
        </Switch>
      </div>

    );
  }
}

export default App;
