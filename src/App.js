import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import MainContainer from './MainContainer';
import Login from './Login';



class App extends Component {

  render() {
    return (
      <div>
        <header>
          <button onClick={this.handleClick}> hi </button>
        </header>
          <Login/>
          {(this.props.currentUser !='')
            ?
          <MainContainer/>
            :
          null
          }
      </div>
    );
  }


}

function mapStateToProps(state) {
  console.log('%c mapStateToProps', 'color: yellow', state);
  return {
    currentUser: state.currentUser,
  }
}

const HOC = connect(mapStateToProps)
export default HOC(App);
