import React from 'react';
import UserCard from './UserCard';
import renderHTML from 'react-render-html'


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
      <p className="content">{renderHTML(this.props.content)} </p>
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
