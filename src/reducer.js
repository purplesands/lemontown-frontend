import types from './types'

const initialState = {
  posts:[],
  currentUser: null,
  activeLocation: null,
  followings:[],
  followers:[]
}




export default function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "UPDATE_POSTS":
    console.log('cool')
    case "UPDATE_USER":
    console.log('before,', state.currentUser)
    debugger
    return { ...state, currentUser: action.payload }
    debugger
    console.log('after,', state.currentUser)
    case "CHANGE_LOCATION":
    return { ...state, activeLocation: action.payload }
    console.log(state.activeLocation)
    case "UPDATE_FOLLOWER_COUNT":
    state.currentUser.followed_users++
    return { ...state, currentUser: state.currentUser }

    // case "SET_FOLLOWINGS":
    // return {...state, followings: action.payload}
    // case "SET_FOLLOWERS":
    // return {...state, followers: action.payload}

    default:
    return state;
  }

}
