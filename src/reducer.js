import types from './types'

const initialState = {
  posts:[],
  currentUser: {id: 2, username: "cool guy"},
  activeLocation: null
}




export default function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "UPDATE_POSTS":
    console.log('cool')
    case "UPDATE_USER":
    return { ...state, currentUser: action.payload }
    console.log(state.currentUser)
    case "CHANGE_LOCATION":
    return { ...state, activeLocation: action.payload }
    console.log(state.activeLocation)
    default:
    return state;
  }

}
