import React, {Component} from "react";
import { Modal, Button, Grid, Row, Col, Carousel } from "react-bootstrap"
import Axios from "axios";

const imgURL = "https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"
const height= 480, width= 640

export default class Landing extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cities:[]
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:8001/cities/all')
    .then(response => {
      this.setState({
        cities: response.data.cities
      })
    })
  }

    render() {

      var citiesImg = this.state.cities.map((city, i) => {
        return(
          <Carousel.Item>
            <div key={i}>
            <img src={`${city.image}`} />
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
