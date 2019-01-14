import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

const postImg = "https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"

class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: [],
        }
    }

    componentDidMount() {
        /*
        Axios.get('http://localhost:8001/posts/')
        .then(response => {
            this.setState({
                title: response.data.title
            })
        }).catch(err=>{console.log(err.response)})
        //*/
    }

    render() {
        return(
            <div className="post-and-img">
                <img className="london-post-img" src={postImg} alt=""></img>
                <div>
                    <h3 className="title" onClick={this.props.open}>Title</h3>
                    <p className="post-body">Pommy ipsum quid who brought loaf bull dog in a pickle clotted cream pie-eyed, easy peasy golly naff warts and all 221B Baker Street a comely wench. Cobbles off the hook have a kip knackered lass ey up chuck morris dancers barmy a comely wench treacle, proper jolly hockey sticks gravy cheese and chips naff off copped a bollocking off the hook have a kip trouble and strife. Accordingly damn loo pork scratchings.</p>
                </div>
            </div>
        )
    }
}

export default Posts