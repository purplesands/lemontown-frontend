import types from './types'

const initialState = {
  posts:[],
  currentUser: null,
  activeLocation: null,
  userToView: null,
  todaysWords: [],
  today: {},
  dateToView: {},
  currentDate: null
}

export default function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "UPDATE_USER":
    console.log('before,', state.currentUser)
    return { ...state, currentUser: action.payload }
    console.log('after,', state.currentUser)
    case "CHANGE_LOCATION":
    return { ...state, activeLocation: action.payload }
    console.log(state.activeLocation)
    case "UPDATE_USER_TO_VIEW":
    return { ...state, userToView: action.payload }
    case "ADD_WORD":
    return { ...state, todaysWords:[...state.todaysWords, action.payload] }
    case "SET_DATE":
    return {...state, today:action.payload}
    case "SET_DAYS":
    return {...state, days:action.payload}
    case "UPDATE_DATE_TO_VIEW":
    return {...state, dateToView:action.payload}
    case "LOGOUT":
    localStorage.removeItem('jwt')
    return {...initialState, today:state.today, days:state.days}
    case "SET_CURRENT_DATE":
    return {...initialState, currentDate:action.payload}

    // case "SET_FOLLOWINGS":
    // return {...state, followings: action.payload}
    // case "SET_FOLLOWERS":
    // return {...state, followers: action.payload}

    default:
    return state;
  }

}
