import React, {Component} from "react";
import axios from "axios";
const baseURL= 'http://localhost:8001';
export default class Profile extends Component {

    state = {
        editUsername: false,
        editCity: false,
        usernameVal: '',
        cityVal: '',
        userData: {},
        cities: []
    }

    componentDidMount = () => {
        axios.get(`${baseURL}/users`,{headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(re=>{
            let res = re.data.user[0]
            this.setState({
                userData: res,
                usernameVal: res.username,
                cityVal: res.city
            })
        })
        .catch(err=>console.log(err))
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

    render() {
//alert(this.state.cityVal)
        return(
<div >
<div className='profile-div'>
    <img className="profile-pic" src="https://www.poweron-it.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg"></img>
    <h1 className='profile-name'>John Doe</h1>
</div>
<p className='bio'>Joined on:
{console.log(this.state.userData)}
{this.state.userData.joindate}</p>
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
        )
    }
}
