import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap"

import LogIn from './LogIn'
import SignUp from './SignUp'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
          modalTitle: '',
          option: '',
          showModal: false
        }
    }
 

    openModal = (option) => {
        let title = option==="login" ? "Log In" : "Sign Up"
        this.setState({
            showModal: true,
            option,
            modalTitle: title
        })
    }
    
    closeModal = () => {
        this.setState({
            showModal: false,
            option: '',
            modalTitle: ''
        })
    }

    render() {
      let abc = <div></div>
      if(this.props.isLoggedIn){
        abc = <NavItem eventKey={1} key={1} href="#" onClick={this.props.handleLogOut}>
             Log Out
           </NavItem>
      } else {
        abc= <>
        <NavItem eventKey={1} key={1} href="#" onClick={()=>this.openModal("login")}>
        Log In
      </NavItem>
      <NavItem eventKey={2} key={2} href="#" onClick={()=>this.openModal("signup")}>
        Sign Up
      </NavItem>
      </>
      }

      // let abc = this.state.isLoggedIn?
      //   <NavItem eventKey={1} key={1} href="#" onClick={this.props.handleLogOut()}>
      //     Log Out
      //   </NavItem>
      // :
      //   
      
        return(
    <header>
      <Navbar className="navbar" collapseOnSelect>
        <Navbar.Header>
          <h1 className="wayfarer-heading">
            WAYFARER
          </h1>
          <Navbar.Toggle />
        </Navbar.Header>
          
        <Navbar.Collapse>
          <Nav pullRight>
            {abc}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        
        <Modal.Header closeButton className="modal-header">
          <Modal.Title style={{textAlign: "center"}}>
            {this.state.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.option==="login"? 
          <LogIn close={this.closeModal} handleLogIn={this.props.handleLogIn}/> : 
          this.state.option==="signup"? 
          <SignUp close={this.closeModal} handleLogIn={this.props.handleLogIn}/> : null}

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>

      </Modal>
      
    </header>
        )
    }
}

export default Header;