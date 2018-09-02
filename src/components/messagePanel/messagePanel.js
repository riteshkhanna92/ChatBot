import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import {sanatizeMessage, isEmpty} from '../../utils/utils';
import './messagePanel.scss';
const MessagePanel = ({ message}) => {
  // const { name, image, social } = user;
  let getImage = function(data){
    if (!isEmpty(data.context)){
      if (typeof data.context.image != ""){
        return (<img src={data.context.image} className="col-sm-12"></img>);
      }
    }
    return ""
  }
  return (
        <div className="card">
        <ul>
          {message.map((d,i)=>{
            return (d.type == "send")?<li className="send" key={i}>{
              sanatizeMessage(d.txt)
              
            }</li> : <li className="receive" key={i}>{sanatizeMessage(d.txt)}{getImage(d)}</li> 
          })}
        </ul>
        </div>
    );

};
// name, image, social
MessagePanel.propTypes = {
    message: PropTypes.array.isRequired
};

export default MessagePanel;
