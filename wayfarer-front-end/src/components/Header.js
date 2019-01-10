import React, { Component } from 'react';
import './App.css';

class Header extends Component {
    render() {
        return(
            <header>
                <nav className="navbar">
                    <div className="navbar-div">
                        <h1 className="wayfarer-heading">WAYFARER</h1>
                        <ul className="nav-list">
                            <li className="sign">Log in</li>
                            <li className="sign">Sign up</li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;