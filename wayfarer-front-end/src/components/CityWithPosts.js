import React, { Component } from 'react';
import Posts from './Posts';

const baseURL = 'https://react-wayfarer.herokuapp.com'

class CityWithPosts extends Component {
    
    render() {

        if (this.props.data===undefined) { return null }
        if (this.props.data.posts===undefined) { return null }

        let posts = this.props.data.posts.map((post,i)=>{
            return (<Posts key={i} data={post} open={()=>this.props.openModal(i)}/>)
        })
        return(     
            <div className="city-with-posts-div">
                <div className="static-modal"> 
                </div>
                <div className="city-country-img">
                    <div className='london-uk'>
                        <h1 className="city">{this.props.data.name}</h1>
                    </div>
                    <img className="london-large-img" src={`${baseURL}/${this.props.data.image}`} alt="" />
                </div>
                <div className="posts-and-button">
                    <h2 className='posts'>Posts</h2>
                    <button className="plus-button" onClick={this.props.open}>+</button>
                </div>
                <div className="posts-div">
                    {posts}
                </div>
            </div>
        )
    }
}

export default CityWithPosts;


