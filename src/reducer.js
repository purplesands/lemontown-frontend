import types from './types'

const initialState = {
  posts:[],
  currentUser: ''
}




export default function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "UPDATE_POSTS":
    console.log('cool')
    case "UPDATE_USER":
    debugger
    return { ...state, currentUser: action.payload }
    console.log(state.currentUser)
    default:
    return state;
  }

}
