import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './App.css';

class About extends Component {
    render() {
        const para = [
            {topic: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
            It has survived not only five centuries, but also the leap into electronic typesetting, \
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset \
            sheets containing Lorem Ipsum passages."}, 

            {topic: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
            It has survived not only five centuries, but also the leap into electronic typesetting, \
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset \
            sheets containing Lorem Ipsum passages."},

            {topic: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
            It has survived not only five centuries, but also the leap into electronic typesetting, \
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset \
            sheets containing Lorem Ipsum passages."}
        ];
        return(
            <Jumbotron>
                <h3>Wayfarer is ...</h3>
                <main>
                    <div className='left-col'>
                        <h4>Topic one</h4>
                        <p>{ para[0].topic }</p>
                    </div>
                    <div className='middle-col'>
                        <h4>Topic two</h4>
                        <p>{ para[1].topic }</p>
                    </div>
                    <div className='right-col'>
                    <h4>Topic three</h4>
                        <p>{ para[2].topic }</p>
                    </div>
                </main>
            </Jumbotron>
        )
    }
}

export default About;