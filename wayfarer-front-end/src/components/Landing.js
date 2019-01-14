import React, {Component} from "react";
import { Grid, Row, Col, Carousel, Jumbotron, Well } from "react-bootstrap"

const height= 480, width= 720

export default class Landing extends Component {


    render() {

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
            <div className="topic-container">
                <h2 style={{textAlign: "center"}}>Wayfarer is ...</h2>
                <main className="topics">
                    <div>
                        <h3>Topic one</h3>
                        <p>{ para[0] }</p>
                    </div>
                    <div>
                        <h3>Topic two</h3>
                        <p>{ para[1] }</p>
                    </div>
                    <div>
                        <h3>Topic three</h3>
                        <p>{ para[2] }</p>
                    </div>
                </main>
            </div>
          </React.Fragment>
        );
      
    }
}
