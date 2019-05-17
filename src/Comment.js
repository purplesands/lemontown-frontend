import React from 'react';
import { connect } from 'react-redux';
import Useful from './Useful'


class Comment extends React.Component {



render() {
  return (
      <p className="entryComment" style={{letterSpacing:`${Useful.letterSpacing(7)}px`}}>
        {this.props.content}
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeLocation: state.activeLocation
  }
}

const HOC = connect(mapStateToProps)
export default HOC(Comment);
