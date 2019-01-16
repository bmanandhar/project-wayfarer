import React, {Component} from "react";
import { Modal, Button } from "react-bootstrap"
import Posts from './Posts';
import axios from "axios";

const baseURL= 'http://localhost:8001';

const bioTxt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis."


export default class Profile extends Component {


    state = {
        editUsername: false,
        editCity: false,
        usernameVal: '',
        cityVal: '',
        userData: {},
        cities: [],
        showPostModal: false,
        postInfo: {},
    }

    componentDidMount = () => {

        axios.get(`${baseURL}/users/profile`,{headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>{

            let userData = res.data
            userData.posts.map((post)=>{
                let city = this.props.cities.filter(city=>city.name===post.city)[0]
                return post.image = city.image
            })
            this.setState({
                userData,
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
        let target = e.target
        if (e.target.tagName==="BUTTON") {
            target = e.target.parentNode.children[0].children[0].children[0]
            console.log(target)
        }
        if (target.value==="") return
        if (this.state[value]===target.value) {
            this.setState({ 
                [option]: false,
            })
            return;
        }
        this.axiosPatch(target)
        this.setState({ 
            [option]: false,
            [value]: target.value
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
        axios.patch(`${baseURL}/users/profile`,
            {[e.name]: e.value},
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

    // open post modal
    open = (index) => {
        this.setState({
            showPostModal: true,
            postInfo: this.state.userData.posts[index]
        })
    }

    // close post modal
    close = () => {
        this.setState({
            showPostModal: false,
            postInfo: {}
        })
    }


    render = () => {

        let postList = []
        if (this.state.userData.posts!==undefined) {
            this.state.userData.posts.map((post,i)=>(
                postList.push(<Posts data={post} open={()=>this.open(i)} key={i} />)
            ))
        }

        return(

<React.Fragment>
    <div className='profile-div-3'>
        <div className="profile">
            <div className='profile-div'>
                <img className="profile-pic" src={`${baseURL}/${this.state.userData.image}`} alt="" />
            </div>
            <div className='edit-username-div'>
                <div className='username'>
                {
                !this.state.editUsername?
                    <h1 className='profile-name'> 
                    {this.state.usernameVal} 
                    </h1> 
                    :   
                    <h1 className='profile-name'>
                        <input className="edit-profile-name" type="text" name="username" 
                            defaultValue={this.state.usernameVal} 
                            onChange={(e)=>this.handleInput(e,"usernameVal")} />
                    </h1> 
                }
                </div>
                {!this.state.editUsername?
                <button className='edit-button'><img src='https://image.flaticon.com/icons/svg/61/61776.svg' className='edit-username-button' onClick={()=>this.changeInputClick("editUsername")}>
                    </img></button>
                :
                    <button className='save-button' onClick={(e)=>this.stopEdit(e,"editUsername","usernameVal")}>Save</button>
                }
            </div>

            <p className='bio chem'>Joined: 
                <span style={{margin: "10px"}}> {this.state.userData.joindate} </span>
            </p>
            <p className='bio chem'> Email: 
                <span style={{margin: "10px"}}> {this.state.userData.email} </span>
            </p>
            <p className='bio'>
                City:
                <span style={{margin: "10px"}}>
                <select onChange={(e)=>this.updateCity(e,"cityVal")} name="city">
                {
                this.props.cities.map((city,index)=>(
                city.name!==this.state.cityVal ? 
                    <option key={index+1} value={city.name}>{city.name} </option> :
                    <option key={index+1} value={city.name} selected>{city.name} </option>
                ))
                }
                </select>
                </span>
            </p>
            <p>{false? bioTxt : ""}</p>
        </div>

        <div className="posts-list">
            {/* <h2>Your Posts: </h2> */}
            {postList.length>0 ? postList : <h4>No Posts</h4>}
        </div>

        <Modal bsSize="large" className="post-modal" show={this.state.showPostModal} onHide = {this.close} >
            <Modal.Header>
                <Modal.Title>
                {`${this.state.postInfo.title} 
                    by ${this.state.usernameVal} 
                    on ${this.state.postInfo.date}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="post-modal-img" src={`${baseURL}/${this.state.postInfo.image}`} alt=""/>
                <p>
                    {this.state.postInfo.body}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="green-btn" onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>

</React.Fragment>

        )
    }
}

