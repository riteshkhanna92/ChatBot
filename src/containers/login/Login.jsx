import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import jQuery from 'jquery';
import FontAwesome from 'react-fontawesome';

import classNames from 'classnames';

import moment from 'moment';

import request from 'superagent';
import requestp from 'superagent-bluebird-promise';
import Input, * as inputHelper from 'react-validated-input'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { sendMessage, serverConnect, deleteConversation } from '../../actions/message';
import { showInvite, passToBot } from '../../actions/invite';
import { removeRosterItem } from '../../actions/roster';
import Invite from '../invite/Invite';

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false
    }
  }
  componentDidMount = () => {
    
    jQuery(ReactDOM.findDOMNode(this.refs.modal)).modal({ backdrop: 'static', keyboard: false });
  }
  handleLogin = () => {
    if (this.usernameInput.value != "" && this.passwordInput.value != "" && this.vhostInput.value != ""){
      window.sessionStorage.setItem("token",this.usernameInput.value);
      window.sessionStorage.setItem("pass", this.passwordInput.value);
      window.sessionStorage.setItem("vhost", this.vhostInput.value);
      this.props.connectServer(this.usernameInput.value, this.passwordInput.value);
    }
  }
  application = () => {

    return (
      <div className="holder">
        <div className="container-fluid full-screen">
          <div className="row ">
            <div className="col-md-4 col-sm-6 login-form">
            <h1>XBot</h1>
            <br></br>
            <h4>Agent messaging panel</h4>
            <br></br>
              <form>
                <div className="form-group">
                  <label for="inputUsername">Username</label>
                  <input ref={(input) => { this.usernameInput = input; }}  type="text" className="form-control" id="inputUsername" placeholder="Username"></input>
                </div>
                <div className="form-group">
                  <label for="inputPassword">Password</label>
                  <input ref={(input) => { this.passwordInput = input; }}  type="password" className="form-control" id="inputPassword" placeholder="password"></input>
                </div>
                <div className="form-group">
                  <label for="inputvirtualhost">Virtual host</label>
                  <input ref={(input) => { this.vhostInput = input; }}  type="text" className="form-control" id="inputvirtualhost" placeholder="VirtualHost"></input>
                </div>
                <div className="button-section">
                  <button onClick={this.handleLogin} type="button" className="btn btn-outline-primary">Login</button>
                </div>
              </form>
            </div>

            <div className="col-md-8 col-sm-6 img-holder">
              <img src="login-banner.jpg"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="login-main-panel">
        {this.application()}
      </div>
    )
  }
}
const mapStateToProps = (state) => {

  return {
    // user: state ? state.user : null,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    connectServer: (username, password) => {
      dispatch(serverConnect(username, password));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

