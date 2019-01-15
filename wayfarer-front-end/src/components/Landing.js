import React, {Component} from "react";
import { Grid, Row, Col, Carousel, Jumbotron, Well } from "react-bootstrap"

const height= 480, width= 720

const para = [
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset \
    sheets containing Lorem Ipsum passages.", 

    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset \
    sheets containing Lorem Ipsum passages.",

    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
    It has survived not only five centuries, but also the leap into electronic typesetting, \
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset \
    sheets containing Lorem Ipsum passages."
];

export default class Landing extends Component {
    render() {
        let carouselContent = this.props.cities.map((city,i)=>(
          <Carousel.Item key={i}>
            <img src={city.image} width={width} height={height} alt="" />
          </Carousel.Item>
        ))
      
        return(
          <React.Fragment >
            <Carousel>
              {carouselContent}
            </Carousel>
            <Jumbotron>
                <h2 className="header">Wayfarer is ...</h2>
                <main className='topics'>
                    <div>
                        <h3 className="topic">Topic one</h3>
                        <p className="topic-col">{ para[0] }</p>
                    </div>
                    <div>
                        <h3 className="topic">Topic two</h3>
                        <p className="topic-col">{ para[1] }</p>
                    </div>
                    <div>
                        <h3 className="topic">Topic three</h3>
                        <p className="topic-col">{ para[2] }</p>
                    </div>
                </main>
            </Jumbotron>
          </React.Fragment>
        );
      
    }
}
