import {
  SHOW,
  HIDE,
  ACCEPT_INVITE
} from '../actions/invite';
import { SET_ROSTER } from '../actions/roster';

const initialState = {
  show: false,
  accept: false
};

export default function invite(state = initialState, action = {}) {
 // console.log(action.type)
  switch (action.type) {
    case SHOW:
      {
        return Object.assign({}, state, { show: action.value });
      }
    case HIDE:
      {
        return Object.assign({}, state, { show: action.value });
      }
    case ACCEPT_INVITE:
      {
        return Object.assign({}, state, { accept: action.value });
      }
    default:
    //  console.log("default initializing ", state)
      return state;
  }
}
