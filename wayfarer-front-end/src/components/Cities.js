import React, { Component } from 'react';


class Cities extends Component {
    render() {
        return(
            <React.Fragment>
            {/* <div className="city-div"> */}
                <img className="london-img" src={this.props.data.image} alt=""></img>
                <h1 className="city-title">{this.props.data.name}</h1>
            {/* </div> */}
            </React.Fragment>
        )
    }
}

export default Cities;