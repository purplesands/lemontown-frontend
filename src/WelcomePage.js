import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import Register from './Register'
import Useful from './Useful'


class WelcomePage extends React.Component {

state={
  login:false,
  register:false,
  loading:null
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

componentDidMount(){
  this.setState({loading:true})
  setTimeout(this.stopLoad,5000)
}

stopLoad=()=>{
  this.setState({loading:false})
}

loading(){
  return(
    <div className="main loading">loading</div>
  )
}


render() {
return (
    <Fragment>
      <div className="titlePage">
      <p>lemontown</p>
      {(!!this.state.loading) ? this.loading() :
      (!this.state.login && !this.state.register) ?
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
