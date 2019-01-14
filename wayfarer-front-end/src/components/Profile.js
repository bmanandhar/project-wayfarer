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
        .then(res=>{
            this.setState({
                userData: res.data,
                usernameVal: res.data.username,
                cityVal: res.data.city
            })
        })
        .catch((err)=>{
            console.log(err.response)
            let status = err.response.data.error
            if (status===401 || status===403) {
                alert(`${err.response.data.message}, logging out...`)
                this.props.forcedLogOut()
            }
        })
    }

    // 
    handleInput = (e,option) => {
        //this.setState({ [option]: e.target.value })
    }

    // change to input tag when click on username
    changeInputClick = (option) => {
        this.setState({[option]: true})
    }

    // stop edit username
    stopEdit = (e,option,value) => {
        //if (this.state[value]==="") return;
        if (e.target.value==="") return
        this.axiosPatch(e)
        this.setState({ 
            [option]: false,
            [value]: e.target.value
         })
    }

    // update city on change
    updateCity = (e,value) => {
        if (this.state[value]==="") return;
        this.axiosPatch(e)
        this.handleInput(e,value)
    }

    // axios call to update
    axiosPatch = (e) => {
        axios.patch(`${baseURL}/users/`,
          {[e.target.name]: e.target.value},
          {headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>console.log(res.data))
        .catch(err=>{
            console.log(err.response)
            let status = err.response.data.error
            if (status===401 || status===403) {
                this.props.forcedLogOut()
            }
        })
    }

    render = () => {

        return(

    <div>
        <h2>Hello</h2>
        <p>
            Username: 
            {
            !this.state.editUsername?
                <span onClick={()=>this.changeInputClick("editUsername")}> 
                {this.state.usernameVal} 
                </span> :
                <input type="text" name="username" 
                    defaultValue={this.state.usernameVal} 
                    onChange={(e)=>this.handleInput(e,"usernameVal")} 
                    onBlur={(e)=>this.stopEdit(e,"editUsername","usernameVal")} 
                />
            }
        </p>
        <p>
        City:
        <select onChange={(e)=>this.updateCity(e,"cityVal")} name="city">
            {
            this.props.cities.map((city,index)=>(
            city.name!==this.state.cityVal ? 
                <option key={index+1} value={city.name}>{city.name} </option> :
                <option key={index+1} value={city.name} selected>{city.name} </option>
            ))
            }
        </select>
        </p>
        <p>
            Email: {this.state.userData.email} 
        </p>
        <p>
            Join Date: {this.state.userData.joindate} 
        </p>
    </div>

        )
    }
}