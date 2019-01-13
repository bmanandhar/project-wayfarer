import { Component } from 'react'


export default class Logout extends Component {
    
    componentWillMount = () => { this.props.forcedLogOut() }
    render () { return null }
}