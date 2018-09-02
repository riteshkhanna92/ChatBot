

// ----- xxxxxxx -----
var connection = null;
var con;
var startTime = (new Date()).getTime();
var templatePath = "https://bot.roshanraj.com/static/template.html";
// var msgType = "chat";
var msgType = "groupchat";
// var templatePath = "/template.html";
// var msgTo = 'testhelpdesk@testbot.com';
var msgTo = "nnayak@bot.xavient.com";
var botUser = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAR0JADQmLnnhAAACMUlEQVRIx52VMWhTURSGv/vaFKUNsXSokqUudtAqhS5BG1Kx0KFIhi4FLRlFoUPpEKcuDs5CpYtLdRCiUAhSIYuEClJcqoLESVqCDWLaUIMSa36HJi8veS/PtP907rn/+e855753LvhAQ9rUpob8OJbfJnPsscccJ4WiOtCBon6cbr9Nk9VjMNkTC+gGk3TpM2nzo+0hbYNnuc8XNjjFdSIkzMvjVT+rgsbs1aSKih8nvEvfFGvynNeF//ZAhimuAHCO32R1hzNNInVji9dGLgGFeM93PtSWdwkw1Cxg4yaPNGZKrWnPa7XjElc1X7cbX+IU6x03aZ0pt4BVL1IBhTzPDSlgt8NyC9T3wmyzo2mXf5odthVu9VugZpEJiqSIuxKIk6LIRJOoBZYWKCklg2olpNklwopLYIUIu6TtYKMUJS2gvBZ1KKmq8Y5vYVxVSYdaVB4tqaKM+hXs+A4ABdWvjCpaAtQLoKRGOg4fUZJaZDeYMgAxvvKxRhjmGYGWqD/cMrmafZEYD48ivefBKIYkgywzA7zgHgUeMErOTfUWqBImQS89JIAeZigTpupFbQjI4V0jSAB4BcAbADKsOdvgFnjLVZ4fmabCE98uXmOjbtojTYN8ImP/zn64zCSXTKFFANTH7dpA8ccWT81PVwZOqIu4xzWumb9+TXTiLAkPgXfk3dT2Y32Y047lL5Pz5rUR0ABZeh2OMlHvx6V9Bn1N5R022tYRNKB9ObGvAW/mP+Zn3DkPCuMEAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAxLTI5VDA5OjAwOjUyKzAxOjAw/ckVTgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMS0yOVQwOTowMDo1MiswMTowMIyUrfIAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC";
function xmlescape(text) {
    text = text.toString();
    text = text.replace(/\&/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    return text;
}

function getJid() {
    let jid = window.localStorage.getItem("sData_con_jid");
    if (jid == null) {
        return "";
    } else {
        return jid;
    }
}

function addToLog(type, msg) {
    console.log(type, " ----- ", msg);
    var d = (new Date()).getTime() - startTime;
    $("#log").append("<div class='" + type + "'>" + (d / 1000).toFixed(2) + " " + xmlescape(msg) + "</div>");
    // $("#log").scrollTop(1000000);
}

function onConnect(c, status) {
    if (!status)
        status = c;
    var statusMsg = "";
    for (i in Strophe.Status)
        if (Strophe.Status[i] == status)
            statusMsg = i;

    console.info("onConnect", status, statusMsg);

    if (!con)
        if (0) {
            c.rawInput = function (str) { addToLog("input -> ", str) };
            c.rawOutput = function (str) { addToLog("output -> ", str) };
        } else {
            c.xmlInput = function (el) { if (el.nodeType != 3) return; var d; try { d = Strophe.serialize(el) } catch (e) { d = el }; addToLog("input #-> ", d) };
            c.xmlOutput = function (el) { if (el.nodeType != 3) return; var d; try { d = Strophe.serialize(el) } catch (e) { d = el }; addToLog("output #-> ", d) };
        }
    //con = c;
    if (status == Strophe.Status.CONNFAIL || status == Strophe.Status.AUTHFAIL) {
        addToLog("msg", "Connection error");
        $("#chattext").prop('disabled', true);
    } else if (status == Strophe.Status.DISCONNECTED) {
        addToLog("msg", "Disconnected");
        $("#chattext").prop('disabled', true);
        // reconnecting
        let url = window.localStorage.getItem("sData_con_url");
        let jid = window.localStorage.getItem("sData_con_jid");
        let pass = window.localStorage.getItem("sData_con_password");
        botinit(url, jid, pass);
        console.log('Due to some reason connection is not established.');
    } else if (status == Strophe.Status.REBINDFAILED) {
        addToLog("msg", "Rebind failed");

    } else if (status == Strophe.Status.CONNECTED || status == Strophe.Status.ATTACHED) {
        con.send($iq({ type: "set" }).c("enable", { xmlns: "urn:xmpp:carbons:1" }));
        addToLog("msg", "Connected");
        $("#chattext").prop('disabled', false);
        if ($("#priority").val() == "on")
            con.send($pres().c("priority").t("1"));
        else
            con.send($pres());
        // con.sendIQ($iq({ type: "get" }).c("query", { xmlns: Strophe.NS.ROSTER }).tree(), onRoster);
        // send room join iq
        // con.sendIQ($iq({ type: "get", id: "asas213123", to: 'bot.xavient.com' }).c("query", { xmlns: 'xavbot:simulate:create:room' }).tree(), function (data) { console.log("mic one two three testing") });
        // console.log("###---  ",$iq({ type: "get" }).c("query", { xmlns: Strophe.NS.ROSTER }).tree(), onRoster);

        // con.sendIQ()
        // <iq type='get' to='bot.xavient.com' id='asas213123'> <query xmlns='xavbot:simulate:create:room'/></iq>
    }

    else {

    }
}

function onRoster(stanza) {
    $(stanza).find("item").each(function () {
        $("#roster-content").append("<div>" + Strophe.xmlescape($(this).text() + " - " + $(this).attr("jid")) + "</div>");
    })
}

function enableLogin() {
    $("#roster").hide();
    $("#login-box").show();
    $("#connect").removeAttr("disabled");
    $("#disconnect").removeAttr("disabled");
}

function enableRoster() {
    $("#roster").show();
    $("#login-box").hide();
    $("#connect").removeAttr("disabled");
    $("#disconnect").removeAttr("disabled");
    $("#roster-content > *").remove();
}

function freeze() {
    console.log("freeze connections");
    return con.freeze();
}
$(window).bind("beforeunload", function () {
    // alert("unload");
    if (con && con.connected)
        $.jStorage.set("sData", [$("#connection_url").val(), freeze()]);
    // $.jStorage.set("sData_con_url", $("#connection_url").val());
});

if (!window.console) {
    window.console = {}
    console.log = console.info = console.error = function (msg) { addToLog("msg", msg) };
}

function createConnection(url) {
    
    if (url == null)
        url = $("#connection_url").val();
    if (url.indexOf("ws://") == 0 || url.indexOf("wss://") == 0)
        con = new Strophe.WebSocket(url);
    else
        con = new Strophe.Connection(url);

    if (0) {
        con.rawInput = function (str) { addToLog("[createConnection] * input", str) };
        con.rawOutput = function (str) { addToLog("[createConnection] * output", str) };
    } else {
        con.xmlInput = getRoboAnswer
        con.xmlOutput = getRoboAnswer
    }
}

function handleClick(payload) {
    $("#chattext").val(payload);
    var e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $("#chattext").trigger(e);
}
function messageFormater(message) {
    addToLog("message received ---> ", message);
    return message;
}
function richMessageFormater(message) {
    let formatedMessage = "";
    console.log(typeof message);
    if (typeof message !== "undefined") {
        if (message.indexOf('{') === -1 && message.indexOf('}') === -1) {
            formatedMessage = message;
        } else {
            var msgObject = JSON.parse(message);
            console.log(msgObject);
            // process text 
            formatedMessage = formatedMessage + msgObject.txt + "";

            // process table
            if (msgObject.table_columns.length > 0) {
                formatedMessage = formatedMessage + " <div class='tableSubs'><table class='botsAutotble'><tr>";
                // <td></td> </th> <tbody></tbody> </table>"
                for (let column in msgObject.table_columns) {
                    formatedMessage = formatedMessage + "<th>" + msgObject.table_columns[column] + "</th>"
                }
                formatedMessage = formatedMessage + "</tr>";
                for (let row in msgObject.table_rows) {
                    formatedMessage = formatedMessage + "<tr>";
                    for (let col in msgObject.table_rows[row]) {
                        formatedMessage = formatedMessage + "<td>" + msgObject.table_rows[row][col] + "</td>"
                    }
                    formatedMessage = formatedMessage + "</tr>";
                }
                formatedMessage = formatedMessage + " </th> <tbody></tbody> </table></div>";
            }
            // process buttons
            for (var i in msgObject.buttons) {
                formatedMessage = formatedMessage + "<button class='chatBtn' onclick='handleClick(\"" + msgObject.buttons[i] + "\")'>" + i + "</button>";
            }
            // process link
            if (!jQuery.isEmptyObject(msgObject.link)) {
                $.each(msgObject.link, function (key, val) {
                    formatedMessage += '<a target="_blank"  href="' + val + '">' + key + '</a>';
                });
            }
        }

        return formatedMessage;

    } else {
        console.log("message object undefined");
    }
    return message;
}
function getRoboAnswer(el) {
    let rawDump = Strophe.serialize(el);
    addToLog("[createConnection] output", rawDump)
    // msgTo = el.attributes['from'];
    // if (typeof msgTo != "undefined" && typeof msgTo.from != "undefined")
    // let a =  Strophe.serialize(el);
    // console.log(a);
    // bot_d7671c33-0d2f-da58-dfd8-0a2a42324a2d@conference.bot.xavient.com/d7671c33-0d2f-da58-dfd8-0a2a42324a2d
    msgTo = Strophe.getBareJidFromJid(el.getAttribute('from'));
    Strophe.getBareJidFromJid(el.getAttribute('msgResource'));
    let msgFrom = Strophe.getBareJidFromJid(el.getAttribute('to'));
    // console.log(Strophe.getBareJidFromJid(el.getAttribute('nickname')));
    console.log("msgFrom -#- ", msgTo);
    console.log("msgTo   -#- ", msgFrom);
    let j_id = getJid().split("@")[0];
    console.log("jid     -#- ", j_id);
    let own_msg_to_jid = 'bot_' + j_id + '@conference.bot.xavient.com/' + j_id;
    if (msgTo == null || msgTo == j_id || rawDump.indexOf(own_msg_to_jid) >= 0) {
        return;
    }

    // if(msgTo == null){
    //     return;
    // }

    var innerStr = el.innerHTML;
    if (innerStr != undefined) {
        if (innerStr.indexOf("CDATA") >= 0 && msgTo != null && msgTo.indexOf('conference.bot') >= 0) {
            var strInner = innerStr.replace('<body>![CDATA[', '');
            strInner = strInner.replace('}]]</body>', '');
            strInner = strInner.substring(strInner.indexOf(':') + 1).replace(' ', '').replace(/'/g, '');
            var chatBotStr = '<div class="autoCon">';
            // chatBotStr += '<div class="acimgCon"><img src="'+botUser+'" /><div class="autochat">' + richMessageFormater(strInner) + '</div></div></div>';
            chatBotStr += '<div class="acimgCon"><div class="imgStndaln"><img src="' + botUser + '" /></div><div class="autochat">' + richMessageFormater(strInner) + '</div></div></div>';
            $('.userChatArea').append(chatBotStr);
            console.log("msg     -- ", strInner);
        }
        else {
            if (typeof innerStr == "string" && innerStr != '' && msgTo != null && msgTo.indexOf('conference.bot') >= 0 && innerStr.indexOf("<body>") >= 0) {
                var strInner = innerStr.replace('<body>', '');
                strInner = strInner.replace('</body>', '');
                var chatBotStr = '<div class="autoCon">';
                // chatBotStr += '<div class="acimgCon"><img src="'+botUser+'" /><div class="autochat">' + richMessageFormater(strInner) + '</div></div></div>';
                chatBotStr += '<div class="acimgCon"><div class="imgStndaln"><img src="' + botUser + '" /></div><div class="autochat">' + richMessageFormater(strInner) + '</div></div></div>';
                $('.userChatArea').append(chatBotStr);
                console.log("msg     -- ", strInner);
            }

        }
        scrollDown();
    }
}

function attach(data) {
    addToLog("msg", "Prebind succeeded. Attaching...");

    var $body = $(data.documentElement);
    con.attach($body.attr("jid"),
        $body.attr("sid"),
        $body.attr("rid"),
        onConnect,
        60, 1);
}

var con;
$(document).ready(function () {
    var newDiv = document.createElement("div");
    newDiv.id = "chatbox"
    document.body.appendChild(newDiv);

    var jid = "";
    var pass = "";
    var _$ = $;
    $.get(templatePath, function (data, textStatus, XMLHttpRequest) {
        var markup = data; //"<tr><td colspan='2'>${Name}</td><td>Released: ${ReleaseYear}</td><td>Director: ${Director}</td></tr>"

        /* Compile markup string as a named template */
        // $.template("template", markup ); 

        _$('#chatbox').html(
            //Specify the template container (or file name of external template)
            markup
        )

    });


    try {
        if (!$("#connection_url").val() && document.location.host != '')
            $("#connection_url").val("ws://" + document.location.host + ":5280/xmpp");
        else
            addToLog('issue', "Not valid ip provided");
        //$("#connection_url").val("http://"+document.location.host+":5280/http-bind")
        enableLogin();

        Strophe.log = function (level, str) { addToLog("log", str) };

        $("#xmlinputsend").bind("click", function () {
            // alert("hello");
            // var strWrapper = "<message to='admin2@testbot.com' from='testuser5@testbot.com' type='chat' xml:lang='en'> <body>" + $("#chattext").val() + "</body> </message>";
            // var strWrapper = "<message to='admin1@testbot.com' from='" + jid + "' type='chat' xml:lang='en'> <body>" + $("#chattext").val() + "</body> </message>";
            var strWrapper = "<message to='" + msgTo + "' from='" + jid + "' type='" + msgType + "' xml:lang='en'> <body>" + $("#chattext").val() + "</body> </message>";
            con.send(Strophe.xmlHtmlNode(strWrapper).firstElementChild);
            $("#chattext").val("");
        })

        $("#connect").bind("click", function () {
            jid = $("#jid").val();
            pass = $("#pass").val();
            // do something if jid and password is provided null
            createConnection($("#connection_url").val());
            $("#connect").attr("disabled", "true");
            if (jid !== "" && pass !== "")
                con.connect(jid, pass, onConnect);
            else
                console.log("jid and password not provided");

            // use of make connection  
            // if(0)Strophe.makeConnection("http://"+document.location.host+":5280/http-bind",
            //                        "ws://"+document.location.host+":5280/xmpp",
            //                        $("#jid").val(), $("#pass").val(), onConnect)
        });

        $("#prealloc").bind("click", function () {
            jQuery.support.cors = true;
            addToLog("msg", "prealloc start");
            createConnection($("#connection_url").val());
            $.ajax({
                type: 'POST',
                crossDomain: true,
                url: "https://a." + document.location.host + ":5281/preallocate", // to discuss 
                headers: { Zuma: "100" },
                xhrFields: { withCredentials: true },
                contentType: 'text/xml',
                processData: false,
                data: $build('body', {
                    jid: $("#jid").val(),
                    pass: $("#pass").val(),
                    rid: '' + Math.floor(Math.random() * 4294967295),
                    wait: '60',
                    hold: '1'
                }).toString(),
                dataType: 'xml',
                success: attach,
                error: function (e, f, g) { window.er = e; addToLog("msg", "" + e + "," + f + "," + g) }
            });
            $("#connect").attr("disabled", "true");
        });
        $("#freeze").bind("click", function () {
            var data = freeze();
            $.jStorage.set("sData", [$("#connection_url").val(), freeze()]);
            addToLog("msg", data);
        });
        $("#duprid").bind("click", function () {
            con.send("", 1);
        });
        $("#disconnect").bind("click", function () {
            $("#disconnect").attr("disabled", "true");
            con.disconnect();
        });
        var sData = $.jStorage.get("sData");
        var sData_con_url = $.jStorage.get("sData_con_url");
        if (sData && sData_con_url) {
            $("#connection_url").val(sData[0]);
            createConnection(sData_con_url);
            con.thaw(sData[1], onConnect);
            // Strophe.makeConnection("http://"+document.location.host+":5280/http-bind",
            //                        "ws://"+document.location.host+":5280/xmpp",
            //                        $("#jid").val(), $("#pass").val(), onConnect, sData[1]);
            $.jStorage.deleteKey("sData");
        }
    } catch (ex) {
        console.log("No old session found");
    }


    $("#chattext").keypress(function (e) {
        var appRoboTxt = '';
        if (e.which == 13) {
            var val = $("#chattext").val();

        }
    });
    // test tab reload 
    if (window.performance) {
        console.info("window.performance work's fine on this browser");
    }
    if (performance.navigation.type == 1) {
        console.info("This page is reloaded");
        con.disconnect();
    } else {
        console.info("This page is not reloaded");
    }

});


//  __     __             __       ___                    __   __                    
// |  |--.|  |_.--------.|  |    .'  _|.--.--.-----.----.|  |_|__|.-----.-----.-----.
// |     ||   _|        ||  |    |   _||  |  |     |  __||   _|  ||  _  |     |__ --|
// |__|__||____|__|__|__||__|    |__|  |_____|__|__|____||____|__||_____|__|__|_____|


function handleOpenClose() {

    IsTicketProcessStarted = 0;
    NextStep = 0;
    CatSubCatval = 0;
    seltctedCat = 0;
    selectedSubCat = 0;
    // jsonObjTicket.nextStepVal = "";


    $(this).find('img').toggle();
    $(".videoTab").click(function () {
        $(".videoTab").addClass('active')
        $(".audioTab").removeClass('active')
    });
    $(".audioTab").click(function () {
        $(".audioTab").addClass('active')
        $(".videoTab").removeClass('active')
    });
    var chatBox = document.getElementById("fullShowchat");
    if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
    } else {
        chatBox.style.display = "block";
    }
}

function highlight(image) {
    image.src = "images/iconGIFactive.png"; //Blue Image
}
function unhighlight(image) {
    image.src = "images/icon_gif.png"; //Gray Image
}

function highlightemoji(image) {
    image.src = "images/icon_emoji_active.png"; //Blue Image
}
function unhighlightemoji(image) {
    image.src = "images/icon_emoji.png"; //Gray Image
}

function highlighticonatt(image) {
    image.src = "images/icon_attachment_active.png"; //Blue Image
}
function unhighlighticonatt(image) {
    image.src = "images/icon_attachment.png"; //Gray Image
}
function showspeech() {
    $(".brdrChatin").css("display", "none");
    $(".brdrvideoChatin").css("display", "block");
}
function showtext() {
    $(".brdrvideoChatin").css("display", "none");
    $(".brdrChatin").css("display", "block");
}
function scrollDown() {
    // $(".userChatArea").animate({ scrollTop: $(document).height() }, 1000);


    // $(".userChatArea").animate({ scrollTop: 0 }, 1000);
    var $target = $('.userChatArea');
    // console.log($target.height());
    $(".chatarea").stop().animate({ scrollTop: $target.height() }, 1000);
}
function sendMsg(msg) {
    let jid = window.localStorage.getItem("sData_con_jid");

    var strWrapper = "<message to='" + msgTo + "' from='" + jid + "' type='" + msgType + "' xml:lang='en'> <body>" + msg + "</body> </message>";
    console.log(strWrapper);
    con.send(Strophe.xmlHtmlNode(strWrapper).firstElementChild);
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function botinit(url, jid, pass) {
    // $("#connect").attr("disabled", "true");
    // jid = guid() + "@testbot.com" // remove once live
    // jid = guid()+"@bot.xavient.com";
    jid = "michael45@bot.xavient.com";
    // pass = guid();
    pass = "";
    console.log("jid -- >> " + jid);
    console.log("password ---->>> "+ pass);
    if (jid !== ""  && url !== "") {
        createConnection(url);
        window.localStorage.setItem("sData_con_url", url);
        window.localStorage.setItem("sData_con_jid", jid);
        window.localStorage.setItem("sData_con_password", pass);
        con.connect(jid, pass, onConnect);
        sendMsg.bind(con);
    }
    else
        console.log("jid and password not provided");
}
