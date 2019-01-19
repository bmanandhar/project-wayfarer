import React, { Component } from 'react'
import axios from 'axios'

import { Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

const left = 3, right = 12-left;
const baseURL= 'https://react-wayfarer.herokuapp.com';

const validEmailRegex= /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i

const fieldErrorHandling = FieldComponent => ({ fieldError, children }) => {
  return (
    <FieldComponent>
      { fieldError &&
      <div className='incorrect-login'>
        <h1 className='incorrect'>Fill in required fields.</h1>
      </div> }
      { children }
    </FieldComponent>
  );
};

const withErrorHandling = WrappedComponent => ({ incorrectError, children }) => {
  return (
    <WrappedComponent>
      { incorrectError &&
      <div className='incorrect-login'>
        <h1 className='incorrect'>Incorrect login details</h1>
      </div> }
      { children }
    </WrappedComponent>
  );
};

const DivWithErrorHandling = withErrorHandling(({ children }) => <div>{ children }</div>)

const DivWithFieldHandling = fieldErrorHandling(({ children }) => <div>{ children }</div>)

class LogIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      incorrectError: false,
      fieldError: false,
    }
  }

  toggleError = (e) => {
    //e.preventDefault()
    this.setState((prevState, props) => {
      return { incorrectError: !prevState.incorrectError }
    })
  };

  toggleFieldError = (e) => {
    e.preventDefault()
    this.setState((prevState, props) => {
      return { fieldError: !prevState.fieldError }
    })
  };
  
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault()
    
    if (!validEmailRegex.test(this.state.email)) {
      this.toggleError(e)
      return
    }

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
  </FormGroup>

  <FormGroup controlId="loginPassword">
    <Col componentClass={ControlLabel} sm={left}>
      Password
    </Col>
    <Col sm={right}>
      <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInput}/>
    </Col>
  </FormGroup>
              
  <FormGroup>
    <Col smOffset={left} sm={right}>
      <Button className="green-btn" type="submit" onClick={this.login}>
        Sign in
      </Button>
      <DivWithErrorHandling incorrectError={ this.state.incorrectError } >
      </DivWithErrorHandling>
      <DivWithFieldHandling fieldError={ this.state.fieldError }>
      </DivWithFieldHandling>
    </Col>

        </FormGroup>
      </Form> 
      
    )
  }
}

export default LogIn;