import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"
import { Navbar, Nav, NavItem, Modal, Button } from "react-bootstrap";


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

    clickLink = (e,path) => {
      if (e.target.tagName==="A") {
        e.preventDefault()
      }
      console.log(path)
    }

    render() {
        return(
    <header>
      <Navbar className="navbar" collapseOnSelect>
        <Navbar.Header >
          <Link to={this.props.isLoggedIn?'/cities':'/'} onClick={(e)=>this.clickLink(e,"/cities")}>
          <h1 className="wayfarer-heading">
            WAYFARER
          </h1>
          </Link>
          
          <Navbar.Toggle />
        </Navbar.Header>
          
        <Navbar.Collapse>
          <Nav className="nav-item-wrapper" pullRight>
            {
          this.props.isLoggedIn?
          <React.Fragment>
            <NavItem componentClass='span' className="nav-item" eventKey={1} href="/logout" onClick={this.props.handleLogOut}>
              <Link to="/">
                Log Out
              </Link>
            </NavItem>
            <NavItem componentClass='span' className="nav-item" href="/profile" eventKey={2} onClick={(e)=>this.clickLink(e,"/profile")} >
              <Link to="/profile">
                Profile
              </Link> 
            </NavItem>
          </React.Fragment>  :
          <>
            <NavItem className="nav-item" eventKey={1} href="#" onClick={()=>this.openModal("login")}>
              Log In
            </NavItem>
            <NavItem className="nav-item" eventKey={2} href="#" onClick={()=>this.openModal("signup")}>
              Sign Up
            </NavItem>
          </>
            }
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
          <SignUp cities={this.props.cities} close={this.closeModal} handleLogIn={this.props.handleLogIn}/> : null}

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