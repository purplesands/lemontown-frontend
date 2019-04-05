import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

  state= {
    username: '',
    password: ''
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          username: this.state.username,
        })
      }).then(r=>r.json())
      .then(user=>this.props.dispatch({ type: "UPDATE_USER", payload:user}))
      .then(r=>this.setState({
        username:'',
        password:''
      }))
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
