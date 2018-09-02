import React, { Component } from 'react';
import './message-sender.scss';
class MessageSender extends Component {
    constructor(props) {
        super(props)
        this.state = { messageSent: '' }
        this.onMessageSentEvent = this.onMessageSentEvent.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }
    onMessageSentEvent() {

        let data = document.getElementById('btn-input').value;
        if (data != '')
        {
            this.setState({ messageSent: data });
            this.props.onTextChange(data);
            document.getElementById('btn-input').value = '';
        }
            
    }
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onMessageSentEvent();
        }
    }
    render() {
        return (
            <div className="panel-footer bgwht">
                <div className="input-group">

                    {/* <input onChange={event=>this.setState({term: event.target.value})} value={this.props.messageSent} id="btn-input" type="text"  className="form-control input-sm input_chat" placeholder="Type your message here..." name="inputTest"> */}
                    <input id="btn-input" type="text" className="btn_height form-control input-sm input_chat" placeholder="Type your message here..." name="inputTest" onKeyPress={this._handleKeyPress}>

                    </input><span className="input-group-btn">
                        <button onClick={this.onMessageSentEvent} className="btn btn-warning btn-sm btn_chat" id="btn-chat">
                            <img src="/icons post.svg" alt="User Avatar" className=""></img></button>
                    </span>

                </div>
            </div>
        );
    }
}

export default MessageSender;