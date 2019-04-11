import React from 'react';
import { connect } from 'react-redux';

class Register extends React.Component {

  state= {
    username: '',
    password: '',
    file_upload: null
  }

  handleSubmit = (e) => {
      e.preventDefault();
        debugger
      fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
  				"Accepts": "application/json",
        },
        body:JSON.stringify({
          username:this.state.username,
          password:this.state.password
        }),
      }).then(r=>r.json())
      .then(r=>{
        if (r.errors) {
          debugger
          alert(r.errors)
        } else {
          debugger
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

  handleFileChange = (e) => {
    // console.log(e.target.files)
    this.setState({ file_upload: e.target.files[0]})
  }


  render() {
    return (
      <div>
      register
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

          <input type="submit" value="register" />
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
export default HOC(Register);
