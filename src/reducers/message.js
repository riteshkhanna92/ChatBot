import {
  GET_MESSAGE,
  SET_MESSAGE,
  DELETE_CONVERSATION
} from '../actions/message';
import { SET_ROSTER } from '../actions/roster';

const initialState = {
  message: [],
  images:[],

};

export default function message(state = initialState, action = {}) {
 // console.log(action.type)
  switch (action.type) {
    case GET_MESSAGE:
      {
        const message = state.message || [];
        return state.message;
      }
    case SET_MESSAGE:
      {
        action.value.time = (new Date()).getTime();
     //   console.log(action.value);
      //  console.log(action.sender);
        let message = state[action.sender] || [];
        
        return Object.assign({}, state, { [action.sender]: [action.value, ...message] });
      }
    case DELETE_CONVERSATION:
      {  
        delete state[action.sender];
        return Object.assign({}, state);
      }
    default:
    //  console.log("default initializing ", state)
      return state;
  }
}
