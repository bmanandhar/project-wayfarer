import React, { Component } from 'react';
import './App.css';

class Posts extends Component {
    render() {
        return(
            <div className="post-and-img">
                <img className="london-post-img" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"></img>
                <div>
                    <h3 className="title">Title</h3>
                    <p className="post-body">Pommy ipsum quid who brought loaf bull dog in a pickle clotted cream pie-eyed, easy peasy golly naff warts and all 221B Baker Street a comely wench. Cobbles off the hook have a kip knackered lass ey up chuck morris dancers barmy a comely wench treacle, proper jolly hockey sticks gravy cheese and chips naff off copped a bollocking off the hook have a kip trouble and strife. Accordingly damn loo pork scratchings.</p>
                </div>
            </div>
        )
    }
}

export default Posts