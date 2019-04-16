import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import OtherUserProfileCard from './OtherUserProfileCard';


class OtherUserFeed extends React.Component {


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
      return e.user_id === this.props.userToView.id
    })
  }

  componentDidMount(){
    this.fetchEntries()
  }

  renderEntries=()=>{
    return this.state.entries.map(e=>{
      return <EntryCard {...e} fetchEntries={this.fetchEntries}/>
    })

  }

  render() {
    return (
        <div>
        <OtherUserProfileCard handleFollow={this.props.handleFollow} handleUnfollow={this.props.handleUnfollow}/>
        {this.renderEntries()}
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      activeLocation: state.activeLocation,
      userToView: state.userToView
    }
  }

const HOC = connect(mapStateToProps)
export default HOC(OtherUserFeed);
