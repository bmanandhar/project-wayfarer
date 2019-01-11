import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css';
import Header from './Header.js';
import CitiesList from './CitiesList';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import CityWithPosts from './CityWithPosts';

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          
          <Route path='/login' 
          render={(props) => {
            return (
              <LogIn  />
            )
          }}
          />
          <Route path='/signup' 
          render={(props) => {
            return (
              <SignUp  />
            )
          }}
          />
        </Switch>
        
      </div>
    );
  }
}

export default App;
