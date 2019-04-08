import types from './types'

const initialState = {
  posts:[],
  currentUser: null,
  activeLocation: null,
  userToView: null,
  todaysWords: []
}




export default function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "UPDATE_POSTS":
    console.log('cool')
    case "UPDATE_USER":
    console.log('before,', state.currentUser)
    return { ...state, currentUser: action.payload }
    console.log('after,', state.currentUser)
    case "CHANGE_LOCATION":
    return { ...state, activeLocation: action.payload }
    console.log(state.activeLocation)
    case "UPDATE_USER_TO_VIEW":
    return { ...state, userToView: action.payload }
    case "ADD_WORDS":
    return { ...state, todaysWords:[...state.todaysWords, action.payload] }
    debugger
    // case "SET_FOLLOWINGS":
    // return {...state, followings: action.payload}
    // case "SET_FOLLOWERS":
    // return {...state, followers: action.payload}

    default:
    return state;
  }

}
