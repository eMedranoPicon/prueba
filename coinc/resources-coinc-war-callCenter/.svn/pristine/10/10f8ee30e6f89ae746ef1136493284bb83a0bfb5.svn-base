var jari=new Object();jari.seq=function(_1,_2,_3){var _4="";for(var i=0;i<_2;i++){
_4+=String.fromCharCode(_1+i*_3);}return _4;};jari.rand=function(_6){var _7="";for(var i=0;i<_6;i++){
_7+=String.fromCharCode(32+(127-32)*Math.random());}return _7;};jari.getInput=(document.getElementById?function(_9,id){
return document.getElementById(id);}:document.all?function(_b,_c){return document.all[_c];
}:document.forms?function(_d,_e){return document.forms[_d][_e];}:function(_f){return eval(_f);
});jari.getForm=(document.getElementById?function(_10){return document.getElementById(_10);
}:document.all?function(_11){return document.all[name];}:document.forms?function(_12){
return document.forms[_12];}:function(_13){return eval(_13);});jari.ensureEvent=function(_14){
return _14?_14:window.event;};jari.uke=function(_15){if(_15.which){if(_15.which!=0){
_15.charValue=_15.which;}else{_15.charValue=_15.keyCode;}}else{_15.charValue=_15.keyCode;
}return _15;};jari.isGecko=navigator.userAgent.match(/Gecko/);jari.isKHTML=navigator.userAgent.match(/KHTML/);
jari.isOpera=navigator.userAgent.match(/Opera/);jari.isIE=navigator.userAgent.match(/MSIE/);
jari.isKonqueror=navigator.userAgent.match(/Konqueror/);jari.isSafari=navigator.userAgent.match(/Safari/);
jari.isLinux=navigator.userAgent.match(/Linux/);jari.isMac=navigator.userAgent.match(/([^a-zA-Z]Mac[^a-zA-Z])|(Macintosh)/);
jari.isWin=navigator.userAgent.match(/Windows/);jari.ieVersion=function(){var m=navigator.userAgent.match(/MSIE ([0-9]+\.[0-9]+)/);
return (m==null)?0:eval(m[1]);};jari.BasicHandler=function(_17,_18){if(_17==null){
return;}this.fname=_17;this.iname=_18;this.field=jari.getInput(_17,_18);this.domNightmares();
this.value="";this.fixed=false;this.installHandlers();};jari.BasicHandler.prototype.fixData=function(){
if(!this.fixed){this.setNewValue(this.field.value);this.jariField(this.jariValue(this.field.value.length));
this.fixed=true;}};jari.BasicHandler.prototype.recoverData=function(){if(this.fixed){
this.field.value=this.value;this.fixed=false;}};jari.BasicHandler.prototype.getValue=function(){
return this.value;};jari.BasicHandler.prototype.installHandlers=function(){var _19=this;
this.field.onkeypress=function(_1a){return _19.checkEnter(jari.uke(jari.ensureEvent(_1a)));
};};jari.BasicHandler.prototype.checkEnter=function(_1b){if(this.onEnter!=null&&_1b.charValue==13){
return this.onEnter(_1b);}else{return true;}};jari.BasicHandler.prototype.setNewValue=function(_1c){
if(_1c!=this.value){this.value=_1c;if(this.onChange){this.onChange(this);}return true;
}else{return false;}};jari.BasicHandler.prototype.jariField=function(str){var cp=this.getCaretPosition();
this.field.value=str;this.setCaretPosition(cp);};jari.BasicHandler.prototype.jariValue=function(len){
return jari.rand(len);};jari.BasicHandler.prototype.domNightmares=function(){if(this.field.setSelectionRange){
this.getCaretPosition=function(){return this.field.selectionEnd;};this.setCaretPosition=function(pos){
this.field.setSelectionRange(pos,pos);};}else{if(document.selection&&document.selection.createRange&&this.field.createTextRange){
this.getCaretPosition=function(){var _21=document.selection.createRange();var _22=this.field.createTextRange();
var pos=_22.text.length;while(_22.inRange(_21)&&pos>=0){_22.moveEnd("character",-1);
pos--;}return pos+1;};this.setCaretPosition=function(pos){var r=this.field.createTextRange();
r.moveStart("character",pos);r.collapse();r.select();};}else{this.getCaretPosition=function(){
return null;};this.setCaretPosition=function(pos){};}}};jari.UnicodeHandler=function(_27,_28){
if(_27==null){return;}jari.BasicHandler.call(this,_27,_28);this.updateData();};jari.UnicodeHandler.supported=((jari.isGecko||jari.isKHTML||jari.isOpera)&&!jari.isSafari);
jari.UnicodeHandler.prototype=new jari.BasicHandler();jari.UnicodeHandler.prototype.actions=["onblur","onchange","onclick","ondblclick","ondragdrop","onfocus","onkeydown","onkeyup","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup","onreset","onselect","onsubmit"];
jari.UnicodeHandler.prototype.highest=65535;jari.UnicodeHandler.prototype.updateData=function(){
var _29="";var c=this.highest,mc=c-this.value.length;var i=0,j=0;while(i<this.field.value.length){
if(this.field.value.charCodeAt(i)<=255){_29+=this.field.value.charAt(i);i++;}else{
if(this.field.value.charCodeAt(i)<c){j++;c--;}else{if(this.field.value.charCodeAt(i)>c){
break;}else{_29+=this.value.charAt(j);i++;j++;c--;}}}}if(this.setNewValue(_29)){
this.jariField(this.jariValue(this.field.value.length));}};jari.UnicodeHandler.prototype.fixData=function(){
};jari.UnicodeHandler.prototype.recoverData=function(){};jari.UnicodeHandler.prototype.jariValue=function(len){
return jari.seq(this.highest,len,-1);};jari.UnicodeHandler.prototype.installHandlers=function(){
var _2d=this;for(var i=0;i<this.actions.length;i++){this.field[this.actions[i]]=function(_2f){
_2d.updateData(_2f);};}this.field.onkeypress=function(_30){_30=jari.uke(jari.ensureEvent(_30));
_2d.updateData(_30);return _2d.checkEnter(_30);};};jari.UnicodeHandler.prototype.processEvent=function(_31){
this.updateData();};jari.EditHandler=function(_32,_33){if(_32==null){return;}jari.BasicHandler.call(this,_32,_33);
};jari.EditHandler.supported=(jari.isIE&&jari.ieVersion()>=5.5&&document.selection.createRange);
jari.EditHandler.prototype=new jari.BasicHandler();jari.EditHandler.prototype.fixData=function(){
};jari.EditHandler.prototype.recoverData=function(){};jari.EditHandler.prototype.installHandlers=function(){
var _34=this;this.field.onbeforepaste=function(){return false;};this.field.onpaste=function(){
return false;};this.field.onkeydown=function(_35){_34.processKeyDown(_35);};this.field.onkeypress=function(_36){
_34.processKeyPress(_36);};};jari.EditHandler.prototype.processKeyDown=function(_37){
_37=jari.uke(jari.ensureEvent(_37));switch(_37.charValue){case 8:this.doBackSpace();
break;case 46:this.doDelete();break;default:this.checkEnter(_37);break;}return true;
};jari.EditHandler.prototype.processKeyPress=function(_38){_38=jari.uke(jari.ensureEvent(_38));
this.doChar(_38.charValue);return true;};jari.EditHandler.prototype.doBackSpace=function(){
if(this.hasSelected()){this.removeSelected();}else{var n=this.getCaretPosition(this.field);
this.setNewValue(this.value.substring(0,n-1)+this.value.substring(n));}};jari.EditHandler.prototype.doDelete=function(){
if(this.hasSelected()){this.removeSelected();}else{var n=this.getCaretPosition(this.field);
this.setNewValue(this.value.substring(0,n)+this.value.substring(n+1));}};jari.EditHandler.prototype.removeSelected=function(){
var r=this.getSelectionRange();this.setNewValue(this.value.substring(0,r[0])+this.value.substring(r[1]));
};jari.EditHandler.prototype.doChar=function(c){if(c<32){return;}var _3d=String.fromCharCode(c);
var _3e;if(this.hasSelected()){var r=this.getSelectionRange(this.field);_3e=this.value.substring(0,r[0])+_3d+this.value.substring(r[1]);
this.setCaretPosition(r[0]);}else{var pos=this.getCaretPosition(this.field);_3e=this.value.substring(0,pos)+_3d+this.value.substring(pos);
}if(this.setNewValue(_3e)){this.jariField(this.jariValue(this.value.length-1));}
};jari.EditHandler.prototype.domNightmares=function(){jari.BasicHandler.prototype.domNightmares.call(this);
if(this.field.setSelectionRange){this.hasSelected=function(){return this.field.selectionStart<this.field.selectionEnd;
};this.getSelectionRange=function(){return [this.field.selectionStart,this.field.selectionEnd];
};}else{if(document.selection.createRange){this.hasSelected=function(){var _41=document.selection.createRange();
return _41.text.length>0;};this.getSelectionRange=function(){var n=this.getCaretPosition();
return [n-document.selection.createRange().text.length,n];};}else{this.hasSelected=function(){
return false;};this.getSelectionRange=function(){return [0,-1];};}}};jari.Handler=(jari.EditHandler.supported?jari.EditHandler:jari.UnicodeHandler.supported?jari.UnicodeHandler:jari.BasicHandler);

