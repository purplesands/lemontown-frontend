import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Useful from './Useful'

class WordCard extends React.Component {

state={
  definition1: '',
  definition2: '',
  definition3:''
}

componentDidMount(){
}

renderDate=()=>{
  debugger
  let date= this.props.today.date
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  debugger
  let day = date.substr(5,2)
  let monthIndex = date.substr(8,2)
  let year = date.substr(0, 4);
return day + ' ' + monthNames[parseInt(monthIndex-1)] + ' ' + year;
}

render() {
return (
  (this.props.today) ?
    <div className="wordCard">
      <p>{this.props.today.date}</p>
      <p> {this.props.today.word1}, {this.props.today.word2}, {this.props.today.word3}</p>
    </div>
    : null
  );
}
}

function mapStateToProps(state) {
  return {
    today: state.today
  }
}

const HOC = connect(mapStateToProps)
export default HOC(WordCard);
