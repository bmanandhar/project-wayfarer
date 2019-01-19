import React, { Component } from 'react';

const baseURL= 'https://react-wayfarer.herokuapp.com';

class Cities extends Component {
    render() {
        return(
            <React.Fragment>
                <div className='scroll-div'>
                    <img className="london-img" src={baseURL+'/'+this.props.data.image} alt=""></img>
                    <h1 className="city-title">{this.props.data.name}</h1>
                </div>
            </React.Fragment>
        )
    }
}

export default Cities;