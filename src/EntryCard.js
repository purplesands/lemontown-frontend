import React from 'react';
import UserCard from './UserCard';


class EntryCard extends React.Component {

  state = {
    isClicked: false,
  }

  handleClick = () => {
    console.log(this.props)
    this.setState({
      isClicked: !this.state.isClicked
    })
  }



render() {
  return (
      <div className="entryCard" onClick={this.handleClick}>
      <p className="username"> {this.props.user.username}</p>
      <p className="content">{this.props.content} </p>
      <img className="avatar" src={this.props.user.avatar}></img>
      <p className="date">{this.props.date}</p>
      {(this.state.isClicked)
        ?
          <UserCard {...this.props} />
        :
          null
      }

      </div>
    );
  }
}
export default EntryCard
