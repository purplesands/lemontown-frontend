import types from './types'

const initialState = {
  posts:[],
}




export default function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "UPDATE_POSTS":
    console.log('cool')
    default:
    return state;
  }

}
