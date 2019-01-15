import React, { Component } from 'react';
import { Modal, Grid, Col, Row, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { Link } from 'react-router-dom';
import axios from "axios";

import Cities from './Cities.js';
import CityWithPosts from './CityWithPosts';

const baseURL= 'http://localhost:8001';

const left = 3, 
right = 12-left;

class CitiesList extends Component {

    state = {
        show: false,
        showPost: false,
        cities: [],
        cityIndex: 1,
        postInfo: {},
    }

    openFormModal = () => {
        this.setState({show: true})
    }

    closeFormModal = () => {
        this.setState({show: false})
    }

    openPostModal = (index) => {
        console.log(index)
        this.setState({
            showPost: true,
            postInfo: this.state.cities[this.state.cityIndex].posts[index]
        })
    }

    closePostModal = () => {
        this.setState({
            showPost: false,
            postInfo: {}
        })
    }

    componentDidMount = () => {
        axios.get(`${baseURL}/cities/posts/all`)
        .then(res=>{
            console.log(res.data)
            this.setState({cities: res.data})
        })
        .catch(err=>{console.log(err)})
    }

    clickOnCity = (index) => {
        console.log(index,this.state.cities[index])
        
        this.setState({
            cityIndex: index
        })
    }


    render() {

        if (this.state.cities.length<=0) {
            return null
        }
        let cityList = this.state.cities.map((city,index)=>{
            // get the pretty link
            let nameLink = []
            city.name.split(" ").map(word=>{
                nameLink.push(word.charAt(0).toLowerCase()+word.slice(1))
            })
            return(
            <Link to={`/cities/${nameLink.join("-")}`} key={index}>
                <button className="green-btn" key={index} onClick={()=>this.clickOnCity(index)}>
                    <Cities data={city}/>         
                </button>
            </Link>)
        })
        
        let currentCity = this.state.cities[this.state.cityIndex].name

        return(
    <React.Fragment>
      <Grid>
        <Row>
          <Col sm={left}>
            {/* <div className="cities-list"> */}
                <h1 className="city-header">Cities</h1>
                {cityList}
            {/* </div> */}
          </Col>
          <Col sm={right}>
            {/* <div className="city-posts"> */}
                <CityWithPosts data={this.state.cities[this.state.cityIndex]} 
                    open={this.openFormModal} image={this.state.cities[this.state.cityIndex].image}
                    openModal={this.openPostModal}/>
            {/* </div> */}
          </Col>
      </Row>
    </Grid> 

        <Modal show={this.state.show} onHide={this.closeFormModal}>
            <Modal.Header>
                <Modal.Title>Create a new post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal>
                    <FormGroup controlId="city-drop-down">
                        <Col componentClass={ControlLabel} sm={left}>City</Col>
                        <Col sm={right}>
                            <FormControl name="city" componentClass='select' defaultValue={currentCity}>
                            <option value={currentCity} disabled key="0">
                                {currentCity}
                            </option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="postTitle">
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
                    <FormGroup>
                        <Col componentClass={ControlLabel}sm={left}>Image</Col>
                        <Col sm={right}>
                            <FormControl type="file" />
                        </Col>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Col sm={left}>
                    <Button onClick={this.closeFormModal}>Close</Button>
                </Col>
                <Col sm={right}>
                    <Button className="green-btn">Submit</Button>
                </Col>
            </Modal.Footer>
        </Modal>  

        <Modal bsSize="large" className="post-modal" show={this.state.showPost} onHide = {this.closePostModal} >
            <Modal.Header>
                <Modal.Title>
                {`${this.state.postInfo.title} 
                by ${this.state.postInfo.author} 
                on ${this.state.postInfo.date}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="post-modal-img" src={this.state.postInfo.image} alt=""/>
                <p>
                    {this.state.postInfo.body}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="green-btn" onClick={this.closePostModal}>Close</Button>
            </Modal.Footer>
        </Modal>



    </React.Fragment> 
        )
    }
}

export default CitiesList;