import React, { Component } from 'react'

import { Modal, Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

const left = 3, 
right = 12-left;

class LogIn extends Component {

  /*
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  openModal = () => {
    this.setState({
        showModal: true
    })
  }

  closeModal = () => {
    this.setState({
        showModal: false
    })
  }
  //*/

  login = (e) => {
    e.preventDefault()
    let modalBody = e.target.parentNode//.previousSiblings
    console.log(modalBody)
  }

  render () {
    return (

    <Modal show={this.props.showModal} onHide={this.props.closeModal}>
      
      <Modal.Header closeButton className="modal-header">
        <Modal.Title style={{textAlign: "center"}}>
          Log In
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        
        <Form horizontal>
          <FormGroup controlId="loginEmail">
            <Col componentClass={ControlLabel} sm={left}>
              Email
            </Col>
            <Col sm={right}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="loginPassword">
            <Col componentClass={ControlLabel} sm={left}>
              Password
            </Col>
            <Col sm={right}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={left} sm={right}>
              <Button type="submit" onClick={this.login}>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.props.closeModal}>Close</Button>
      </Modal.Footer>

    </Modal>
      
    )
  }
}

export default LogIn