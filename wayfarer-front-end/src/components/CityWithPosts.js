import React, { Component } from 'react';
import './App.css';
import Posts from './Posts';

class CityWithPosts extends Component {
    render() {
        return(
            <div className="city-with-posts-div">
                <div className="city-country-img">
                    <div className='london-uk'>
                        <h1 className="city">London</h1>
                        <h3 className="country">United Kingdom</h3>
                    </div>
                    <img className="london-large-img" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"></img>
                </div>
                <div className="posts-and-button">
                    <h2 className='posts'>Posts</h2>
                    <button className="plus-button">+</button>
                </div>
                <div className='create-new-post'>
                    <form className='new-post-form'>
                        <h2>Create a new post</h2>
                        <select className='new-post-dropdown'>
                            <option>London</option>
                            <option>San Francisco</option>
                            <option>New York</option>
                            <option>Paris</option>
                        </select>
                        <p className='new-post-title'>Title</p>
                        <input className='new-post-input'></input>
                        <textarea className="new-post-text-area"></textarea>
                    </form>
                </div>
                <div className="posts-div">
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                </div>
            </div>
        )
    }
}

export default CityWithPosts;