import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HomeNav from '../../components/nav/HomeNav';
import Slider from 'react-slick';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import jQuery from 'jquery';
import FontAwesome from 'react-fontawesome';
import Footer from '../../components/nav/Footer';
import MessagePanel from '../../components/messagePanel/messagePanel';
import classNames from 'classnames';
import { signup, validateData, forceLocation } from '../../utils/model';
import moment from 'moment';
import config from '../../utils/config';
import {isEmpty} from '../../utils/utils';
import request from 'superagent';
import requestp from 'superagent-bluebird-promise';
import Input, * as inputHelper from 'react-validated-input'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { sendMessage, serverConnect, deleteConversation } from '../../actions/message';
import { showInvite, passToBot } from '../../actions/invite';
import { removeRosterItem } from '../../actions/roster';
import Invite from '../invite/Invite';
import Sentiment from '../../components/sentiment/Sentiment';
import ConvLabel from '../../components/convLabel/ConvLabel';
import OpenTicket from '../../components/openTicket/OpenTicket';
import ShowTicket from '../../components/showTickets/ShowTickets';
import Gist from '../../components/gist/Gist';
import Test from '../../components/test/Test';
import Images from '../../components/images/Images';
import Info from '../../components/info/Info';

import './home.scss';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      shift_active: true
    }
  }
  componentDidMount = () => {
    // this.props.connectServer();
    let token = window.sessionStorage.getItem("token");
    let pass = window.sessionStorage.getItem("pass");
    if (typeof token !== "undefined" || token !== "") {
      this.props.connectServer(token, pass);
    }
    else {
      browserHistory.push({ pathname: '/' });
    }
    jQuery(ReactDOM.findDOMNode(this.refs.modal)).modal({ backdrop: 'static', keyboard: false });

  }
  componentWillReceiveProps = () => {
    this.scrollToBottom();
  }
  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      let msg = (typeof this.refs.message_box.value == "undefined") ? "" : this.refs.message_box.value;
      this.props.sendMessage(msg);
      this.refs.message_box.value = "";
      this.scrollToBottom();
    }
  }
  sendSpecialMessage = (msg) => {
    this.props.sendMessage(msg)
  }
  appBox = () => {
    var html = (
      <div className="home-box box-center" style={{ "backgroundImage": "url('./footer.jpg')" }}>
      </div>
    )
    return html;
  }
  sendMessage = () => {
    let msg = (typeof this.refs.message_box.value == "undefined") ? "" : this.refs.message_box.value;
    this.props.sendMessage(msg);
    this.refs.message_box.value = "";
    this.scrollToBottom();
  }
  handleRosterClick = (sender_id, e) => {
    window.sessionStorage.setItem("active_msg_from", sender_id);
    this.setState({ "refresh": true });
    this.scrollToBottom();
  }
  getRosterListItemName = (str, message_last) => {
    let re = new RegExp('(?<=bot_)(.*)(?=@conference.'+window.sessionStorage.getItem("vhost")+')', 'ig');
    let name = re.exec(str);
    name = (name == null) ? "" : (name)[0];
    if (message_last != ""){
      name = message_last.context.name;
    }
    return name;
  }
  psTBot = () => {
    let msg = "Redirecting back to Bot. Thank you for having communication with us";
    this.props.sendMessage(msg);
    setTimeout(this.props.passToBot(), 5000);
  }
  scrollToBottom() {
    console.log();
    setTimeout(() => { this.el.scrollTo(0, this.el.scrollHeight + 50) }, 1000);
    // this.el.scrollIntoView({ behavior: 'smooth' });
  }
  handleToggleShift() {
    this.setState({ "shift_active": !this.state.shift_active });
    // this.setState({ "refresh": true });
  }
  application = () => {
    let sender_id = window.sessionStorage.getItem("active_msg_from");
    let message = (typeof this.props.message[sender_id] == "undefined") ? [] : this.props.message[sender_id];

    
    message = _.orderBy(message, ['time'], ['asc']);
    let message_last = "";
    let images = [];
    let context = {};
    if(message.length > 0){
      message.map((d, i)=>{
        console.log(d)
        if (!isEmpty(d.context)){
          if (typeof d.context.image != "undefined" && d.context.image != ""){
            images.push(d.context.image);
            
          }
          if (typeof d.context.image != "undefined"){
            context = d.context;
          }
          
        }
      })
      message_last = message[0];
    } 
    return (
      <div className="holder">
        <HomeNav scroll={this.state.scroll} toggle_shift={this.handleToggleShift.bind(this)} toggle_shift_value={this.state.shift_active}></HomeNav>
        <div className="container-fluid full-screen">
          <div className="row message-panel">
            <div className="col-sm-2">
              {
                (() => {
                  if (message.length == 0) {
                    return <h5></h5>

                  } else {
                    return (<h5>Customers</h5>)
                  }
                })()
              }

              <ul className="roster">
                {/* <li  className={classNames({ "roster-item": true})} >Daniel321 <span className="badge badge-secondary float-right mr-4 mt-2">3</span></li> */}
                {
                  this.props.roster.map((data, i) => {

                    // return <li key={i} className={classNames({ "roster-item": true, "active": (data == sender_id) })} onClick={this.handleRosterClick.bind(this, data)}>{this.getRosterListItemName(data)}</li>
                    return <li key={i} className={classNames({ "roster-item": true, "active": (data == sender_id) })} onClick={this.handleRosterClick.bind(this, data)}>{this.getRosterListItemName(data, message_last)}</li>
                  })

                }
              </ul>
            </div>
            <div className="col-sm-6 message-container" ref={el => { this.el = el; }}>
              {
                (() => {
                  if (message.length == 0) {
                    return <div className="empty-queue-box"><h1>Your <FontAwesome name="comments"></FontAwesome> queue is empty</h1></div>
                  } else {
                    return <MessagePanel message={message}></MessagePanel>
                  }
                })()
              }

            </div>
            {/* Information bar */}
            <div className="col-sm-4 info-container">
              {
                (() => {
                  if (message.length == 0) {
                    return <section></section>

                  } else {
                    return (<section>
                      <Info context={context}></Info>
                      <Images imgs={images}></Images>

                      {/* <Gist summary={this.props.gist}></Gist> */}
                      {/* <Sentiment sentiment={this.props.sentiment}></Sentiment> */}
                      <ShowTicket tickets={[]}></ShowTicket>
                      {/* <ConvLab n;el label={this.props.gist}></ConvLabel> */}
                    
                      <OpenTicket></OpenTicket>
                      {/* <Test summary={"Tried bill payment."}></Test> */}
                    </section>)
                  }
                })()
              }

            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
            </div>
            {
                (() => {
                  if (message.length == 0) {
                    return <div className="col-sm-6 addon_button"></div>

                  } else {
                    return (
                      <div className="col-sm-6 addon_button">
                      <button onClick={this.sendSpecialMessage.bind(this,"Thank you")} className="btn btn-outline-primary">Thank you</button>
                      <button onClick={this.sendSpecialMessage.bind(this,"Hello")}  className="btn btn-outline-primary">Hello</button>
                      <button onClick={this.sendSpecialMessage.bind(this,"Welcome")}  className="btn btn-outline-primary">Welcome</button>
                    </div>
                    )
                  }
                })()
              }
           
            <div className="col-sm-4"></div>
          </div>
          {
            (() => {
              if (message.length == 0) {
                return <div className="row align-self-end send-message-panel">
                 <NewTest name="bye" phone="fsdafsd"></NewTest>
                </div>
              } else {
                return (
                  <div className="row align-self-end send-message-panel">
                    <div className="col">
                      {/* test */}
                    </div>
                    <div className="col-sm-6 send-message-box">

                      <input ref="message_box" onKeyPress={this.handleKeyPress} placeholder="Write message here" >
                      </input>
                    </div>
                    <div className="col-sm-4 button-container">

                      <div className="btn-group" role="group" aria-label="Button series">
                        <button onClick={this.sendMessage} className="btn btn-outline-primary btn-sm">send</button>
                        <button onClick={this.psTBot} className="btn btn-outline-primary btn-sm">Transfer to Bot</button>
                        <button onClick={this.psTBot} className="btn btn-outline-danger btn-sm">End Conversation</button>
                      </div>
                    </div>
                  </div>
                )
              }
            })()

          }


          <Invite></Invite>
        </div>

      </div>
    );
  }
  render() {
    return (
      <div onScroll={this.handleScroll} className="main-panel">
        <NewTest name="hello" phone="fsdafsd"></NewTest>
        {this.application()}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { auth } = state;
  console.log("Printing state -- >", state);

  return {
    // user: auth ? auth.user : null,
    message: state.message,
    roster: state.roster.values,
    active_roster: state.roster.active,
    sentiment: state.sentiment.sentiment,
    gist: state.sentiment.summary
  };
};
const mapDispatchToProps = dispatch => {
  return {
    connectServer: (username, password) => {
      dispatch(serverConnect(username, password));
    },
    showInvite: () => {
      dispatch(showInvite());
    },
    sendMessage: msg => {
      console.log("message to print ", msg);
      dispatch(sendMessage(msg));
    },
    passToBot: () => {
      console.log("passing to human ");
      let from = window.sessionStorage.getItem("active_msg_from");
      dispatch(passToBot(from));
      dispatch(deleteConversation(from));
      dispatch(removeRosterItem(from));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

