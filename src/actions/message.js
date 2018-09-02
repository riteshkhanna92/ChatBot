export const GET_MESSAGE = 'GET_MESSAGE';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CONNECT = 'CONNECT';
export const DELETE_CONVERSATION = 'DELETE_MESSAGE';
export const SENTIMENT_API = 'SENTIMENT_API';

export const SET_MESSAGE_IMAGE = "SET_MESSAGE_IMAGE";
export function deleteConversation(sender_id) {
  return {
    type: DELETE_CONVERSATION,
    sender: sender_id
  };
}

export function getMessage() {
  return {
    type: GET_MESSAGE,
  };
}

export function setMessage(text, sender_name) {
  return {
    type: SET_MESSAGE,
    value: text,
    sender: sender_name
  };
}

export function sendMessage(text) {
  return {
    type: SEND_MESSAGE,
    value: text
  };
}


export function apiSentiment() {
  return {
    type: SENTIMENT_API
  };
}


export function serverConnect(username, password) {
  return {
    "type": CONNECT,
    "username":username,
    "password":password
  };  
}

export function setMessageImage(username, password) {
  return {
    "type": CONNECT,
    "username":username,
    "password":password
  };  
}
