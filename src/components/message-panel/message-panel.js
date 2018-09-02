import React, { Component, PropTypes } from 'react';
import './message-panel.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions/message';
class MessagePanel extends Component {
    constructor(props) {
        super(props)
        
  
        
    }
    
  
     handleClickEvent = (msg) => {


        
        this.props.sendMessage(msg);
         
    }
    recievingpacket = (chats, i) => {
       
         if(chats.type==='receive'){

            if( _.isEmpty(chats.buttons)){
                return (
            
                    <li key={i+1} className="left clearfix"><span className="chat-img pull-left">
                        <img src="/icon chatbot.svg" alt="User Avatar" className="img-circle"></img>
                    </span>
                        <div className="chat-body clearfix">
                            <div className="header">
                            </div>
                            
                            <p className="chat-body-content">
                                {/* <span> {chats.txt}</span> */}
                                <span dangerouslySetInnerHTML={{__html: chats.txt}}/>
                                
                            </p>
                            <small style={{ display: 'block' }} className="text-muted pull-left font10 pdlt10 block text-left"><span className="glyphicon glyphicon-time">
                            </span>{moment(chats.time).format("s")}Seconds ago</small>
                        </div>
                    </li>
                    )

            }
            if( !_.isEmpty(chats.buttons)) {
                let _this=this
                return (
                <li  key={i+1} className="left clearfix"><span className="chat-img pull-left">
                <img src="/icon chatbot.svg" alt="User Avatar" className="img-circle"></img>
            </span>
                <div className="chat-body clearfix">
                    <div className="header">
                    </div>
                    <p>
                        <span className="cstmsSpn">Select from the following options</span>
                    </p>
                    {    
                         Object.keys(chats.buttons).map(function (options, i) {
                 return(
                    <button key={i}  onClick={_this.handleClickEvent.bind(this,options)}  className="btn_chat_left">
                    {chats.buttons[options]}</button>
                 )
                    
                 
            })
            }
                    
                    
                        <small className=" text-muted pull-right font10 pd10 block text-right"><span className="glyphicon glyphicon-time">
                        </span>{moment(chats.time).format("s")}Seconds ago</small>
                </div>
            </li>
                 


                )}
           
         }
    }
    sendingPacket = (chats, i) => {
        if (chats.type==='send') {
            return (
                <li key={i} className="right clearfix"><span className="chat-img pull-right">
                    <img src="/img.svg" alt="User Avatar" className="img-circle"></img>
                </span>
                    <div className="chat-body clearfix">
                        <div className="header">
                        </div>
                        <p>
                            <span> {chats.txt}</span>
                        </p>
                        <small className=" text-muted pull-right font10 pd10 block text-right"><span className="glyphicon glyphicon-time">
                        </span>{moment(chats.time).format("s")}Seconds ago</small>
                    </div>
                </li>
            )
        }
         
    }
    render(){
        
        var _this = this;
        
        return (           
           
        <ul className="chat">
             
           {this.props.messages.map(function (chats, i) {
             
                return (
                    <div key={i}>
                        {_this.sendingPacket(chats, i)}
                     {_this.recievingpacket(chats, i)}
                     
                    </div>
                )
            })}

        </ul>
     )
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
        
        sendMessage: msg => {
             
            dispatch(sendMessage(msg));
        }

    }
}
// MessagePanel.propTypes = {
//     messages:  PropTypes.array,
    
//   };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagePanel)
 