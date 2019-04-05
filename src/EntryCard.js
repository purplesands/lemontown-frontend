import React, { Fragment } from 'react';

const EntryCard = (props) => {

function renderDate(){
  debugger
    console.log(props.created_at)
  }

return (
    <div className="entryCard">
    <p>{props.content} - {props.user.username}</p>
    <p>{props.date}</p>
    </div>
  );
}
export default EntryCard
