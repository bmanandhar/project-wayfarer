import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

const left = 3, 
right = 12-left;

export default class SignUp extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      city: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleInput = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  signup = (e) => {
    e.preventDefault()

    console.log(this.state)
    this.props.close()
  }

  
  render () {
    let citiesOptions = ["San Francisco","London"].map((city,index)=>(
        <option value={city} key={index+1}>{city}</option>
    ))
    citiesOptions.splice(0,0,<option value="" disabled key="0">Select your option</option>)
    
    return (

<Form horizontal>
        <FormGroup controlId="signupUsername">
          <Col componentClass={ControlLabel} sm={left}> Username </Col>
          <Col sm={right}>
            <FormControl name="username" type="text" placeholder="Username" onChange={this.handleInput} />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupCity">
          <Col componentClass={ControlLabel} sm={left}> City </Col>
          <Col sm={right}>
            <FormControl name="city" componentClass="select" defaultValue="" onChange={this.handleInput}>
              {citiesOptions}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="signupEmail">
          <Col componentClass={ControlLabel} sm={left}> Email </Col>
          <Col sm={right}>
            <FormControl name="email" type="email" placeholder="Email" onChange={this.handleInput} />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupPassword">
          <Col componentClass={ControlLabel} sm={left}> Password </Col>
          <Col sm={right}>
            <FormControl name="password" type="password" placeholder="Password" onChange={this.handleInput} />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupPasswordConfirm">
          <Col componentClass={ControlLabel} sm={left}> Confirm Password </Col>
          <Col sm={right}>
            <FormControl name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleInput} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={left} sm={right}>
            <Button type="submit" onClick={this.signup}> Sign up </Button>
          </Col>
        </FormGroup>
</Form>

    )
  }
}
