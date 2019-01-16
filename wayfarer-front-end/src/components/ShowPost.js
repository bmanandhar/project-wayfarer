import React, { Component } from 'react';
import './App.css';
import { Modal, Col, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import Posts from './Posts';

class ShowPost extends Component {
    state = {
        show: false
    }

    open = () => {
        this.setState({
            show:true
        })
    }

    close = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return(
            <div>
                <button onClick={this.open}>Click Me</button>
                <div>
                    <Modal show={this.state.show} onHide = {this.close}>
                        <Modal.Header>
                            <Modal.Title>Post by John Doe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Posts />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ShowPost;