import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import MainContainer from './MainContainer';
import ProfileCard from './ProfileCard';
import Login from './Login';

class App extends Component {

   getWord=()=>{
    fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        'X-RapidAPI-Key':'4d90375dd6mshbfa9800b3e51019p1ebfd0jsn92f7ebed7441'
      }}).then(r=>r.json())
      .then(word=>{
        this.props.dispatch({ type: "ADD_WORD", payload: word})
      })
    }

    checkDay=()=>{
      fetch('http://localhost:3000/days')
      .then(r=>r.json())
      .then(r=>{
        this.props.dispatch({ type: "SET_DATE", payload: r[r.length-1]})
        }
      )
    }

   fetchDays = () =>{
    fetch('http://localhost:3000/days')
      .then(r=>r.json())
      .then(r=>{
      this.props.dispatch({ type: "SET_DAYS", payload: r})
        })
      }



  currentDate=()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) {dd = '0'+dd}
    if(mm<10) {mm = '0'+mm}
    today = mm + '-' + dd + '-' + yyyy;
    return today
  }

   newDay=()=>{
    fetch('http://localhost:3000/days', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        word1: this.props.todaysWords[0].word,
        word2: this.props.todaysWords[1].word,
        word3: this.props.todaysWords[2].word,
        date: this.currentDate()
      })
    }).then(r=>r.json())
    .then(r=>this.props.dispatch({ type: "SET_DATE", payload: r}))
  }

  setDate=()=>{
    (this.props.todaysWords.length===3 && this.props.today.date !== this.currentDate()) ?
    this.newDay() :
    console.log('ha ')
  }

  componentDidMount=()=>{
    this.checkDay()
    this.fetchDays()
    this.getWord()
    this.getWord()
    this.getWord()
    setTimeout(this.setDate, 2000)
  }

  render() {
    return (
      <div>
        <header>
        tbd nav bar
        </header>
        {(!this.props.currentUser)
          ?
          <Login/>
          :
          <button onClick={()=>this.props.dispatch({ type: "UPDATE_USER", payload: null})}>logout!</button>
        }
          {(this.props.currentUser)
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
    todaysWords: state.todaysWords,
    today:state.today
  }
}

const HOC = connect(mapStateToProps)
export default HOC(App);
