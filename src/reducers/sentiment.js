import {
  SET_SENTIMENT_INFO
} from '../actions/sentiment';

const initialState = {
  "summary": [],
  "sentiment": ""
}

export default function sentiment(state = initialState, action = {}) {
// console.log(action.type)
  switch (action.type) {
  case SET_SENTIMENT_INFO:
    {
      // const payload = {type: 'info', message: 'Socket connection success. Waiting for roster.', time: new Date().toString()};
      // const roster = state.  roster || [];
      return Object.assign({}, state, action.api_data);
    }
 
  default:
 
    return state;
  }
}
