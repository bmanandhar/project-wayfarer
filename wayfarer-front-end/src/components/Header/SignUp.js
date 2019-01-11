import React, { Component } from 'react'
import { Modal, Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

const left = 3, 
right = 12-left;

export default class SignUp extends Component {

  signup = (e) => {
    e.preventDefault()
    this.props.closeModal()
  }

  render () {
    let citiesOptions = ["San Francisco","London"].map((city,index)=>(
        <option value={city} key={index}>{city}</option>
    ))
    
    return (

<Modal show={this.props.showModal} onHide={this.props.closeModal}>
    <Modal.Header closeButton className="modal-header">
      <Modal.Title style={{textAlign: "center"}}>
        Sign Up
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form horizontal>
        <FormGroup controlId="signupUsername">
          <Col componentClass={ControlLabel} sm={left}> Username </Col>
          <Col sm={right}>
            <FormControl type="text" placeholder="Username" />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupCity">
          <Col componentClass={ControlLabel} sm={left}> City </Col>
          <Col sm={right}>
            <FormControl componentClass="select" placeholder="city">
              {citiesOptions}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="signupEmail">
          <Col componentClass={ControlLabel} sm={left}> Email </Col>
          <Col sm={right}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupPassword">
          <Col componentClass={ControlLabel} sm={left}> Password </Col>
          <Col sm={right}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupPasswordConfirm">
          <Col componentClass={ControlLabel} sm={left}> Confirm Password </Col>
          <Col sm={right}>
            <FormControl type="password" placeholder="Confirm Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          
        </FormGroup>
      </Form>

    </Modal.Body>

    <Modal.Footer>
      <Col smOffset={left} sm={right}>
        <Button type="submit" onClick={this.signup}> Sign up </Button>
      </Col>
    </Modal.Footer>

</Modal>
    )
  }
}
