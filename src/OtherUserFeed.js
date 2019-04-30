import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import OtherUserProfileCard from './OtherUserProfileCard';
import { url } from './helpers';



class OtherUserFeed extends React.Component {


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
        <div className="otherUser">
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
