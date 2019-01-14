import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
<<<<<<< HEAD
import Logout from './Header/Logout.js';
=======
import About from './About';
>>>>>>> bijaya

//import CitiesList from './CitiesList';
//import CityWithPosts from './CityWithPosts';
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
<<<<<<< HEAD
        <Header cities={this.state.cities}
          isLoggedIn={this.state.isLoggedIn} 
          handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        <Switch>
          <Route path='/profile'>
          {
          this.state.isLoggedIn ?
            <div className="landing-page">
              <div className='profile-div-2'>
                <Profile cities={this.state.cities} forcedLogOut={this.forcedLogOut}/>
              </div> 
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
          { 
          !this.state.isLoggedIn ? 
            <Landing cities={this.state.cities} /> : 
            <Redirect to="/profile" /> 
          }
          </Route>    
        </Switch>
=======
        <Header isLoggedIn={this.state.isLoggedIn} handleLogIn={this.loggedIn} handleLogOut={this.loggedOut} />
        {showUp}
        
        <Header />
        <Landing />
        <About />

>>>>>>> bijaya
      </div>

    );
  }
}

export default App;
