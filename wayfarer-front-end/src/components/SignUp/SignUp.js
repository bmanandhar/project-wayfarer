import React, { Component } from 'react'

export default class SignUp extends Component {
  render () {
    return (


<div>
<h2>Register</h2>

<form>

<div>
   <label htmlFor='username'>Username</label>
   <input type='text' name='username' onChange={this.props.handleInput} />
    </div>
<div>
   <label htmlFor='city'>City</label>
   <input type='text' name='city' onChange={this.props.handleInput} />
   </div>
<div>
   <label htmlFor='email'>Email</label>
   <input type='email' name='email' onChange={this.props.handleInput} />
   </div>
<div>
   <label htmlFor='password'>Password</label>
   <input type='password' name='password' onChange={this.props.handleInput} />
   </div>
<div>
   <label htmlFor='confirm_password'>Confirm Password</label>
   <input type='password' name='confirm_password' onChange={this.props.handleInput} />
   </div>

<input value='Submit' type='submit' onClick={this.props.handleSignUp} />
</form>
</div>
    )
  }
}
