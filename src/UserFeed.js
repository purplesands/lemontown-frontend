import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import EntryForm from './EntryForm';
import { url } from './helpers';


class UserFeed extends React.Component {

state= {
  entries: []
}

fetchEntries=()=>{
  fetch(`${url}/entries`)
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
      <div className="userPage">
      {this.renderEntries()}
      </div>
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
