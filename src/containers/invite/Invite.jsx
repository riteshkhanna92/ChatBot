import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HomeNav from '../../components/nav/HomeNav';
import jQuery from 'jquery';
import FontAwesome from 'react-fontawesome';

import MessagePanel from '../../components/messagePanel/messagePanel';
import classNames from 'classnames';
import { signup, validateData, forceLocation } from '../../utils/model';
import moment from 'moment';
import config from '../../utils/config';
import request from 'superagent';
import requestp from 'superagent-bluebird-promise';
import Input, * as inputHelper from 'react-validated-input'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import {sendMessage, serverConnect} from '../../actions/message';
import {hideInvite, acceptInvite} from '../../actions/invite';
import Modal from 'react-bootstrap-modal';

import './invite.scss';


class Invite extends Component {
  constructor(props) {
    super(props)
      this.state = {
      
    }
  }
  
  componentDidMount = () => {
    
    // jQuery(ReactDOM.findDOMNode(this.refs.modal)).modal({ backdrop: 'static', keyboard: false });
    
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.show) {
      jQuery(ReactDOM.findDOMNode(this.refs.modal)).modal({ backdrop: 'static', keyboard: false });
    }
  }

  render() {
    return (
      <div  id="ohmodal" ref="modal" className="modal invite-modal" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invitation</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Bot want to hand-off conversation. Would you be able to take on a conversation?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={this.props.acceptInvite}>Accept</button>
            <button type="button" className="btn btn-outline-warning" data-dismiss="modal" onClick={this.props.hideInvite}>reject</button>
          </div>
        </div>
      </div>
    </div>
    ) 
  }
}

// Invite.propTypes = {
//   scroll: React.PropTypes.number
// };

const mapStateToProps = (state) => {

  return {
    show: state.invite.show
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideInvite: () => {
      dispatch(hideInvite());
    },
    acceptInvite: () => {
      dispatch(hideInvite());
      dispatch(acceptInvite());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invite)
 
