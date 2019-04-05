import React, { Fragment } from 'react';

const PostCard = (props) => {

function renderDate(){
  debugger
    console.log(props.created_at)
  }

return (
    <div className="postCard">
    <p>{props.content} - {props.user.username}</p>
    <p>{props.date}</p>
    </div>
  );
}
export default PostCard
