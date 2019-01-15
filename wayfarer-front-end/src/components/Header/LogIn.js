import React, { Component } from 'react'
import axios from 'axios'

import { Col, Button, Form, FormGroup, FormControl, ControlLabel, Tooltip } from "react-bootstrap"

const left = 3, right = 12-left;
const baseURL= 'http://localhost:8001';

const withErrorHandling = WrappedComponent => ({ showError, children }) => {
  return (
    <WrappedComponent>
      { showError &&
      <div className='incorrect-login'>
        <h1 className='incorrect'>Incorrect login details</h1>
      </div> }
      { children }
    </WrappedComponent>
  );
};

const DivWithErrorHandling = withErrorHandling(({ children }) => <div>{ children }</div>)


class LogIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showError: false
    }
  }

  toggleError = (e) => {
    e.preventDefault()
    this.setState((prevState, props) => {
      return { showError: !prevState.showError }
    })
  };
  
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault()
    if (this.state.email==="" || this.state.password==="") return;
    
    axios.post(`${baseURL}/users/login`,
      {email: this.state.email,
      password: this.state.password})
    .then(response=>{
      localStorage.token = response.data.token;
      this.props.close()
      this.props.handleLogIn()
    })
    .catch(err=>{
      console.log(err.response)
      console.log(err.response.data.message)
      this.toggleError(e)
    });
    
  }

  render () {
    return (

<Form horizontal>
  <FormGroup controlId="loginEmail">
    <Col componentClass={ControlLabel} sm={left}>
      Email
    </Col>
    <Col sm={right}>
      <FormControl name="email" type="email" placeholder="Email" onChange={this.handleInput}/>
    </Col>
    {/* <Tooltip></Tooltip> */}
  </FormGroup>

  <FormGroup controlId="loginPassword">
    <Col componentClass={ControlLabel} sm={left}>
      Password
    </Col>
    <Col sm={right}>
      <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInput}/>
    </Col>
  </FormGroup>
      <DivWithErrorHandling showError={ this.state.showError }>
        
      </DivWithErrorHandling>
  <FormGroup>
    <Col smOffset={left} sm={right}>
      <Button className="green-btn" type="submit" onClick={this.login}>
        Sign in
      </Button>
    </Col>

  </FormGroup>
</Form>
      
    )
  }
}

export default LogIn