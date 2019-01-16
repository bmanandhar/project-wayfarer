import React, {Component} from "react";
import { Modal, Button } from "react-bootstrap"
import ProfilePosts from './ProfilePosts';
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
        showPostModal: false,
        deletePostModal: false,
        postInfo: {},
    }

    componentDidMount = () => {

        axios.get(`${baseURL}/users/profile`,{headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>{
            console.log(res.data)
            let userData = res.data
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
        console.log(option)
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
            this.setState({ [option]: false })
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

    closeModal = (option) => {
        this.setState({
            [option]: false,
            postInfo: {},
        })
    }

    openModal = (option,index) => {
        this.setState({
            [option]: true,
            postInfo: this.state.userData.posts[index]
        })
    }

    // open post modal
    open = (index) => {
        this.setState({
            showPostModal: true,
            postInfo: this.state.userData.posts[index]
        })
    }

    // open delete-warning modal
    openDeleteModal = (index) => {
        this.setState({
            deletePostModal: true,
            postInfo: this.state.userData.posts[index]
        })
    }
    
    // close post modal
    close = () => {
        this.closeModal("showPostModal")
    }
    
    // close delete-warning modal
    closeDeleteModal = () => {
        this.closeModal("deletePostModal")
    }

    confirmDelete = (e) => {
        console.log(this.state.userData.posts.length)
        let post_id = this.state.postInfo.id
        console.log(post_id)
        axios.delete(`${baseURL}/users/posts/${post_id}`,
            {headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>{
            console.log(res.data)
            // remove post to the profile postList
            let newPostArr= this.state.userData.posts.filter(post=>res.data.post._id!==post.id)
            console.log(newPostArr.filter(p=>p.id===res.data.post._id))
            console.log(newPostArr)
            // update current city object state
            this.setState(prevState=>({
                userData: {...prevState.userData, posts: newPostArr}
            }))
            // close delete post modal
            this.closeDeleteModal()
        })
        .catch(err=>{
            console.log(err.response)
        })
    }

    editPost = (e) => {
        e.preventDefault()
    }

    render = () => {

        let postList = []
        if (this.state.userData.posts!==undefined) {
            this.state.userData.posts.map((post,i)=>(
                postList.push(
                <ProfilePosts key={i} data={post} open={()=>this.open(i)} 
                    openDeleteModal={()=>this.openDeleteModal(i)} />)
            ))
        }
        console.log(postList.length)
        return(

<React.Fragment>
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
            <button className='edit-button' onClick={()=>this.changeInputClick("editUsername")}>
              <img src='images/edit_button.svg' className='edit-username-button' />
            </button>
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
            <span style={{padding: "10px"}}>
            <select style={{fontSize: "20px"}} onChange={(e)=>this.updateCity(e,"cityVal")} name="city">
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
    </div>

    <div className="posts-list">
        {/* <h2>Your Posts: </h2> */}
        {postList.length>0 ? postList : <h4>No post</h4>}
    </div>

    <Modal bsSize="large" className="post-modal" show={this.state.showPostModal} onHide = {this.close} >
        <Modal.Header closeButton className="modal-header">
            <h2>{this.state.postInfo.title}</h2>
            <h3>in {this.state.postInfo.city} by {this.state.usernameVal} </h3>
            <h4>{this.state.postInfo.date} </h4>
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


    <Modal className="delete-warning" show={this.state.deletePostModal} onHide = {this.closeDeleteModal} >
        <Modal.Header>
            <Modal.Title>Action: Deleting Post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete 
            <span> {this.state.postInfo.title}</span> ?
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeDeleteModal}> Cancel </Button>
            <Button bsStyle="danger" onClick={this.confirmDelete}>DELETE </Button> 
        </Modal.Footer>
    </Modal>

</React.Fragment>

        )
    }
}

