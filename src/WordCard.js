import React from 'react';
import { connect } from 'react-redux';

class WordCard extends React.Component {

  state={
    time: null
  }


renderDate=()=>{
  if (this.props.today.date) {
  let date= this.props.today.date
  let monthNames = [
    "jan", "feb", "mar",
    "apr", "may", "jun", "jul",
    "aug", "sep", "oct",
    "nov", "dec"
  ];
  let day = date.substr(8,2)
  let monthIndex = date.substr(5,2)
  let year = date.substr(0, 4);
return monthNames[parseInt(monthIndex-1)] + ' ' + day + ', ' + year;
}
}

showTime=()=>{
   let date = new Date();
   let h = date.getHours(); // 0 - 23
   let m = date.getMinutes(); // 0 - 59
   let s = date.getSeconds(); // 0 - 59
   let session = "AM";

   if(h === 0){
       h = 12;
   }

   if(h > 12){
       h = h - 12;
       session = "PM";
   }

   h = (h < 10) ? "0" + h : h;
   m = (m < 10) ? "0" + m : m;
   s = (s < 10) ? "0" + s : s;

   let time = h + ":" + m + ":" + s + " " + session;
   this.setState({time:time})
 }

 componentDidMount(){
   setInterval(this.showTime, 1000)
 }

render(){
return (
  (this.props.today) ?
    <div className="wordCard">
      <div className="dates">
      <p className="lemonTown">lemontown</p>
        <p>{this.state.time}</p>
        <p>{this.renderDate()}</p>
      </div>
      <p className="words"> "{this.props.today.word1}," "{this.props.today.word2}," "{this.props.today.word3}," "{this.props.today.word4}," "{this.props.today.word5}"</p>
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
