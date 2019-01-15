import React, { Component } from 'react';

const baseURL= 'http://localhost:8001';

class Cities extends Component {
    render() {
        return(
            <React.Fragment>
            {/* <div className="city-div"> */}
                <img className="london-img" src={baseURL+'/'+this.props.data.image} alt=""></img>
                <h1 className="city-title">{this.props.data.name}</h1>
            {/* </div> */}
            </React.Fragment>
        )
    }
}

export default Cities;