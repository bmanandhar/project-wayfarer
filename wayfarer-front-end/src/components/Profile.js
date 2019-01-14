import React, {Component} from "react";
import { Modal, Button } from "react-bootstrap"
import Posts from './Posts';
import axios from "axios";

const baseURL= 'http://localhost:8001';

export default class Profile extends Component {

    state = {
        editUsername: false,
        editCity: false,
        usernameVal: '',
        cityVal: '',
        userData: {},
        cities: [],
        showModal: false,
    }

    componentDidMount = () => {
        /*
        axios.get(`${baseURL}/users`,{headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(re=>{
            let res = re.data.user[0]
            console.log(res)
            this.setState({
                userData: res,
                usernameVal: res.username,
                cityVal: res.city
            })
        })
        .catch(err=>console.log(err.response))
        //*/
        this.setState({
            cities: ["London","San Francisco","Paris"]
        })
    }

    handleInput = (e,option) => {
        this.setState({ [option]: e.target.value })
    }

    changeInputClick = (option) => {
        this.setState({[option]: true})
    }

    stopEdit = (option) => {
        this.setState({[option]: false})
    }

    open = () => {
        this.setState({
            showModal: true
        })
    }

    close = () => {
        this.setState({
            showModal: false
        })
    }

    render() {

        return(

<React.Fragment>
    <div >
        <div className='profile-div'>
            <img className="profile-pic" src="images/default_profile.jpg" alt=""></img>
            <h1 className='profile-name'>John Doe</h1>
        </div>
        <p className='bio'>Joined on:
        {this.state.userData.joindate}
        </p>
        <p className='bio'>{this.state.userData.email}</p>
        <p className='bio'>
            City:
            <select onChange={this.handleInput} name="city">
            {
            this.state.cities.map((city,index)=>(
                city!==this.state.cityVal ? <option key={index+1} value={city}>{city} </option> :
                <option key={index+1} value={city} selected>{city}</option>
            ))
            }
            </select>
        </p>
        <p className='bio'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    </div>

    <div>
        <Posts open={this.open} />
        <Posts open={this.open} />
        <Posts open={this.open} />
    </div>

    <Modal show={this.state.showModal} onHide = {this.close} >
        <Modal.Header>
            <Modal.Title>Post by John Doe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Posts />
        </Modal.Body>
    </Modal>

</React.Fragment>

        )
    }
}
