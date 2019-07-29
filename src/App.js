import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import MainContainer from './MainContainer';
import NavBar from './NavBar';
import WelcomePage from './WelcomePage'
import { url, wordsApiKey } from './helpers';
import { hotjar } from 'react-hotjar';


class App extends Component {

   getWord=()=>{
    fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        'X-RapidAPI-Key':"4d90375dd6mshbfa9800b3e51019p1ebfd0jsn92f7ebed7441"
      }}).then(r=>r.json())
      .then(word=>{
        this.props.dispatch({ type: "ADD_WORD", payload: word})
      })
    }

    checkDay=()=>{
      fetch(`${url}/days`)
      .then(r=>r.json())
      .then(r=>{
        this.props.dispatch({ type: "SET_DATE", payload: r[r.length-1]})
        }
      )
    }

   fetchDays = () =>{
    fetch(`${url}/days`)
      .then(r=>r.json())
      .then(r=>{
      this.props.dispatch({ type: "SET_DAYS", payload: r})
        })
      }



  currentDate=()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear();
    if(dd<10) {dd = '0'+dd}
    if(mm<10) {mm = '0'+mm}
    today = mm + '-' + dd + '-' + yyyy;
    this.props.dispatch({ type: "SET_CURRENT_DATE", payload: today})
  }

   newDay=()=>{
    fetch(`${url}/days`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        word1: this.props.todaysWords[0].word,
        word2: this.props.todaysWords[1].word,
        word3: this.props.todaysWords[2].word,
        word4: this.props.todaysWords[3].word,
        word5: this.props.todaysWords[4].word,
        date: this.props.currentDate
      })
    }).then(r=>r.json())
    .then(r=>this.props.dispatch({ type: "SET_DATE", payload: r}))
  }

  setDate=()=>{
    (this.props.todaysWords.length===5 && this.props.today.date !== this.props.currentDate) ?
    this.newDay() :
    console.log('ha ')
  }

  fetchUser=()=>{
    const store = require('store')
    const jwt = store.get('jwt')
    if (jwt){
      fetch(`${url}/auto_login`, {
        headers: {
          "Authorization": jwt
        }
      })
        .then(r =>r.json())
        .then(r => {
          if (r.errors) {
            alert(r.errors)
          } else {
            this.props.dispatch({ type: "UPDATE_USER", payload: r}) }
        })
    }
  }


  componentDidMount=()=>{
    hotjar.initialize(hjid, hjsv);
    this.currentDate()
    this.getWord()
    this.getWord()
    this.getWord()
    this.getWord()
    this.getWord()
    this.fetchDays()
    this.checkDay()
    setTimeout(this.setDate, 4000)
    setTimeout(this.fetchUser, 4000)
  }

  render() {
    return (
      <div>
        <header>
        {(!this.props.currentUser)
          ?
            null
          :
          <NavBar/>
        }
        </header>
          {(this.props.currentUser)
            ?
          <MainContainer/>
            :
          <WelcomePage />
          }
      </div>

    );
  }


}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    todaysWords: state.todaysWords,
    today:state.today,
    currentDate:state.currentDate
  }
}

const HOC = connect(mapStateToProps)
export default HOC(App);
