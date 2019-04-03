import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import MainContainer from './MainContainer';
import Login from './Login';



class App extends Component {

  handleClick = () => {
    this.props.dispatch({ type: "COOL" })
    this.props.dispatch({ type: "COW" })
    this.props.dispatch({ type: "ADD_TO_COUNTER" })
  }


  render() {
    return (
      <div>
        <header>
          <button onClick={this.handleClick}> hi </button>
        </header>
          <Login/>
          <MainContainer/>
      </div>
    );
  }


}

function mapStateToProps(state) {
  console.log('%c mapStateToProps', 'color: yellow', state);
  return {
    cool: state.cool,
    cow: state.cow,
    counter: state.counter
  }
}

const HOC = connect(mapStateToProps)
export default HOC(App);
