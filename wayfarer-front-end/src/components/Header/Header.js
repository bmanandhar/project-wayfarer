import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";


import LogIn from './LogIn'
import SignUp from './SignUp'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
          showModal: {
            "login": false,
            "signup": false,
          }
        }
      }
    
      openModal = (option) => {
        let showModal= this.state.showModal
        showModal[option]= true
        this.setState({
            showModal: showModal
        })
      }
    
      closeModal = (option) => {
        let showModal= this.state.showModal
        showModal[option]=  false
        this.setState({
            showModal: showModal
        })
      }

    render() {
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
            <NavItem eventKey={1} href="#" onClick={()=>this.openModal("login")}>
              Login
            </NavItem>
            <NavItem eventKey={2} href="#" onClick={()=>this.openModal("signup")}>
              Sign Up
            </NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
      
      <LogIn showModal={this.state.showModal["login"]} closeModal={()=>this.closeModal("login")}/>
      <SignUp showModal={this.state.showModal["signup"]} closeModal={()=>this.closeModal("signup")}/>

    </header>
        )
    }
}

export default Header;