import React from 'react';
import { connect } from 'react-redux';
import vegetables from './assets/vegetables'
import { url } from './helpers';


class Register extends React.Component {

  state= {
    username: '',
    password: '',
    password2: '',
    file_upload: null
  }

  createUser = () => {
    const store = require('store')
      fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
  				"Accepts": "application/json",
        },
        body:JSON.stringify({
          username:this.state.username,
          password:this.state.password,
          avatar:vegetables[Math.floor(Math.random()*vegetables.length)]
        }),
      }).then(r=>r.json())
      .then(r=>{
        if (r.errors) {
          alert(r.errors)
        } else {
        this.props.dispatch({ type: "UPDATE_USER", payload:r.user})
        store.set('jwt', r.jwt)
        this.setState({username:'',password:'', password2:''})
      }
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    (this.state.password===this.state.password2) ? this.createUser() : alert('passwords dont match. try again')
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileChange = (e) => {
    // console.log(e.target.files)
    this.setState({ file_upload: e.target.files[0]})
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <p>
              <input
                className="login"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="name"
              />
            </p>
            <p>
              <input
                className="login"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="pass"
              />
            </p>
          <p>
            <input
                className="login"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
                placeholder="confirm"
              />
            </p>
          <button type="submit" value="register">register</button>
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
