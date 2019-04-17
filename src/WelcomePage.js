import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import Register from './Register'


class WelcomePage extends React.Component {

state={
  login:false,
  register:false
}

handleLogin=()=>{
  this.setState({login:!this.state.login})
}

handleRegister=()=>{
  this.setState({register:!this.state.register})
}

backButton=()=>{
  this.setState({
    login:false,
    register:false
  })
}

render() {
return (
    <Fragment>
      <div className="titlePage">
      <p className="lemonTown">lemontown</p>
      {(!this.state.login && !this.state.register) ?
        <div className="logButtons">

        <button onClick={this.handleLogin}>return</button>
        <button onClick={this.handleRegister}>new</button>
        </div>
        :
        <button onClick={this.backButton}>back</button>

      }        </div>

      <div className="login">
        {(this.state.login) ? <Login /> : null}
        {(this.state.register) ? <Register /> : null}
        </div>
      </Fragment>
  );
}
}

function mapStateToProps(state) {
  return {
  }
}

const HOC = connect(mapStateToProps)
export default HOC(WelcomePage);
