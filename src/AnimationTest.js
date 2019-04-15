import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import Useful from './Useful'
import { useSpring, animated } from 'react-spring'
import './App.css'



function AnimationTest(cool) {

  let userColor = (cool.cool.currentUser.id===cool.cool.user.id) ?  "mediumvioletred" : "darkblue"
  let postColor = (cool.cool.currentUser.id===cool.cool.user.id) ? "palevioletred" : "dodgerblue"
  let pos = getPos(document.querySelector('.mainContainer'))
  const calc = (x, y) => [x - pos.x / 2, y - pos.y / 1.5]
  const trans1 = (x, y) => `translate3d(${x / 11}px,${y / 9}px,0)`
  const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 20}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 10}px,${y / 5}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 15, tension: 30, friction: Useful.letterSpacing(40) } }))
  return (
    <div class="container postContainer" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
    <div className="boogie">
      <animated.div class="card1 username" style={{ transform: props.xy.interpolate(trans1) }} >      <p style={{color:userColor}} >{cool.cool.user.username}</p>
</animated.div></div>
      <animated.div class="card2 content" style={{ transform: props.xy.interpolate(trans2) }} >       {(cool.cool.is_image)? <img className="postImage" src={cool.cool.content}></img> : <p style={{color:postColor}}>{cool.cool.content}</p>}
</animated.div>
{!(cool.cool.currentUser.id===cool.cool.user.id) ?
      <animated.div class="card3 commentBar" style={{ transform: props.xy.interpolate(trans3) }} >
      <form onSubmit={cool.handleComment}>
<select class="dropdown" onChange={cool.handleChange}>
  <option selected="selected" value={cool.cool.today.word1}>{cool.cool.today.word1}</option>
  <option value={cool.cool.today.word2}>{cool.cool.today.word2}</option>
  <option value={cool.cool.today.word3}>{cool.cool.today.word3}</option>
  <option value={cool.cool.today.word4}>{cool.cool.today.word4}</option>
  <option value={cool.cool.today.word5}>{cool.cool.today.word5}</option>
  <option value="and">and</option>
  <option value="the">the</option>
  <option value="or">or</option>
  <option value="another">another</option>

</select>
<button type="submit" name="text" value="comment">{cool.word}</button>
</form>
</animated.div>
:
null
}

      <animated.div class="card4 comments" style={{ transform: props.xy.interpolate(trans4) }} >      <p>{cool.renderComments()}</p>
</animated.div>
    </div>
  )
}

function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}








export default AnimationTest
