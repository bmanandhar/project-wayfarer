import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

import axios from "axios";

const left = 3, 
right = 12-left;

const baseURL= 'http://localhost:8001';

export default class SignUp extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      city: '',
      email: '',
      password: '',
      confirmPassword: '',
      cities: [],
    }
  }

  componentDidMount = () =>{
    let cities = []
    this.props.cities.map((city)=>{
      return cities.push(city.name)
    })
    this.setState({cities})
    /*
    axios.get(`${baseURL}/cities/all`)
    .then(res=>{
      //console.log(res)
      let cities = []
      res.data.cities.map((city)=>{
        cities.push(city.name)
      })
      this.setState({cityOptions: cities})
    })
    .catch(err=>console.log(err));
    //*/
  }

  handleInput = (e) => {
    //console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  signup = (e) => {
    e.preventDefault()
    for (let item in this.state) {
      if (this.state[item]==="") return
    }
    if (this.state.password!==this.state.confirmPassword) return
    //console.log(this.state)
    let dataObj = {
      username: this.state.username,
      city: this.state.city,
      email: this.state.email,
      password: this.state.password,
    }
    //console.log(dataObj) ; return
    axios.post(`${baseURL}/users/signup`,dataObj)
    .then(response=>{
      localStorage.token = response.data.token;
      this.props.handleLogIn()
      this.props.close()
    })
    .catch(err=>{
      console.log(err.response)
    })
  
  }

  
  render () {
    /*
    let citiesOptions = this.state.cityOptions.map((city,index)=>(
        <option value={city} key={index+1}>{city}</option>
    //*/
    let citiesOptions = this.props.cities.map((city,index)=>(
        <option value={city.name} key={index+1}>{city.name}</option>  
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
      <Button className="green-btn" type="submit" onClick={this.signup}> Sign up </Button>
    </Col>
  </FormGroup>
</Form>

    )
  }
}
