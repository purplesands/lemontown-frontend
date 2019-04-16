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

render() {
return (
    <div>
      <p className="titlePage">lemontown</p>
      <div className="logButtons">
        <button onClick={this.handleLogin}>{(!this.state.login) ? "return" : "back"}</button>
        <button onClick={this.handleRegister}>{(!this.state.register) ? "new":"back"}</button>
        {(this.state.login) ? <Login /> : null}
        {(this.state.register) ? <Register /> : null}

        </div>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
  }
}

const HOC = connect(mapStateToProps)
export default HOC(WelcomePage);
