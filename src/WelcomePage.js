import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import Register from './Register'


class WelcomePage extends React.Component {

  timeout=0

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
    this.timeout=setTimeout(this.stopLoad,5000)
  }

  componentWillUnmount(){
    clearTimeout(this.timeout);
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


export default WelcomePage;
