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

render() {
return (
  (this.props.today) ?
    <div>
      <p>{Useful.renderDate(this.props.today.date)}</p>
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