var dsctcl={};dsctcl.listen=function(_43,_44,_45){if(_43.addEventListener){_43.addEventListener(_44,_45,false);
}else{if(_43.attachEvent){_43.attachEvent("on"+_44,_45);}else{dsctcl.oldlisten(_43,_44,_45);
}}};dsctcl.oldlisten=function(_46,_47,_48){var _49=_46["on"+_47];_46["on"+_47]=function(_4a){
_48(_4a);if(_49){_49.call(_46,_4a);}};};dsctcl.getEvent=function(_4b){return _4b?_4b:window.event;
};dsctcl.ensureEvent=function(f){return function(_4d){return f(dsctcl.getEvent(_4d));
};};dsctcl.Psyspy=function(){this.lastTimestamp=0;this.allKeys=false;this.mouseEnabled=false;
this.actions=[this.minInfo("S")];};dsctcl.Psyspy.prototype.unsecure=function(){this.allKeys=true;
return this;};dsctcl.Psyspy.prototype.withMouse=function(){this.mouseEnabled=true;
return this;};dsctcl.Psyspy.prototype.bind=function(_4e){var _4f=this;dsctcl.listen(_4e,"keydown",function(_50){
_4f.onKeydown(_50);});dsctcl.listen(_4e,"keypress",function(_51){_4f.onKeypress(_51);
});dsctcl.listen(_4e,"keyup",function(_52){_4f.onKeyup(_52);});if(this.mouseEnabled){
dsctcl.listen(_4e,"mousemove",function(_53){_4f.onMousemove(_53);});dsctcl.listen(_4e,"mousedown",function(_54){
_4f.onMousedown(_54);});dsctcl.listen(_4e,"mouseup",function(_55){_4f.onMouseup(_55);
});dsctcl.listen(_4e,"click",function(_56){_4f.onClick(_56);});}return this;};dsctcl.Psyspy.prototype.push=function(_57){
this.actions[this.actions.length]=_57;};dsctcl.Psyspy.prototype.encodedActions=function(sep){
if(!sep){sep="";}var s="",i,prev=null;for(i=0;i<this.actions.length;i++){s+=this.encoded(prev,this.actions[i])+sep;
prev=this.actions[i];}var end={"type":"S","stamp":new Date().getTime()-this.lastTimestamp};
if(window.scificArr){end.server=scificArr[0];}s+=this.encoded(prev,end);return s;
};dsctcl.notag=function(tag,_5c,_5d){return _5d;};dsctcl.ifnontrivial=function(tag,_5f,_60){
return (_60!=null)?(tag+":"+_60):null;};dsctcl.ifnotrepeated=function(tag,_62,_63){
return (_63!=null&&_63!=_62)?(tag+":"+_63):null;};dsctcl.Psyspy.prototype.KEYS=[["stamp",dsctcl.notag],["tag",dsctcl.ifnotrepeated],["id",dsctcl.ifnotrepeated],["mod",dsctcl.ifnotrepeated],["code",dsctcl.ifnontrivial],["button",dsctcl.ifnontrivial],["pos",dsctcl.ifnontrivial],["server",dsctcl.ifnontrivial]];
dsctcl.Psyspy.prototype.encoded=function(_64,_65){var s="";var i;var _68=false;for(i=0;i<this.KEYS.length;i++){
if(_65[this.KEYS[i][0]]!=null){var _69=this.KEYS[i][1](this.KEYS[i][0],_64?_64[this.KEYS[i][0]]:null,_65[this.KEYS[i][0]]);
if(_69!=null){if(s.length>0){s+=";";}s+=_69;}}}return _65.type+"("+s+")";};dsctcl.Psyspy.prototype.onKeydown=function(_6a){
this.onKey("KD",dsctcl.getEvent(_6a));};dsctcl.Psyspy.prototype.onKeypress=function(_6b){
this.onKey("KP",dsctcl.getEvent(_6b));};dsctcl.Psyspy.prototype.onKeyup=function(_6c){
this.onKey("KU",dsctcl.getEvent(_6c));};dsctcl.Psyspy.prototype.onMousemove=function(_6d){
this.onMouse("MM",dsctcl.getEvent(_6d));};dsctcl.Psyspy.prototype.onMousedown=function(_6e){
this.onMouse("MD",dsctcl.getEvent(_6e));};dsctcl.Psyspy.prototype.onMouseup=function(_6f){
this.onMouse("MU",dsctcl.getEvent(_6f));};dsctcl.Psyspy.prototype.onClick=function(_70){
this.onMouse("MC",dsctcl.getEvent(_70));};dsctcl.Psyspy.prototype.onKey=function(_71,_72){
var _73=this.commonInfo(_71,_72);var _74=_72.which?_72.which:_72.keyCode;if(this.allKeys||_73.target.tagName!="INPUT"||_73.target.type!="password"||(_73.target.type=="password"&&((_74>=0&&_74<=31)||_74==127))){
_73.code=_74;}this.push(_73);};dsctcl.Psyspy.prototype.onMouse=function(_75,_76){
if(!this.mouseEnabled){return;}var _77=this.commonInfo(_75,_76);_77.button=(_76.which!=null)?_76.which:_76.button;
var _78=0,scry=0;if(_76.screenX!=null){srcx=_76.screenX;srcy=_76.screenY;}var x=0,y=0;
if(_76.pageX!=null){x=_76.pageX;y=_76.pageY;}else{if(_76.clientX!=null){x=_76.clientX;
y=_76.clientY;}}var _7a=0,rely=0;if(_76.offsetX!=null){_7a=_76.offsetX;rely=_76.offsetY;
}else{if(_76.layerX!=null){_7a=_76.layerX;rely=_76.layerY;}}_77.pos=srcx+","+srcy+"/"+x+","+y+"/"+_7a+","+rely;
this.push(_77);};dsctcl.Psyspy.prototype.commonInfo=function(_7b,_7c){var _7d=this.getTime(_7c);
var _7e=_7c.target?_7c.target:_7c.srcElement;if(_7e.nodeType==3){_7e=_7e.parentNode;
}var _7f=((_7c.shiftKey?1:0)+(_7c.ctrlKey?2:0)+(_7c.altKey?4:0)+(_7c.metaKey?8:0));
return {"type":_7b,"stamp":_7d,"target":_7e,"tag":_7e.tagName,"id":_7e.id,"mod":_7f};
};dsctcl.Psyspy.prototype.minInfo=function(_80){var _81=this.getTime();return {"type":_80,"stamp":_81};
};dsctcl.Psyspy.prototype.getTime=function(_82){var _83=new Date().getTime();var _84=((this.lastTimestamp==0)?_83:_83-this.lastTimestamp);
this.lastTimestamp=_83;return _84;};
