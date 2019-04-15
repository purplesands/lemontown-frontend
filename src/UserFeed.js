import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import EntryForm from './EntryForm';

class UserFeed extends React.Component {

state= {
  entries: []
}

fetchEntries=()=>{
  fetch('http://localhost:3000/entries')
  .then(r=>r.json())
  .then(r=>{
    this.setState({
    entries: this.filterEntries(r.reverse())
  })
 })
}

filterEntries=(arr)=>{

  return arr.filter(e=>{
    return e.user_id === this.props.currentUser.id
  })
}

componentDidMount(){
  this.fetchEntries()
}

renderEntries=()=>{
  return this.state.entries.map(e=>{
    return <EntryCard {...e} />
  })

}

render() {
  return (
      <div>
      <EntryForm updateEntries={this.fetchEntries} />
      {this.renderEntries()}
      </div>
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
export default HOC(UserFeed);
