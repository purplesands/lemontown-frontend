import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

  state= {
    username: '',
    password: ''
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
  				"Accepts": "application/json",
        },
        body:JSON.stringify({
          username: this.state.username,
          password:this.state.password
        })
      }).then(r=>r.json())
      .then(r=>{
        if (r.errors) {
          alert(r.errors)
        } else {
      this.props.dispatch({ type: "UPDATE_USER", payload:r.user})
      localStorage.setItem('jwt', r.jwt)
      // this.props.history.push(`/users/${r.user.id}`)
      this.setState({username:'',password:''})
    }
  })
}



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="password"
            />

          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser:state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(Login);
