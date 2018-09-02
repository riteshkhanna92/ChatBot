import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// import { selectedUsersPage, usersByPage } from '../reducers/users';
// import { selectedReposPage, reposByPage } from '../reducers/repos';
import message from '../reducers/message';
import roster from '../reducers/roster';
import alerts from '../reducers/alerts';
import invite from '../reducers/invite';
import sentiment from '../reducers/sentiment';
import socketMiddleware from '../middleware/socket';

const logger = createLogger();
const rootReducer = combineReducers(
  {
    alerts,
    roster,
    message,
    invite,
    sentiment
  }
);

const initialState = {

};


export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger, socketMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware ,  logger, socketMiddleware), f=>f
    ));
  }

  return store;
}
