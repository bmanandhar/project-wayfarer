import React, { Component } from 'react';
import './App.css';
import Cities from './Cities.js';

class CitiesList extends Component {
    render() {
        return(
            <div className="cities-list">
                <h1 className="city-header">Cities</h1>
                <Cities />
                <Cities />
            </div>
        )
    }
}

export default CitiesList;