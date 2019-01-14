import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './App.css';

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

class About extends Component {
    render() {
        return(
            <Jumbotron>
                <h2>Wayfarer is ...</h2>
                <main>
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
            </Jumbotron>
        )
    }
}

export default About;