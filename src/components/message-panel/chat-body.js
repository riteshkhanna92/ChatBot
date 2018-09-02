import React, { Component } from 'react';
import './chat-body.scss';
import MessageSender from '../message-sender/meesage-sender';

import { connect } from 'react-redux';
import { sendMessage, serverConnect } from '../../actions/message';
import MessagePanel from '../message-panel/message-panel';
import { get } from 'https';



class ChatBody extends Component {

    constructor(props) {

        super(props)
        this.state = { messageSent: '', chatArray: [], senderId: 'teluskb_bot@teluskbbot.xavient.com' }
        
    }
    guid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    sendSpecialMessage = (msg) => {


        this.setState({ messageSent: msg });
        this.props.sendMessage(msg);
        $(".panel-body").animate({ scrollTop: $(".wrapChat").height() }, "slow");
    }
    componentDidMount = () => {
        window.sessionStorage.setItem("active_msg_from", 'teluskb_bot@teluskbbot.xavient.com');


        let token = this.guid() + "@teluskbbot.xavient.com";
        let pass = this.guid();

        if (typeof token !== "undefined" || token !== "") {
            this.props.connectServer(token, pass);

        }

    }

     
    application = () => {

        let sender_id = this.state.senderId;
        let message = (typeof this.props.message[sender_id] == "undefined") ? [] : this.props.message[sender_id]
        message = _.orderBy(message, ['time'], ['asc']);
        console.log('>>>>>>>>>>'+JSON.stringify(message));
        return (
            <div className="wrapper">
                <div className="sidebar-hotel fullWidth">
                    <div className="side-in">
                        <div className="panel panel-primary bor0" ref={el => { this.el = el; }}>
                            {
                                (() => {
                                    if (message.length == 0) {

                                        return <div className="panel-body chatuptxt"></div>
                                    } else {
                                        return <div className="panel-body chatuptxt ">
                                            <div className="wrapChat">
                                                <MessagePanel messages={message} />
                                            </div>

                                        </div>
                                    }
                                })()
                            }

                            {/* for input sender */}
                            <MessageSender onTextChange={this.sendSpecialMessage} />
                           
                            
                        </div>
                    </div>
                </div>
               
            </div>
        
    
        )


    }
    render() {

        return (
            <div>
                {this.application()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { auth } = state;
    // console.log("Printing state -- >", state);

    return {

        message: state.message,


    };
};
const mapDispatchToProps = dispatch => {
    return {
        connectServer: (username, password) => {
            dispatch(serverConnect(username, password));
        },
        sendMessage: msg => {
            //console.log("message to print ", msg);
            dispatch(sendMessage(msg));
        }

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBody)
