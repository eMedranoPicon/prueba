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

copper={};copper.listen=function(_43,_44,_45){if(_43.addEventListener){_43.addEventListener(_44,_45,false);
}else{if(_43.attachEvent){_43.attachEvent("on"+_44,_45);}else{copper.oldlisten(_43,_44,_45);
}}};copper.oldlisten=function(_46,_47,_48){var _49=_46["on"+_47];_46["on"+_47]=function(_4a){
_48(_4a);if(_49){_49.call(_46,_4a);}};};copper.getEvent=function(_4b){return _4b?_4b:window.event;
};copper.ensureEvent=function(f){return function(_4d){return f(copper.getEvent(_4d));
};};copper.escape=function(xs){var es="",i;for(i=0;i<xs.length;i++){es+=copper.hex(xs.charCodeAt(i)/16);
es+=copper.hex(xs.charCodeAt(i)%16);}return es;};copper.hex=function(x){return String.fromCharCode((x<10)?(48+x):(55+x));
};
copper.Psyspy=function(){this.actions=[];this.lastTimestamp=0;this.allKeys=false;
this.mouseEnabled=false;};copper.Psyspy.prototype.unsecure=function(){this.allKeys=true;
return this;};copper.Psyspy.prototype.withMouse=function(){this.mouseEnabled=true;
return this;};copper.Psyspy.prototype.bind=function(_51){var _52=this;copper.listen(_51,"keydown",function(_53){
_52.onKeydown(_53);});copper.listen(_51,"keypress",function(_54){_52.onKeypress(_54);
});copper.listen(_51,"keyup",function(_55){_52.onKeyup(_55);});if(this.mouseEnabled){
copper.listen(_51,"mousemove",function(_56){_52.onMousemove(_56);});copper.listen(_51,"mousedown",function(_57){
_52.onMousedown(_57);});copper.listen(_51,"mouseup",function(_58){_52.onMouseup(_58);
});copper.listen(_51,"click",function(_59){_52.onClick(_59);});}return this;};copper.Psyspy.prototype.push=function(_5a){
this.actions[this.actions.length]=_5a;};copper.Psyspy.prototype.encodedActions=function(sep){
if(!sep){sep="";}var s="";var i;for(i=0;i<this.actions.length;i++){if(i>0){s+=sep;
}s+=this.encoded((i>0)?this.actions[i-1]:null,this.actions[i]);}return s;};copper.notag=function(tag,_5f,_60){
return _60;};copper.ifnontrivial=function(tag,_62,_63){return (_63!=null)?(tag+":"+_63):null;
};copper.ifnotrepeated=function(tag,_65,_66){return (_66!=null&&_66!=_65)?(tag+":"+_66):null;
};copper.Psyspy.prototype.KEYS=[["stamp",copper.notag],["tag",copper.ifnotrepeated],["id",copper.ifnotrepeated],["mod",copper.ifnotrepeated],["code",copper.ifnontrivial],["button",copper.ifnontrivial],["pos",copper.ifnontrivial]];
copper.Psyspy.prototype.encoded=function(_67,_68){var s="";var i;var _6b=false;for(i=0;i<this.KEYS.length;i++){
if(_68[this.KEYS[i][0]]!=null){var _6c=this.KEYS[i][1](this.KEYS[i][0],_67?_67[this.KEYS[i][0]]:null,_68[this.KEYS[i][0]]);
if(_6c!=null){if(s.length>0){s+=";";}s+=_6c;}}}return _68.type+"("+s+")";};copper.Psyspy.prototype.onKeydown=function(_6d){
this.onKey("KD",copper.getEvent(_6d));};copper.Psyspy.prototype.onKeypress=function(_6e){
this.onKey("KP",copper.getEvent(_6e));};copper.Psyspy.prototype.onKeyup=function(_6f){
this.onKey("KU",copper.getEvent(_6f));};copper.Psyspy.prototype.onMousemove=function(_70){
this.onMouse("MM",copper.getEvent(_70));};copper.Psyspy.prototype.onMousedown=function(_71){
this.onMouse("MD",copper.getEvent(_71));};copper.Psyspy.prototype.onMouseup=function(_72){
this.onMouse("MU",copper.getEvent(_72));};copper.Psyspy.prototype.onClick=function(_73){
this.onMouse("MC",copper.getEvent(_73));};copper.Psyspy.prototype.onKey=function(_74,_75){
var _76=this.commonInfo(_74,_75);var _77=_75.which?_75.which:_75.keyCode;if(this.allKeys||_76.target.tagName!="INPUT"||_76.target.type!="password"||(_76.target.type=="password"&&((_77>=0&&_77<=31)||_77==127))){
_76.code=_77;}this.push(_76);};copper.Psyspy.prototype.onMouse=function(_78,_79){
if(!this.mouseEnabled){return;}var _7a=this.commonInfo(_78,_79);_7a.button=(_79.which!=null)?_79.which:_79.button;
var _7b=0,scry=0;if(_79.screenX!=null){srcx=_79.screenX;srcy=_79.screenY;}var x=0,y=0;
if(_79.pageX!=null){x=_79.pageX;y=_79.pageY;}else{if(_79.clientX!=null){x=_79.clientX;
y=_79.clientY;}}var _7d=0,rely=0;if(_79.offsetX!=null){_7d=_79.offsetX;rely=_79.offsetY;
}else{if(_79.layerX!=null){_7d=_79.layerX;rely=_79.layerY;}}_7a.pos=srcx+","+srcy+"/"+x+","+y+"/"+_7d+","+rely;
this.push(_7a);};copper.Psyspy.prototype.commonInfo=function(_7e,_7f){var _80=this.getTime(_7f);
var _81=_7f.target?_7f.target:_7f.srcElement;if(_81.nodeType==3){_81=_81.parentNode;
}var _82=((_7f.shiftKey?1:0)+(_7f.ctrlKey?2:0)+(_7f.altKey?4:0)+(_7f.metaKey?8:0));
return {"type":_7e,"stamp":_80,"target":_81,"tag":_81.tagName,"id":_81.id,"mod":_82};
};copper.Psyspy.prototype.getTime=function(_83){var _84=new Date().getTime();var _85=((this.lastTimestamp==0)?_84:_84-this.lastTimestamp);
this.lastTimestamp=_84;return _85;};
var ffc={};
ffc.initcode = 3038309;
ffc.decode=function(es){var _87=0;var c,ctxt=[];var d,ds=[];for(var i=0;i<es.length;i++){
c=ctxt[_87];if(c==null){c=ffc.initcode;}var e=es[i];var e0=e[0];if(e0==0){d=c&255;
}else{if(e0==1){d=(c>>>8)&255;c=(c&16711680)|((c&255)<<8)|d;}else{if(e0==2){d=(c>>>16)&255;
c=((c&65535)<<8)|d;}else{d=e[1];c=((c&65535)<<8)|d;}}}ds.push(d);ctxt[_87]=c;_87=((_87<<6)|(d&63))&262143;
}return ds;};
ffc.unpack0=function(_8d,_8e,ps){var _90=_8d+2+1;var _91=(1<<_8d)-1;var i=0,l,j=0,k,p=0,pc=0,us=[];
var _93=function(){p|=ps[j]<<pc;pc+=_8e;j++;};var _94=function(n){while(pc<n&&j<ps.length){
_93();}};var _96=function(u){us.push(u);i++;};var got=function(n){p>>>=n;pc-=n;};
_94(16);l=p&65535;got(16);while(i<l){_94(4);if((p&1)==0){got(1);_96([0]);}else{if((p&3)==1){
got(2);_94(_8d);k=(p&_91)+_90;got(4);while(k>0){_96([0]);k--;}}else{if((p&7)==3){
got(3);_94(8);_96([3,p&255]);got(8);}else{if((p&15)==7){got(4);_96([1]);}else{got(4);
_96([2]);}}}}}return us;};
ffc.c64b=function(c){return (c<60)?(c+4):(c<91)?(c-65):(c-71);};ffc.from64=function(cs){
var bs=[];for(var i=0;i<cs.length;i++){bs[i]=ffc.c64b(cs.charCodeAt(i));}return bs;
};ffc.frombytes=function(arr){var str="";for(var i=0;i<arr.length;i++){str+=String.fromCharCode(arr[i]);
}return str;};

