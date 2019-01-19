import React, { Component } from 'react';

const baseURL = "https://react-wayfarer.herokuapp.com"

class ProfilePosts extends Component {


    render() {
        return(
            <div>
                <div className="post-and-img">
                    <img className="post-img" src={baseURL+'/'+this.props.data.image} alt="" />
                    <div>
                        <h3 className="title" onClick={this.props.open}>
                            {this.props.data.title}
                        </h3>
                        <p className="post-body">
                            {this.props.data.body}
                        </p>
                        <button onClick={this.props.openDeleteModal} className='edit-btn'>
                            DELETE
                        </button>
                        <button onClick={this.props.openEditModal} className='edit-btn'>
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePosts



