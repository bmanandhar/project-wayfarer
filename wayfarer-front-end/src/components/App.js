import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios';

import './App.css';
import Header from './Header/Header.js';
import Landing from './Landing';
import CitiesList from './CitiesList';
import Profile from './Profile';



const baseURL = "http://localhost:8001"


var RouteComponent = (props) =>{
  if (props.isLoggedIn) {
    return(
      <React.Fragment>
        <Route path="/cities/:city" 
            render={()=>{ return <CitiesList cities={props.cities}/>}} />
        {/* <Route path="/cities" 
            render={()=>{ return <CitiesList cities={props.cities}/>}} /> */}
        <Route exact path="/"  
            render={()=>{ return <CitiesList cities={props.cities}/>}} />
        <Route path="/logout" render={()=>{ return null}} />
        <Route path="/profile"  
            render={()=>{ return (
            <div className="landing-page">
              <div className='profile-div-2'>
                <Profile cities={props.cities} forcedLogOut={props.forcedLogOut} /> 
              </div>
            </div>)}} />
      </React.Fragment>
    )  
  } else {
    return (
      <React.Fragment>
        <Route path="/" 
          render={()=>{ return (<Landing cities={props.cities} />)}} />
      </React.Fragment>
    )
  }
}


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

  loggedOut = () => {
    this.forcedLogOut()
    this.props.history.push("/")
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
          <RouteComponent isLoggedIn={this.state.isLoggedIn} cities={this.state.cities} forcedLogOut={this.forcedLogOut} {...this.props}/>
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
