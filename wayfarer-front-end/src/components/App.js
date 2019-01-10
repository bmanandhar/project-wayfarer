import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import CitiesList from './CitiesList';
import CityWithPosts from './CityWithPosts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="cities-list-with-posts">
          <CitiesList />
          <CityWithPosts />
        </div>
      </div>
    );
  }
}

export default App;
