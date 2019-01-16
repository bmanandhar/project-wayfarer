import React, { Component } from 'react';

const baseURL = "http://localhost:8001"

class Posts extends Component {


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
                        <button className='edit-btn'>EDIT</button>
                        <button className='edit-btn'>DELETE</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts