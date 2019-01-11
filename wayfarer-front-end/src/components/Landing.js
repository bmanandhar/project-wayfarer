import React, {Component} from "react";
import CityWithPosts from './CityWithPosts'
import { Modal, Button, Grid, Row, Col, Carousel } from "react-bootstrap"


const imgURL = "https://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"
const height= 480, width= 640

export default class Landing extends Component {

    render() {
        return(
<React.Fragment >
  <Carousel>
    <Carousel.Item>
      <img width={width} height={height} alt="widthxheight" src={imgURL} />
    </Carousel.Item>
    <Carousel.Item>
      <img width={width} height={height} alt="widthxheight" src={imgURL} />
    </Carousel.Item>
    <Carousel.Item>
      <img width={width} height={height} alt="widthxheight" src={imgURL} />
    </Carousel.Item>
  </Carousel>
  <CityWithPosts />
</React.Fragment>
        );
    }
}