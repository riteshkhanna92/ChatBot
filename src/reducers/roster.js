import {
  GET_ROSTER,
  SET_ROSTER,
  UNSET_ROSTER
} from '../actions/roster';

const initialState = {
   values: [],
   active: null
};

export default function roster(state = initialState, action = {}) {
 // console.log(action.type)
  switch (action.type) {
  case GET_ROSTER:
    {
      // const payload = {type: 'info', message: 'Socket connection success. Waiting for roster.', time: new Date().toString()};
      // const roster = state.roster || [];
      return state;
    }
  case SET_ROSTER:
    {
      // const payload = {type: 'error', message: 'Socket connection error.', time: new Date().toString()};
      // const roster = state.roster || [];
      return Object.assign({}, state, {active: action.active}, {values: [...action.value, ...state.values]});
    }
    case UNSET_ROSTER:
    {
      // const payload = {type: 'error', message: 'Socket connection error.', time: new Date().toString()};
      // const roster = state.roster || [];
      state.values.pop(action.sender_id);

      return Object.assign({}, state, {active: null}, {values: [...state.values]});
    }

  default:
    //console.log("default initializing ",state)
    return state;
  }
}
