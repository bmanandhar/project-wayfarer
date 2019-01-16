import { Component } from 'react'

class Logout extends Component {
    
    componentWillMount = () => { this.props.forcedLogOut() }
    render () { return null }
}

export default Logout