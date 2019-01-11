
import React, { Component } from 'react';
import './App.css';
import Posts from './Posts';
import { Modal, Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

const left = 3, 
right = 12-left;

class CityWithPosts extends Component {

    state = {
        show: false
    }

    open = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
    }

    render() {

        let citiesOptions = ["San Francisco","Paris","London"].map((city,index)=>(
            <option value={city} key={index+1}>{city}</option>
        ))
        citiesOptions.splice(0,0,<option value="" disabled key="0">Select your option</option>)
        
        return(
            
            <div className="city-with-posts-div">
                <div className="static-modal">
                
                </div>
                <div className="city-country-img">
                    <div className='london-uk'>
                        <h1 className="city">London</h1>
                        <h3 className="country">United Kingdom</h3>
                    </div>
                    <img className="london-large-img" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg" alt=""></img>
                </div>
                <div className="posts-and-button">
                    <h2 className='posts'>Posts</h2>
                    <button className="plus-button" onClick={this.open}>+</button>
                </div>
                <div className="posts-div">
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                </div>
                <Modal show={this.state.show} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Create a new post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="city-drop-down">
                                <Col componentClass={ControlLabel} sm={left}>City</Col>
                                <Col sm={right}>
                                    <FormControl name="city" componentClass='select' defaultValue="">
                                        {citiesOptions}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup constrolId="postTitle">
                                <Col componentClass={ControlLabel} sm={left}>Title</Col>
                                <Col sm={right}>
                                    <FormControl type='text'/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel}sm={left}>Post</Col>
                                <Col sm={right}>
                                    <FormControl componentClass='textarea' style={{resize: "none", height: "300px"}}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col sm={left}>
                            <Button onClick={this.close}>Close</Button>
                        </Col>
                        <Col sm={right}>
                            <Button>Submit</Button>
                        </Col>
                    </Modal.Footer>
                </Modal>
            </div>



        )
    }
}

export default CityWithPosts;


