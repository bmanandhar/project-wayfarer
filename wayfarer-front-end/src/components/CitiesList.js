import React, { Component } from 'react';
import { Modal, Grid, Col, Row, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";

import Cities from './Cities.js';
import CityWithPosts from './CityWithPosts';

const baseURL= 'https://react-wayfarer.herokuapp.com';

const left = 3, 
right = 12-left;

class CitiesList extends Component {

    _isMounted = false

    state = {
        show: false,
        showPost: false,
        cities: [],
        cityIndex: 0,
        postInfo: {},
        cityInfo: {},
        city: '',
        title: '',
        body: '',
    }

    openFormModal = () => {
        this.setState({show: true})
    }

    closeFormModal = () => {
        this.setState({show: false})
    }

    openPostModal = (index) => {
        //console.log(index)
        this.setState({
            showPost: true,
            postInfo: this.state.cityInfo.posts[index]
        })
    }

    closePostModal = () => {
        this.setState({
            showPost: false,
            postInfo: {}
        })
    }

    parseCityName = (name) => {
        let cityName = []
        name.split(" ").map(word=>{
            return cityName.push(word.charAt(0).toLowerCase()+word.slice(1))
        })
        return cityName.join("-")
    }
    
    componentDidMount = () => {
        
        this._isMounted = true

        /*
        console.log(this.props.location.pathname)
        let pathname= this.props.history.location.pathname
        if (pathname==="/") {
            this.props.history.push('/profile')
        } else if (pathname.indexOf("/cities/")!==-1) {
            this.props.history.push('/cities')
        } else {
            this.props.history.push('/cities')
        }
        //*/

        axios.get(`${baseURL}/cities/all`)
        .then(response=>{
            axios.get(`${baseURL}/cities/${response.data.cities[0].id}/posts`)
            .then(res=>{
                if (this._isMounted) {
                    this.setState({ 
                        cityInfo: res.data.city,
                        cityIndex: 0, 
                        cities: this.props.cities
                    })
                }
            })
            .catch(err=>{console.log(err)})
            
        })
        .catch(err=>{console.log(err)})
    }
  
    componentWillUnmount = () => {
        this._isMounted = false
    }

    clickOnCity = (index) => {
        //console.log(index,this.props.cities[index])
        axios.get(`${baseURL}/cities/${this.props.cities[index].id}/posts`)
        .then(res=>{
            this.setState({ 
                cityInfo: res.data.city,
                cityIndex: index, 
            })
        })
        .catch(err=>{console.log(err)})
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    submitNewPost = (e) => {
        e.preventDefault()
       if (!(this.state.city && this.state.title && this.state.body)) {
           return
       }
       //console.log(this.state.city,this.state.title,this.state.body)
       //*
       // get file input
       let file = document.getElementById("img_file")
       let image= ""
       // check if empty and file size
       if (file.files.length!==0) {
           if (file.files[0].size>=5*1024*1024) { return }
           image= file.files[0]
       }
       // append data to FormData
       let formData = new FormData()
       formData.append('city',this.state.city)
       formData.append('title',this.state.title)
       formData.append('body',this.state.body)
       formData.append('image',image)
       // make axios call to create new post
       axios.post(`${baseURL}/users/posts/new`,formData,
         {headers: {
             "Authorization": `Bearer ${localStorage.token}`,
             'Content-Type': 'multipart/form-data'
           }
       })
       .then(res=>{
           console.log(res.data)
           // check if current city is the new post city
           let currentCity = this.state.cities[this.state.cityIndex].name
           if (res.data.city===currentCity) {
               console.log(this.state.cityInfo.posts)
               // add new post to the current city postList
               let newPostArr = this.state.cityInfo.posts
               newPostArr.splice(0,0,res.data)
               // update current city object state
               this.setState(prevState=>({
                   cityInfo: {...prevState.cityInfo,posts: newPostArr}
               }))
           }
           // close create post modal
           this.closeFormModal()
       })
       .catch(err=>{
           //console.log(err.response)
           let status = err.response.data.error
           //if (status===401 || status===403) { this.props.forcedLogOut() }
       })
    }

    render() {

        if (this.props.cities===undefined) {
            return null
        }

        let cityList = this.props.cities.map((city,index)=>{
            // get the pretty link
            let prettyNameLink = []
            city.name.split(" ").map(word=>{
                prettyNameLink.push(word.charAt(0).toLowerCase()+word.slice(1))
            })
            return(
            <Link to={`/cities/${prettyNameLink.join("-")}`} key={index} onClick={()=>this.clickOnCity(index)}>
                <button className="green-btn" key={index} onClick={()=>this.clickOnCity(index)}>
                    <Cities data={city}/>         
                </button>
            </Link>)
        })

        let citiesOpt = this.props.cities.map((city,i)=>{
            return (<option value={city.id} key={i+1}>{city.name}</option>)
        })
        citiesOpt.splice(0,0,<option value="" disabled key="0">Select a City</option>)
        

        return(
    <React.Fragment>
        <div className='cities-and-posts'>
            <div className="cities-list">
                <div className='city-list-div'>{cityList}</div>
            </div>
          
            <div className="city-posts">
                <CityWithPosts data={this.state.cityInfo} 
                    open={this.openFormModal} 
                    openModal={this.openPostModal}/>
            </div>
        </div>

        <Modal bsSize='large' show={this.state.show} onHide={this.closeFormModal}>
            <Modal.Header>
                <Modal.Title>Create a new post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal>
                    <FormGroup controlId="city-drop-down">
                        <Col componentClass={ControlLabel} sm={left}>City</Col>
                        <Col sm={right}>
                            <FormControl name="city" componentClass='select' defaultValue="" onChange={this.handleInput}>
                            {citiesOpt}
                            {/* <option value={currentCity} disabled key="0">
                                {currentCity}
                            </option> */}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="postTitle">
                        <Col componentClass={ControlLabel} sm={left}>Title</Col>
                        <Col sm={right}>
                            <FormControl name='title' type='text'onChange={this.handleInput} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel}sm={left}>Post</Col>
                        <Col sm={right}>
                            <FormControl name='body' componentClass='textarea' style={{resize: "none", height: "300px"}} onChange={this.handleInput}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel}sm={left}>Image</Col>
                        <Col sm={right}>
                            <FormControl id="img_file" name='image' type="file" onChange={this.handleInput} />
                        </Col>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Col sm={left}>
                    <Button onClick={this.closeFormModal}>Close</Button>
                </Col>
                <Col sm={right}>
                    <Button className="green-btn" onClick={this.submitNewPost}>Submit</Button>
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
                <img className="post-modal-img" src={baseURL+'/'+this.state.postInfo.image} alt=""/>
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

export default withRouter(CitiesList);