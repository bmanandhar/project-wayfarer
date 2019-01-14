import React, {Component} from "react";
import {  Carousel } from "react-bootstrap"
import Axios from "axios";

export default class Landing extends Component {

  _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      cities:[]
    }
  }

  componentDidMount() {
    this._isMounted = true;
    Axios.get('http://localhost:8001/cities/all')
    .then(response => {
      if (this._isMounted) {
        this.setState({
          cities: response.data.cities
        })
      }
    })
    .catch(err=>{console.log(err)})
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


    render() {

      var citiesImg = this.state.cities.map((city, i) => {
        return(
            <Carousel.Item key={i}>
              <div>
              <img className='carousel-img' src={`${city.image}`} alt="" />
              </div>
            </Carousel.Item>
        )

      })

        return(
          <React.Fragment >
            <Carousel>
              {citiesImg}
            </Carousel>
          </React.Fragment>
        );
      
    }
}
