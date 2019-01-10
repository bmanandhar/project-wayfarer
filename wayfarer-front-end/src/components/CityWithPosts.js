import React, { Component } from 'react';
import './App.css';
import Posts from './Posts';

class CityWithPosts extends Component {
    render() {
        return(
            <div className="city-with-posts-div">
                <div className="city-country-img">
                    <div>
                        <h1>London</h1>
                        <h3>United Kingdom</h3>
                    </div>
                    <img className="london-large-img" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"></img>
                </div>
                <div className="posts-div">
                    <Posts />
                </div>
            </div>
        )
    }
}

export default CityWithPosts;