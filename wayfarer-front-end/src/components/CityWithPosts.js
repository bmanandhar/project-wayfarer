import React, { Component } from 'react';
import './App.css';
import Posts from './Posts';
import { Modal, Button, ModalTitle, ModalHeader, ModalBody} from 'react-bootstrap';

class CityWithPosts extends Component {

    constructor(props, context) {
        super (props, context);
        this.state = {
            show: false
        }
        //this.toggleShow = this.toggleShow.bind(this)
        //this.toggleHidden = this.toggleHidden.bind(this)
    }

    toggleHidden =() =>{
        this.setState({show: false});
    }

    toggleShow=()=> {
        this.setState({show: true});
    }

    render() {

        return(
            
            <div className="city-with-posts-div">
                <div className="static-modal">
                
                </div>
                <div className="city-country-img">
                    <div className='london-uk'>
                        <h1 className="city">London</h1>
                        <h3 className="country">United Kingdom</h3>
                    </div>
                    <img className="london-large-img" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"></img>
                </div>
                <div className="posts-and-button">
                    <h2 className='posts'>Posts</h2>
                    <button onClick={this.toggleShow} className="plus-button">+</button>
                </div>

                <div className="posts-div">
                    <Posts />
                    <Posts />
                    <Posts />
                </div>
                <Modal show={this.state.show} onHide={this.toggleHidden}>
                    <ModalHeader>
                        <ModalTitle>Create a new post</ModalTitle>
                    </ModalHeader>
                    <Modal.Body>
                        abcde
                        {/* <form className='new-post-form'>
                            <div className="create-new-post">  
                                <select className='new-post-dropdown'>
                                    <option>London</option>
                                    <option>San Francisco</option>
                                    <option>New York</option>
                                    <option>Paris</option>
                                </select>
                                <p className='new-post-title'>Title</p>
                                <input className='new-post-input'></input>
                                <textarea className="new-post-text-area" placeholder="New Post Here"></textarea>
                                <input className="submit-button" type="submit"></input>
                            </div>
                        </form> */}
                    </Modal.Body>
                    <Button onClick={this.toggleHidden}>Close</Button>
                </Modal>
            </div>
        )
    }
}

export default CityWithPosts;