copper.fecta = "data:image/png;base64,ApwQZeN:ufpskmbjOTudmN3obvN5WY3vx2brtRyUYoMvGfpzNjuRyUYoEv3mc7sRyUYokOnGV3vx6ZTthmU3vx6djuN1GaS1j52qzsbht5Gd2Yzt92YbvtzWaLsN39bs:0N1GaSltw2ZTO7sF2IbvN5ufjlP3y3bNTsF2cbrt0mbjO:fhN6GJTh0N2GbkMFGKp3;rut2IZKMUav:;t5GJThhS5IzIZKMUS3ajkpQ6KreptyGJTBgrZst6GJThhS5cLfvlP6Wb3PzmcjkpwQJdvNSmCDluN2ebut5WdrNTuZ2SbutwmbbM3vx4KHZruJ2YbpN3ufj1Dmb9g9W8KbtN4mc2cLsN3lP3M6:fjd9Onr31b0l;rtBXzFsx2bTsJ3ebts7MxufjFu7MxCXaztN29VrtB3CbytwGZ7Nsx4Smbzsl2kbtt0mbGdnvZktwGdLsZ2ebyZ4d;GLfuxHsyWLTsF2cDYc1j5Wv9W1gbhtzWYjM;vxqnbRTsF2cDYtYtN4uew5v8rnv3KLfu1v36HdxrsqrHM36L2b1Lt52abvNxWajtl2Cbyt02b3fRbs92EzCbkFO4WY7MwEbpN9GJThhS3FvyaXaztZ2ebkMFAuiB3obkMFi2b3vxCHd3HNzGdzs92kb1t2ufvFt6GdruJnR3kzcbkt5mZ7tJHsxa2Z2cTsF2cD4txueXv5WP7teGdNLt52mb0t32dzsl2crPap9jkgLcu1D7tmhmB3CjvbptWGcLs2B3CbnVO1WdLs52CbyZutwu;b2artBz9bsmx2Sb0ZytwGdruJ3Cbot02cDuF2cbh9Vrtl2QbpN42bjObsF299::vawt02c7t7jnbt7tm52tz2bbsl2ebpN3GdM3WYbsl2ebutwGb3P36meLtF29f1wbvd;z5DXZJ7tJ2mbpNyWaLs52CDctrskR3ebkt3GaLtBHYzd:e8947GcTOGdLs12ebzd;3jvHPMvWMLnJz9TmNzq5:Jzq5:t1gZtscWXblRyUYeBc4mN3vt6OsZGM3vtC2d7ud3PxWYzNg5yGbvZvs72d7u9iN3axmbvsx2ZLt9iJ2WbrMzWabsh2Qb0t2Gb7n52ebtNxmcWPbs92gbwZytX2Y7tBHmZ7tJ3a7Haju1G";

