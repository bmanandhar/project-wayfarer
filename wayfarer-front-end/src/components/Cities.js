import React, { Component } from 'react';
import './App.css';

const imgURL="https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"

class Cities extends Component {
    render() {
        return(
            <div className="city-div">
                <img className="london-img" src={imgURL} alt=""></img>
                <h1 className="city-title">London</h1>
            </div>
        )
    }
}

export default Cities;