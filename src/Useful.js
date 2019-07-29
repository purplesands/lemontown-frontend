import React from 'react'
import { connect } from 'react-redux';

class Useful extends React.Component {

  static letterSpacing(num){
    return Math.floor(Math.random() * num)
  }

  static lineSpacing(num){
    return Math.random() * num
  }

  static loading(){
    return(
      <div className="loading">loading</div>
    )
  }
}


function mapStateToProps(state) {
  return {
    today: state.today
  }
}


const HOC = connect(mapStateToProps)
export default HOC(Useful);