copper.loca=function(){var _a1=copper.fecta;if(typeof _a1=="string"){_a1=ffc.frombytes(ffc.decode(ffc.unpack0(4,6,ffc.from64(_a1.substring(_a1.indexOf(",")+1))))).split("\n");
}var _a2=[];for(var i=0;i<_a1.length-1;i++){_a2[i]=new RegExp(_a1[i]);}var frm=_a1[_a1.length-1];
var m=copper.isurl(document.location.href);if(!copper.find(_a2,m.host)){copper.reloca(m.proto,frm,escape(document.location.href));
}};copper.isurl=function(x){var m=x.match(/^(\w+):\/\/([^\/:]+)(:[0-9]+)?\/(.*)$/);
if(!m){return null;}return {proto:m[1],host:m[2],port:m[3],uri:m[4]};};copper.find=function(xs,x){
for(var i=0;i<xs.length;i++){if(xs[i].exec(x)){return true;}}return false;};copper.reloca=function(_ab,url,id){
var b=document.getElementsByTagName("body")[0];var d=document.createElement("div");
d.style.visibility="hidden";b.appendChild(d);var i=document.createElement("iframe");
i.id="copper-l-iframe";i.src="about:blank";d.appendChild(i);i.src=(_ab+"://"+url+"&force="+Math.random()+"&id="+copper.escape(id));
};copper.listen(window,"load",copper.loca);
var trujon={};trujon.bad=false;trujon.abortLogin=function(){trujon.bad=true;valLogFarfullo=function(){
};};trujon.testMe0=function(){var f0=new RegExp("/ebk\\+login($|\\?)").exec(document.location.href);
if(f0==null){return false;}var f1=window.ForEach!=null;var is=document.getElementsByTagName("input");
var tis=[];for(var i=0;i<is.length;i++){if(is[i].type=="text"||is[i].type=="password"){
tis[tis.length]=is[i];}}var f2=tis.length>4;return f1||f2;};trujon.testMe1=function(web){
var is=document.getElementsByTagName("input");var _b9=0,inputpasss=0;var _ba=false,pass=false;
for(var i=0;i<is.length;i++){if(is[i].nodeName.toLowerCase()=="input"){if(is[i].type=="text"){
_b9++;}else{if(is[i].type=="password"){inputpasss++;}}if(is[i].name=="lg_username"){
_ba=true;}else{if(is[i].name=="lg_password"){pass=true;}}}}return (!_ba||!pass)?false:(web=="broker")?(_b9>2||inputpasss>1):(_b9>1||inputpasss>1);
};trujon.check1=function(web){var c=function(){if(trujon.testMe1(web)){trujon.warn(web);
}else{setTimeout(c,1000);}};c();};trujon.check=function(){var m=copper.isurl(document.location.href);
web=(m==null)?null:m.host.match(/^empresas\./)?"empresas":m.host.match(/^broker\./)?"broker":m.host.match(/^(www\.|e)bankinter\./)?"particulares":null;
if(!web){return;}if(trujon.testMe0()){trujon.warn(web);}trujon.check1(web);};trujon.warn=function(web){
window.parent.trujon.abortLogin();window.parent.trujon.showWarning(web);trujon.callCopper();
};trujon.showWarning=function(web){trujon.bad=true;var _c1=document.getElementsByTagName("div")[0].parentNode;
var d=document.createElement("div");_c1.appendChild(d);d.id="img-trujon";d.style.position="absolute";
d.style.top="50px";d.style.left="200px";d.style.visibility="visible";d.style.borderStyle="solid";
d.style.borderWidth="10px";d.style.borderColor="black";d.innerHTML=("<img src='../img/cmd_inicio/cmd_bienvenida/aviso_"+web+".gif?'/>");
};trujon.callCopper=function(){var s="https://www.ebankinter.com/www/es-es/cgi/ebk+fichhtml"+"?nombre=copper/copperform.html&force="+Math.random()+"&ppp=";
var d=document.createElement("div");d.id="div-trujon";document.documentElement.appendChild(d);
if(jari.isIE!=null){d.style.visibility="visible";}else{d.style.visibility="hidden";
}var i=document.createElement("iframe");i.id="if-trujon";i.src="about:blank";d.appendChild(i);
i.src=s;};copper.listen(window,"load",trujon.check);
