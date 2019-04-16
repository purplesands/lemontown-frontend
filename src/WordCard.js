import React from 'react';
import { connect } from 'react-redux';
import Useful from './Useful'

const WordCard =(props)=> {


const renderDate=()=>{
  let date= props.today.date
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  let day = date.substr(8,2)
  let monthIndex = date.substr(5,2)
  let year = date.substr(0, 4);
return monthNames[parseInt(monthIndex-1)] + ' ' + day + ', ' + year;
}

return (
  (props.today) ?
    <div className="wordCard">
      <p className="date">{renderDate()}</p>
      <p className="words"> {props.today.word1}, {props.today.word2}, {props.today.word3}, {props.today.word4}, {props.today.word5}</p>
    </div>
    : null
  );
}

function mapStateToProps(state) {
  return {
    today: state.today
  }
}

const HOC = connect(mapStateToProps)
export default HOC(WordCard);
