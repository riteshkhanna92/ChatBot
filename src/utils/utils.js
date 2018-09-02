import _ from 'lodash';

export function intcomma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function valueIsEqual(value, other, deep) {
  if (value === other) {
    return true;
  } else if (_.isArray(value) || _.isArray(other)) {
    if (arrayIsEqual(value, other, deep)) {
      return true;
    }
  } else if (_.isObject(value) || _.isObject(other)) {
    if (objectMatchesSubset(value, other, deep)) {
      return true;
    }
  }
  return false;
};

export function xmlescape(text) {
  text = text.toString();
  text = text.replace(/\&/g, "&amp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  return text;
}
function extractData(iCalContent) {
  var rx = /\{.*\}/g;
  var arr = iCalContent.match(rx);
  return arr[0]; 
}
export function xmlGetMessage(text) {
  text = getBody(text);
  if (text.indexOf("CDATA") >= 0 && text != null) {
    
    let strInner = text.replace('<body>![CDATA[', '');
    strInner = strInner.replace('}]]</body>', '');
    // strInner = strInner.substring(strInner.indexOf(':') + 1).replace(' ', '').replace(/'/g, '');
    strInner = extractData(text);
    let strInnerObj = JSON.parse(strInner);
    return strInnerObj.content;
  } else {
    let strInner = text.replace('<body>',"");
    strInner = strInner.replace('</body>', '');
    let messageObject = { "link": {}, "table_columns": [], "table_rows": [], "txt": strInner, "buttons": {}, "button_class": "" };
    return messageObject;
  }
}
export function sanatizeMessage(str)  {
  str = str.replace(new RegExp('(?<=<)(.*)(?=>)','i'), "");
  str = str.replace(new RegExp('<>',''), "");
  return str;
}
export function getBody(content){
  if (typeof content == "undefined" || content == "" || content == null)
    return "";
  let re = /\<body>.*<\/body>/ig;
  let body = content.match(re);
  if (body != null && body.length > 0) 
    return body[0];
  else
    return "";
}
// function test if object is empty
export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}