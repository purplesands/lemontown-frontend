import React from 'react'

class Useful extends React.Component {

  static letterSpacing(num){
    return Math.floor(Math.random() * num)
  }

  static lineSpacing(num){
    return Math.random() * num
  }

}
export default Useful
