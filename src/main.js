///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
// import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';
import jquery from 'jquery';
import tether from 'tether';

window.$ = window.jQuery = jquery;
//window.Tether=require('tether');
window.Tether = tether;
// require('bootstrap/dist/js/bootstrap');
/////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import TestApp from './containers/TestApp/TestApp';
/////////////////////////////////////////////////////////////////////////
// browserHistory would be preferred over hashHistory, but browserHistory
// would require configuring the server. So we will use hashHistory here.
// Please change to browserHistory if you have your own backend server.
import { browserHistory as history } from 'react-router';
// import { useRouterHistory } from 'react-router';
// import { createHashHistory } from 'history'
// const history = useRouterHistory(createHashHistory)({ queryKey: false });
/////////////////////////////////////////////////////////////////////////
import configureStore from './store/configureStore';

import App from './containers/app/App';
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import './index.scss';
import Header from './components/header/header';
import Loginform from './components/login-form/login-form';
import ChatBody from './components/message-panel/chat-body';
 

 
const store = configureStore();
// connectToAlerts(store);
function loggedIn() {
  let token = window.sessionStorage.getItem("token");
  if (token) {
    return true;
  } else
    return false;
}
function requireAuth(nextState, replace) {

  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

ReactDOM.render(
  <Provider store={store}>
   
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/" component={App}>

        <IndexRoute component={Loginform} />
       

           
           
          <Route path="/ChatBody" component={ChatBody} />



        
        {/* <Route path="/search" component={Search} onEnter={requireAuth}h/> */}
        {/* <Route path="/details/:id" component={Details}/> */}
        {/* <Route path="/tandc" component={TandC}/> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
