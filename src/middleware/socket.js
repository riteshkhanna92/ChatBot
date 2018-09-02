

import Strophe from './strophe.websocket';
import {setMessage, apiSentiment} from '../actions/message';
import {showInvite} from '../actions/invite';
import {setRoster} from '../actions/roster';
import {setSentiment} from '../actions/sentiment';
import config from '../utils/config';
import { browserHistory } from 'react-router';
// import Strophe from 'strophe';
import {xmlescape, xmlGetMessage} from '../utils/utils';
const socketMiddleware = (function(){
    var socket = null;
    var con = null;
    var storeObj = null;
    var actionsObj = null;
    var msg_from = null;
    const onOpen = (ws,store,token) => evt => {
        //Send a handshake, or authenticate with remote end
        console.log("[ WS ] - Open");
        //Tell the store we're connected
        //store.dispatch(actions.connected());
    }

    const onClose = (ws,store) => evt => {
        //Tell the store we've disconnected
        // store.dispatch(actions.disconnected());

    }
    const heartBeat = () =>{
        setInterval(
            ()=>{
                con.send('  ');
            },2000
        )
    }

    const test = (c, status) => {
        console.log("testing one two three");
        let windowStatus = window.Strophe.Status;
        if (!status)
        status = c;
        let statusMsg = "";
        for (let i in windowStatus){
            if (windowStatus[i] == status)
                statusMsg = i;
        }
        console.log("statusMsg ", statusMsg);

        // socket work
        if (status == windowStatus.CONNFAIL || status == windowStatus.AUTHFAIL) {
            console.log("msg", "Connection error");
        } else if (status == windowStatus.DISCONNECTED) {
            console.log("msg", "Disconnected");
        } else if (status == windowStatus.REBINDFAILED) {
            console.log("msg", "Rebind failed");
        } else if (status == windowStatus.CONNECTED || status == windowStatus.ATTACHED) {
            // con.send($iq({ type: "set" }).c("enable", { xmlns: "urn:xmpp:carbons:1" }));
            console.log("msg", "Connected");
            // if ($("#priority").val() == "on")
            //     con.send($pres().c("priority").t("1"));
            // else
            console.log($pres().toString());
            con.send($pres());
            heartBeat();
          //  browserHistory.push({ pathname: '/' });
            // con.sendIQ($iq({ type: "get" }).c("query", { xmlns: Strophe.NS.ROSTER }).tree(), onRoster);
            // send room join iq
            // con.sendIQ($iq({ type: "get", id: "asas213123", to: 'bot.xavient.com' }).c("query", { xmlns: 'xavbot:simulate:create:room' }).tree(), function (data) { console.log("mic one two three testing") });
            // console.log("###---  ",$iq({ type: "get" }).c("query", { xmlns: Strophe.NS.ROSTER }).tree(), onRoster);
            // con.sendIQ()
            // <iq type='get' to='bot.xavient.com' id='asas213123'> <query xmlns='xavbot:simulate:create:room'/></iq>
        }
        else {
        }




        // console.log("Store value ", store);
        console.log("c value ", c);
        console.log("status  ", status);
        // con.send($pres().c("priority").t("1"));
    }

    const onConnect = (ws, store) => evt => {
        //Send a handshake, or authenticate with remote end
        console.log("[ WS ] - Open");
        // if (!status)
        // status = c;
        // var statusMsg = "";
        // for (i in windowStatus)
        //     if (windowStatus[i] == status)
        //         statusMsg = i;

        //Tell the store we're connected
        //store.dispatch(actions.connected());

    }
    const outputStream = (el, store) => {
        let domain = window.sessionStorage.getItem("vhost");

        let rawDump = window.Strophe.serialize(el);
        let msgTo = window.Strophe.getBareJidFromJid(el.getAttribute('from'));
        let msgFrom = window.Strophe.getBareJidFromJid(el.getAttribute('to'));
        let jid = window.sessionStorage.getItem("sData_con_jid");
        let j_id = jid.split("@")[0];
        let own_msg_to_jid = 'bot_' + j_id + '@conference'+domain+'/' + j_id;
        // if (msgTo == null || msgTo == j_id || rawDump.indexOf(own_msg_to_jid) >= 0) {
        //     return;
        // }
        if (msgTo == null || rawDump.indexOf(own_msg_to_jid) >= 0) {
            return;
        }
        let innerStr = el.innerHTML;
        let msgPacket = xmlGetMessage(innerStr);
        msgPacket.type ="send";
        // Uncomment if want to added message offline directly to message board
     storeObj.dispatch(setMessage(msgPacket,msgFrom));
    }
    const inputStream = (el, store) => {
        let domain = window.sessionStorage.getItem("vhost");
        let rawDump = window.Strophe.serialize(el);
        let msgTo = window.Strophe.getBareJidFromJid(el.getAttribute('from'));
        let msgFrom = window.Strophe.getBareJidFromJid(el.getAttribute('to'));
        let jid = window.sessionStorage.getItem("sData_con_jid");
        let j_id = jid.split("@")[0];
        let own_msg_to_jid = 'bot_' + j_id + '@conference.'+domain+'/' + j_id;
        if (msgTo == null || msgTo == j_id || rawDump.indexOf(own_msg_to_jid) >= 0) {
            return;
        }
        // if uncommented then it will stop message replication that is being fetched from server
        // if (rawDump.indexOf(('@conference.bot.xavient.com/' + j_id)) >= 0)
        // {
        //     return;
        // }
        let innerStr = el.innerHTML;
            
        if (rawDump.match(new RegExp('<presence','g')) != null && (rawDump.match(new RegExp('<presence','g'))).length > 0){
            console.log("Presence ",xmlGetMessage(innerStr));
            
        }
        else if (rawDump.match(new RegExp('<invite','g')) != null && (rawDump.match(new RegExp('<invite','g')) ).length > 0){
            console.log("Invite  ",xmlGetMessage(innerStr));
            
            let msgPacket = xmlGetMessage(innerStr);
            msgPacket.type ="receive";
            // storeObj.dispatch(setMessage(msgPacket,msgTo));
            storeObj.dispatch(showInvite());
            window.sessionStorage.setItem("active_msg_from", msgTo);
        }
        else if (rawDump.match(new RegExp('<message','g')) != null && (rawDump.match(new RegExp('<message','g')) ).length > 0){
            console.log("Message  ",xmlGetMessage(innerStr));
            // storeObj.dispatch(setMessage(xmlGetMessage(innerStr)));
            let msgPacket = xmlGetMessage(innerStr);
            if (rawDump.indexOf(('@conference.'+domain+'/' + j_id)) >= 0)
            {
                msgPacket.type ="send";
            }else{
                msgPacket.type ="receive";
                storeObj.dispatch(apiSentiment());
            }
            // msgPacket.type ="receive";
            storeObj.dispatch(setMessage(msgPacket, msgTo));
        }else{}
        console.log("------------------------");
    }

    const guid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    const onMessage = (ws,store) => evt => {
        //Parse the JSON message received on the websocket
        var msg = evt.data;
        var storeVal = store.getState();
        var userid = storeVal.auth.userid;
        
        switch(msg.e) {
            case "auth_success":

                if (msg && msg.p && msg.p.id){

                    store.dispatch(auth(true, msg.p));
                    store.dispatch({type: 'SEND', msg: roster()});
                }
                break;

            case "roster":
                
                store.dispatch(updateRoster(msg.p))
                break;

            case "message":

                // play music
                if (userid != msg.p.sender_id){

                    store.dispatch(sound());
                }
                store.dispatch({type : 'SEND',msg : roster()});
                // store.dispatch(updateRoster(msg.p))
                break;

            case "readby_update":

                store.dispatch({type : 'SEND',msg : roster()});
                break;

            case "CHAT_MESSAGE":

                //Dispatch an action that adds the received message to our state
                store.dispatch(actions.messageReceived(msg.p));
                break;

            default:

                console.log("Received unknown message type: '" + msg.e + "'");
                break;
        }
    }

    return store => next => action => { 
        storeObj = store;    
        actionsObj = action;
        let url = config.wsUrl;
        config.domain = window.sessionStorage.getItem("vhost");
        // window.Strophe.WebSocket(url);
        switch(action.type) {
            //The user wants us to connect
            case 'CONNECT':
                // if (url == null)
                if (url.indexOf("ws://") == 0 || url.indexOf("wss://") == 0)
                    con = new window.Strophe.WebSocket(url);
                else
                    con = new window.Strophe.Connection(url);
                if (0) {
                    con.rawInput = function (str) { console.log("[createConnection] * input", str) };
                    con.rawOutput = function (str) { console.log("[createConnection] * output", str) };
                } else {
                    con.xmlInput  = inputStream.bind(store);
                    con.xmlOutput = outputStream.bind(store);
                }
                // let jid = guid()+"@testbot.com";
                // let jid = "rraj@bot.xavient.com/rraj";
                // let pass = "1@34567b"
                // let jid = action.username+"@"+config.domain+"/"+action.username;
                
                let jid = action.username
                let pass = action.password;
                window.sessionStorage.setItem("sData_con_jid",jid);
              
                con.connect(jid, pass, test.bind(con));
                break;
            
            case 'SEND_MESSAGE':
                let msg_from = window.sessionStorage.getItem("active_msg_from");
                // var msgTo = "admin_jobs@testbot.com";
                // if (msgTo != null){
                //     msgTo = msg_from;
                // }
               
                let msgTo = msg_from;
                jid = window.sessionStorage.getItem("sData_con_jid");
                console.log("sending message");
                console.log("msgTo ",msgTo);
                console.log("jid ",jid);
                console.log("msg_from ",msg_from);
                let msgType = config.chatType;
                let msg = action.value;
                var strWrapper = "<message to='" + msgTo + "' from='" + jid + "' type='"+msgType+"' xml:lang='en'> <body>" + xmlescape(msg) + "</body> </message>";
                // console.log(strWrapper);
                // xmlescape(msg)
                con.send(window.Strophe.xmlHtmlNode(strWrapper).firstElementChild);
                console.log("store value ", store.getState());
                
                break;
            case 'ACCEPT_INVITE':
                jid = window.sessionStorage.getItem("sData_con_jid");
                // let from = msg_from;
                let from = window.sessionStorage.getItem("active_msg_from");
                from = from.split('/');
                msgTo = from[0]+'/rraj';
                var o = {to:msgTo}; 
                var m = $pres(o);
                let current_date = (new Date()).toISOString();
                m.c('x', {xmlns : 'http://jabber.org/protocol/muc'}, null); 
                // m.c('history', {since:current_date}, null); 
                m.c('history', {maxstanzas:10}, null); 
                con.send(m.tree());
                store.dispatch(setRoster(from,true));
                break;
            case 'PASS_TO_BOT':
                // <iq type='get' to='bot.xavient.com' id='asas213123'> <query xmlns='xavbot:invite:bot:room' room_jid='"+msg['from'].bare+"' agent_jid='rraj@bot.xavient.com'/></iq>
                let msgfrom = window.sessionStorage.getItem("active_msg_from");
                con.sendIQ($iq({ type: "get", id: "asas213123", to: config.domain }).c("query", { xmlns: 'xavbot:invite:bot:room',  room_jid:msgfrom, agent_jid:'nnayak@'+config.domain }).tree(), function (data) { console.log("iq sent") });
                break;
            case 'SENTIMENT_API':
                let msg_fdata = window.sessionStorage.getItem("active_msg_from");
                let stateData = store.getState();
                console.log("  ----   ",stateData.message[msg_fdata]);
                let msg_payload = [];
                let msg_list = stateData.message[msg_fdata]
                for (let x in msg_list){
                    console.log(msg_list[x]);
                    // if (msg_list != "send")
                        msg_payload.push({
                            "sentence" : msg_list[x].txt,
                            "client" : "user",
                            "conversation_id":x
                        });
                }
               let bot_payload =JSON.stringify( {"conversation":msg_payload
                ,"conversation_client":"both"
                });
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://52.22.73.89:8000/api/v1.0/conversation/details/get",
                    "method": "POST",
                    "contentType": 'application/json',
                    "headers": {
                        "content-type": "application/json"
                    },
                    "processData": false,
                    "data": bot_payload
                }
                jQuery.ajax(settings).done(function (response) {
                    console.log(response);
                    store.dispatch(setSentiment(response));
                    
                });
                break;
            default:
                return next(action);
        }
    }
})();

export default socketMiddleware
