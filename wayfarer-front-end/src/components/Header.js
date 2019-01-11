import React, { Component } from 'react';
import './App.css';

class Header extends Component {
    render() {
        return(
    <header>
      <nav className="navbar">
        <div className="navbar-div">
          <h1 className="wayfarer-heading">
            <a href="/">WAYFARER</a>
          </h1>
          <ul className="nav-list">
            <li className="login">
              <a href="/login">Login</a>
            </li>
            <li className="signup">
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
        )
    }
}

export default Header;