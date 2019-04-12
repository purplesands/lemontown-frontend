import React from 'react'

class Useful extends React.Component {

  static letterSpacing(num){
    return Math.floor(Math.random() * num)
  }

  static lineSpacing(num){
    return Math.random() * num
  }

  static renderDate=(date)=>{
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let day = date.substr(5,2)
    let monthIndex = date.substr(8,2)
    let year = date.substr(0, 4);
  return day + ' ' + monthNames[parseInt(monthIndex-1)] + ' ' + year;
}


}
export default Useful
