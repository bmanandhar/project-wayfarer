import React, { Component } from 'react';
import './App.css';
import LogIn from './LogIn';

class Header extends Component {
    handleClick() {
        document.getElementsByClassName("sign-in-sign-up").style.display = 'inline-block';
    }
    render() {
        return(
            <header>
                <nav className="navbar">
                    <div className="navbar-div">
                        <h1 className="wayfarer-heading">WAYFARER</h1>
                        <ul className="nav-list">
                            <li className="LogIn" onClick={this.handleClick}>Log in</li>
                            <li className="LogIn" onClick={this.handleClick}>Sign up</li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;
///