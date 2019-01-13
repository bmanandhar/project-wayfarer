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
            this.props.forcedLogOut()
            console.log(err)
        })
    }

    handleInput = (e,option) => {
        this.setState({ [option]: e.target.value })
    }

    changeInputClick = (option) => {
        this.setState({[option]: true})
    }

    stopEdit = (e,option,value) => {
        if (this.state[value]==="") return;
        this.axiosPatch(e)
        this.setState({ [option]: false })
    }

    updateCity = (e,value) => {
        if (this.state[value]==="") return;
        this.axiosPatch(e)
        this.handleInput(e,value)
    }

    axiosPatch = (e) => {
        axios.patch(`${baseURL}/users/`,
          {[e.target.name]: e.target.value},
          {headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    render() {

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
        this.state.cities.map((city,index)=>(
          city!==this.state.cityVal ? <option key={index+1} value={city}>{city} </option> :
          <option key={index+1} value={city} selected>{city}</option>
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