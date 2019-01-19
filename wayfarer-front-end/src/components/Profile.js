import React, {Component} from "react";
import { Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel  } from "react-bootstrap"
import ProfilePosts from './ProfilePosts';
import axios from "axios";

const baseURL= 'https://react-wayfarer.herokuapp.com';
const maxFileSize = 5*1024*1024;

const left = 2, 
right = 12-left;


export default class Profile extends Component {

    state = {
        editUsername: false,
        editCityOpt: false,
        usernameVal: '',
        cityVal: '',
        userData: {},
        cities: [],
        showPostModal: false,
        editPostModal: false,
        deletePostModal: false,
        postInfo: {},
        editCity: '', editTitle: '', editBody: '',
    }

    componentDidMount = () => {

        axios.get(`${baseURL}/users/profile`,{headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>{
            let userData = res.data
            this.setState({
                userData,
                usernameVal: res.data.username,
                cityVal: res.data.city
            })
        })
        .catch((err)=>{
            let status = err.response.data.error
            if (status===401 || status===403) {
                alert(`${err.response.data.message}, logging out...`)
                this.props.forcedLogOut()
            }
        })
    }

    handleInput = (e,condition) => {
        if (condition) {
            if (!e.target.value) {
                document.getElementById("save_edit_btn").disabled= true
                return
            } else {
                document.getElementById("save_edit_btn").disabled= false
            }
        }
        this.setState({
            [e.target.name]: e.target.value
        })   
    }

    // change to input tag when click on username
    changeInputClick = (option) => {
        this.setState({[option]: true})
    }

    // stop edit username
    stopEdit = (e,option,value) => {
        let target = e.target
        if (e.target.tagName==="BUTTON") {
            target = e.target.parentNode.children[0].children[0].children[0]
        }
        
        if (/\\s/g.test(target.value)) return
        
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
        this.axiosPatch(e.target)
        this.handleInput(e,false)
    }

    editCityOption = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // axios call to update
    axiosPatch = (e) => {
        axios.patch(`${baseURL}/users/profile`,
            {[e.name]: e.value},
            {headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>console.log(res.data))
        .catch(err=>{
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

    // open edit modal
    openEditModal = (index) => {
        this.openModal("editPostModal",index)
    }
    
    // close post modal
    close = () => {
        this.closeModal("showPostModal")
    }
    
    // close delete-warning modal
    closeDeleteModal = () => {
        this.closeModal("deletePostModal")
    }

    // close edit modal
    closeEdit = () => {
        this.closeModal("editPostModal")
    }

    confirmDelete = (e) => {
        let post_id = this.state.postInfo.id
        axios.delete(`${baseURL}/users/posts/${post_id}`,
            {headers: {"Authorization": `Bearer ${localStorage.token}`}})
        .then(res=>{
            // remove post to the profile postList
            let newPostArr= this.state.userData.posts.filter(post=>res.data.post._id!==post.id)
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

        let newCity= !this.state.editCity? this.state.postInfo.city : this.state.editCity
        let newTitle= !this.state.editTitle? this.state.postInfo.title : this.state.editTitle
        let newBody= !this.state.editBody? this.state.postInfo.body : this.state.editBody
        
        if (!( newCity && newTitle && newBody)) {
            alert("empty edit")
            return
        } else {
        }
        
        let file = document.getElementById("edit_img_file")
        let image= this.state.postInfo.image
        // check if empty and file size
        if (file.files.length!==0) {
            if (file.files[0].size>=maxFileSize) { return }
            image= file.files[0]
        }
        // append data to FormData
        let formData = new FormData()
        formData.append('city',newCity)
        formData.append('title',newTitle)
        formData.append('body',newBody)
        formData.append('image',image)
        // make axios call to create new post
        axios.put(`${baseURL}/users/posts/${this.state.postInfo.id}`,formData,
          {headers: {
              "Authorization": `Bearer ${localStorage.token}`,
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            let newPostArr= []
            this.state.userData.posts.map(cityPost=>{
                if (cityPost.id===res.data.id) { return newPostArr.push(res.data) } 
                return newPostArr.push(cityPost)
            })
            // update post list 
            this.setState(prevState=>({
                userData: {...prevState.userData,posts: newPostArr}
            }))
            // close edit post modal
            this.closeEdit()
        })
        .catch(err=>{
            console.log(err.response)
            let status = err.response.data.error
            //if (status===401 || status===403) { this.props.forcedLogOut() }
        })
    }

    render = () => {

        let postList = []
        if (this.state.userData.posts!==undefined) {
            this.state.userData.posts.map((post,i)=>(
                postList.push(
                <ProfilePosts key={i} data={post} open={()=>this.open(i)} 
                    openDeleteModal={()=>this.openDeleteModal(i)} 
                    openEditModal={()=>this.openEditModal(i)}/>)
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
                             />
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
        </div>

        <div className="posts-list">
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


    <Modal bsSize="large" className="post-modal" show={this.state.editPostModal} onHide = {this.closeEdit} >
        <Modal.Header closeButton className="modal-header">
            <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form horizontal>
                <FormGroup controlId="city-drop-down">
                    <Col componentClass={ControlLabel} sm={left}>City</Col>
                    <Col sm={right}>
                        <FormControl name="editCity" componentClass='select' defaultValue={this.state.postInfo.city} 
                        onChange={this.editCityOption}>
                        {
                        this.props.cities.map((city,index)=>(
                            city.name===this.state.postInfo.city?
                            <option key={index+1} value={city.name}>{city.name+" (selected)"} </option> :
                            <option key={index+1} value={city.name}>{city.name}</option>
                        ))
                        }
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="postTitle">
                    <Col componentClass={ControlLabel} sm={left}>Title</Col>
                    <Col sm={right}>
                        <FormControl name='editTitle' defaultValue={this.state.postInfo.title} 
                        placeholder="Title goes here" type='text' 
                        onChange={(e)=>this.handleInput(e,true)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel}sm={left}>Post</Col>
                    <Col sm={right}>
                        <FormControl name='editBody' defaultValue={this.state.postInfo.body} 
                        placeholder="Content goes here" componentClass='textarea' 
                        style={{resize: "none", height: "300px"}} 
                        onChange={(e)=>this.handleInput(e,true)}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel}sm={left}>Image</Col>
                    <Col sm={right}>
                        <FormControl id="edit_img_file" name='image' type="file" accept="image/*" />
                        <Button onClick={()=>document.getElementById('edit_img_file').value=""}>Reset image </Button>
                    </Col>
                </FormGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeEdit}>Close</Button>
            <Button id="save_edit_btn" className="green-btn" onClick={this.editPost}>Save</Button>
        </Modal.Footer>
    </Modal>  

    <Modal className="delete-warning" show={this.state.deletePostModal} onHide = {this.closeDeleteModal} >
        <Modal.Header>
            <Modal.Title>Action: Deleting Post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>Are you sure you want to delete 
                <span> {this.state.postInfo.title} </span>?
            </h3>
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
