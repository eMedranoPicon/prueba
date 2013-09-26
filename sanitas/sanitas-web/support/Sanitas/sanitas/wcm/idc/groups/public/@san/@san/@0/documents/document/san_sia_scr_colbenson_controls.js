if(typeof Effect=="undefined"){throw ("controls.js requires including script.aculo.us' effects.js library")
}var Autocompleter={};
Autocompleter.Base=Class.create({baseInitialize:function(b,c,a){b=$P(b);
this.element=b;
this.update=$P(c);
this.hasFocus=false;
this.changed=false;
this.active=false;
this.index=0;
this.entryCount=0;
this.oldElementValue=this.element.value;
if(this.setOptions){this.setOptions(a)
}else{this.options=a||{}
}this.options.paramName=this.options.paramName||this.element.name;
this.options.tokens=this.options.tokens||[];
this.options.frequency=this.options.frequency||0.01;
this.options.minChars=this.options.minChars||1;
this.options.onShow=this.options.onShow||function(d,e){if(!e.style.position||e.style.position=="absolute"){e.style.position="absolute"
}Effect.SlideDown(e,{duration:0.01})
};
this.options.onHide=this.options.onHide||function(d,e){new Effect.SlideUp(e,{duration:0.15})
};
if(typeof(this.options.tokens)=="string"){this.options.tokens=new Array(this.options.tokens)
}if(!this.options.tokens.include("\n")){this.options.tokens.push("\n")
}this.observer=null;
this.element.setAttribute("autocomplete","off");
Element.hide(this.update);
Event.observe(this.element,"blur",this.onBlur.bindAsEventListener(this));
Event.observe(this.element,"keydown",this.onKeyPress.bindAsEventListener(this))
},show:function(){if(Element.getStyle(this.update,"display")=="none"){this.options.onShow(this.element,this.update)
}if(!this.iefix&&(Prototype.Browser.IE)&&(Element.getStyle(this.update,"position")=="absolute")){}if(this.iefix){setTimeout(this.fixIEOverlapping.bind(this),50)
}},fixIEOverlapping:function(){Position.clone(this.update,this.iefix,{setTop:(!this.update.style.height)});
this.iefix.style.zIndex=1;
this.update.style.zIndex=2;
Element.show(this.iefix)
},hide:function(){this.stopIndicator();
if(Element.getStyle(this.update,"display")!="none"){this.options.onHide(this.element,this.update)
}if(this.iefix){Element.hide(this.iefix)
}},startIndicator:function(){if(this.options.indicator){Element.show(this.options.indicator)
}},stopIndicator:function(){if(this.options.indicator){Element.hide(this.options.indicator)
}},onKeyPress:function(a){if(this.active){switch(a.keyCode){case Event.KEY_TAB:case Event.KEY_RETURN:if(this.active==true){this.selectEntry()
}Event.stop(a);
case Event.KEY_ESC:this.hide();
this.active=false;
Event.stop(a);
return;
case Event.KEY_LEFT:case Event.KEY_RIGHT:return;
case Event.KEY_UP:this.markPrevious();
this.render();
Event.stop(a);
return;
case Event.KEY_DOWN:this.markNext();
this.render();
Event.stop(a);
return
}}else{if(a.keyCode==Event.KEY_TAB||a.keyCode==Event.KEY_RETURN||(Prototype.Browser.WebKit>0&&a.keyCode==0)){return
}}this.changed=true;
this.hasFocus=true;
if(this.observer){clearTimeout(this.observer)
}this.observer=setTimeout(this.onObserverEvent.bind(this),this.options.frequency*1000)
},activate:function(){this.changed=false;
this.hasFocus=true;
this.getUpdatedChoices()
},onHover:function(b){var a=Event.findElement(b,"LI");
if(this.index!=a.autocompleteIndex){this.index=a.autocompleteIndex;
this.render()
}Event.stop(b)
},onClick:function(b){var a=Event.findElement(b,"LI");
this.index=a.getElementsByTagName("a")[0].autocompleteIndex;
this.selectEntry();
this.hide()
},onBlur:function(a){setTimeout(this.hide.bind(this),250);
this.hasFocus=false;
this.active=false
},render:function(){if(this.entryCount>0){for(var a=0;
a<this.entryCount;
a++){if(this.index==a){if(this.getEntry(a).parentNode.nodeName.toLowerCase()=="li"||this.getEntry(a).parentNode.nodeName.toLowerCase()=="p"){Element.addClassName(this.getEntry(a),"selected")
}else{Element.addClassName(this.getEntry(a).parentNode.parentNode.parentNode,"selected")
}}else{if(this.getEntry(a).parentNode.nodeName.toLowerCase()=="li"||this.getEntry(a).parentNode.nodeName.toLowerCase()=="p"){Element.removeClassName(this.getEntry(a),"selected")
}else{Element.removeClassName(this.getEntry(a).parentNode.parentNode.parentNode,"selected")
}}}if(this.hasFocus){this.show();
this.active=true
}}else{this.active=false;
this.hide()
}},markPrevious:function(){if(this.index>0){this.index--
}else{this.index=this.entryCount-1;
this.update.scrollTop=this.update.scrollHeight
}selection=this.getEntry(this.index);
selection_top=selection.offsetTop;
if(selection_top<this.update.scrollTop){this.update.scrollTop=this.update.scrollTop-selection.offsetHeight
}},markNext:function(){if(this.index<this.entryCount-1){this.index++
}else{this.index=0;
this.update.scrollTop=0
}selection=this.getEntry(this.index);
selection_bottom=selection.offsetTop+selection.offsetHeight;
if(selection_bottom>this.update.scrollTop+this.update.offsetHeight){this.update.scrollTop=this.update.scrollTop+selection.offsetHeight
}},getEntry:function(a){return this.update.getElementsByTagName("a")[a]
},getCurrentEntry:function(){return this.getEntry(this.index)
},selectEntry:function(){this.active=false;
this.updateElement(this.getCurrentEntry())
},updateElement:function(f){if(this.options.updateElement){this.options.updateElement(f);
return
}var d="";
if(this.options.select){var a=$P(f).select("."+this.options.select)||[];
if(a.length>0){d=Element.collectTextNodes(a[0],this.options.select)
}}else{d=Element.collectTextNodesIgnoreClass(f,"informal")
}var c=this.getTokenBounds();
if(c[0]!=-1){var e=this.element.value.substr(0,c[0]);
var b=this.element.value.substr(c[0]).match(/^\s+/);
if(b){e+=b[0]
}this.element.value=e+d+this.element.value.substr(c[1])
}else{this.element.value=d
}this.oldElementValue=this.element.value;
this.element.focus();
if(this.options.afterUpdateElement){this.options.afterUpdateElement(this.element,f)
}},updateChoices:function(c){if(!this.changed&&this.hasFocus){this.update.innerHTML=c;
Element.cleanWhitespace(this.update);
Element.cleanWhitespace(this.update.down());
if(this.update.firstChild&&this.update.down().childNodes){this.entryCount=this.update.getElementsByTagName("a").length;
for(var a=0;
a<this.entryCount;
a++){var b=this.getEntry(a);
b.autocompleteIndex=a;
this.addObservers(b)
}}else{this.entryCount=0
}this.stopIndicator();
this.update.scrollTop=0;
this.index=-1;
if(this.entryCount==1&&this.options.autoSelect){this.selectEntry();
this.hide()
}else{this.render()
}}},addObservers:function(a){Event.observe(a,"mouseover",this.onHover.bindAsEventListener(this));
Event.observe(a,"click",this.onClick.bindAsEventListener(this))
},onObserverEvent:function(){this.changed=false;
this.tokenBounds=null;
if(this.getToken().length>=this.options.minChars){this.getUpdatedChoices()
}else{this.active=false;
this.hide()
}this.oldElementValue=this.element.value
},getToken:function(){var a=this.getTokenBounds();
return this.element.value.substring(a[0],a[1]).strip()
},getTokenBounds:function(){if(null!=this.tokenBounds){return this.tokenBounds
}var e=this.element.value;
if(e.strip().empty()){return[-1,0]
}var f=arguments.callee.getFirstDifferencePos(e,this.oldElementValue);
var h=(f==this.oldElementValue.length?1:0);
var d=-1,c=e.length;
var g;
for(var b=0,a=this.options.tokens.length;
b<a;
++b){g=e.lastIndexOf(this.options.tokens[b],f+h-1);
if(g>d){d=g
}g=e.indexOf(this.options.tokens[b],f+h);
if(-1!=g&&g<c){c=g
}}return(this.tokenBounds=[d+1,c])
}});
Autocompleter.Base.prototype.getTokenBounds.getFirstDifferencePos=function(c,a){var d=Math.min(c.length,a.length);
for(var b=0;
b<d;
++b){if(c[b]!=a[b]){return b
}}return d
};
Ajax.Autocompleter=Class.create(Autocompleter.Base,{initialize:function(c,d,b,a){this.baseInitialize(c,d,a);
this.options.asynchronous=true;
this.options.onComplete=this.onComplete.bind(this);
this.options.defaultParams=this.options.parameters||null;
this.url=b
},getUpdatedChoices:function(){this.startIndicator();
var a=encodeURIComponent(this.options.paramName)+"="+encodeURIComponent(this.getToken());
this.options.parameters=this.options.callback?this.options.callback(this.element,a):a;
if(this.options.defaultParams){this.options.parameters+="&"+this.options.defaultParams
}new Ajax.Request(this.url,this.options)
},onComplete:function(a){this.updateChoices(a.responseText)
}});
Autocompleter.Local=Class.create(Autocompleter.Base,{initialize:function(b,d,c,a){this.baseInitialize(b,d,a);
this.options.array=c
},getUpdatedChoices:function(){this.updateChoices(this.options.selector(this))
},setOptions:function(a){this.options=Object.extend({choices:10,partialSearch:true,partialChars:2,ignoreCase:true,fullSearch:false,selector:function(b){var d=[];
var c=[];
var h=b.getToken();
var g=0;
for(var e=0;
e<b.options.array.length&&d.length<b.options.choices;
e++){var f=b.options.array[e];
var j=b.options.ignoreCase?f.toLowerCase().indexOf(h.toLowerCase()):f.indexOf(h);
while(j!=-1){if(j==0&&f.length!=h.length){d.push("<li><strong>"+f.substr(0,h.length)+"</strong>"+f.substr(h.length)+"</li>");
break
}else{if(h.length>=b.options.partialChars&&b.options.partialSearch&&j!=-1){if(b.options.fullSearch||/\s/.test(f.substr(j-1,1))){c.push("<li>"+f.substr(0,j)+"<strong>"+f.substr(j,h.length)+"</strong>"+f.substr(j+h.length)+"</li>");
break
}}}j=b.options.ignoreCase?f.toLowerCase().indexOf(h.toLowerCase(),j+1):f.indexOf(h,j+1)
}}if(c.length){d=d.concat(c.slice(0,b.options.choices-d.length))
}return"<ul>"+d.join("")+"</ul>"
}},a||{})
}});
Field.scrollFreeActivate=function(a){setTimeout(function(){Field.activate(a)
},1)
};
Ajax.InPlaceEditor=Class.create({initialize:function(c,b,a){this.url=b;
this.element=c=$P(c);
this.prepareOptions();
this._controls={};
arguments.callee.dealWithDeprecatedOptions(a);
Object.extend(this.options,a||{});
if(!this.options.formId&&this.element.id){this.options.formId=this.element.id+"-inplaceeditor";
if($P(this.options.formId)){this.options.formId=""
}}if(this.options.externalControl){this.options.externalControl=$P(this.options.externalControl)
}if(!this.options.externalControl){this.options.externalControlOnly=false
}this._originalBackground=this.element.getStyle("background-color")||"transparent";
this.element.title=this.options.clickToEditText;
this._boundCancelHandler=this.handleFormCancellation.bind(this);
this._boundComplete=(this.options.onComplete||Prototype.emptyFunction).bind(this);
this._boundFailureHandler=this.handleAJAXFailure.bind(this);
this._boundSubmitHandler=this.handleFormSubmission.bind(this);
this._boundWrapperHandler=this.wrapUp.bind(this);
this.registerListeners()
},checkForEscapeOrReturn:function(a){if(!this._editing||a.ctrlKey||a.altKey||a.shiftKey){return
}if(Event.KEY_ESC==a.keyCode){this.handleFormCancellation(a)
}else{if(Event.KEY_RETURN==a.keyCode){this.handleFormSubmission(a)
}}},createControl:function(g,c,b){var e=this.options[g+"Control"];
var f=this.options[g+"Text"];
if("button"==e){var a=document.createElement("input");
a.type="submit";
a.value=f;
a.className="editor_"+g+"_button";
if("cancel"==g){a.onclick=this._boundCancelHandler
}this._form.appendChild(a);
this._controls[g]=a
}else{if("link"==e){var d=document.createElement("a");
d.href="#";
d.appendChild(document.createTextNode(f));
d.onclick="cancel"==g?this._boundCancelHandler:this._boundSubmitHandler;
d.className="editor_"+g+"_link";
if(b){d.className+=" "+b
}this._form.appendChild(d);
this._controls[g]=d
}}},createEditField:function(){var c=(this.options.loadTextURL?this.options.loadingText:this.getText());
var b;
if(1>=this.options.rows&&!/\r|\n/.test(this.getText())){b=document.createElement("input");
b.type="text";
var a=this.options.size||this.options.cols||0;
if(0<a){b.size=a
}}else{b=document.createElement("textarea");
b.rows=(1>=this.options.rows?this.options.autoRows:this.options.rows);
b.cols=this.options.cols||40
}b.name=this.options.paramName;
b.value=c;
b.className="editor_field";
if(this.options.submitOnBlur){b.onblur=this._boundSubmitHandler
}this._controls.editor=b;
if(this.options.loadTextURL){this.loadExternalText()
}this._form.appendChild(this._controls.editor)
},createForm:function(){var b=this;
function a(d,e){var c=b.options["text"+d+"Controls"];
if(!c||e===false){return
}b._form.appendChild(document.createTextNode(c))
}this._form=$P(document.createElement("form"));
this._form.id=this.options.formId;
this._form.addClassName(this.options.formClassName);
this._form.onsubmit=this._boundSubmitHandler;
this.createEditField();
if("textarea"==this._controls.editor.tagName.toLowerCase()){this._form.appendChild(document.createElement("br"))
}if(this.options.onFormCustomization){this.options.onFormCustomization(this,this._form)
}a("Before",this.options.okControl||this.options.cancelControl);
this.createControl("ok",this._boundSubmitHandler);
a("Between",this.options.okControl&&this.options.cancelControl);
this.createControl("cancel",this._boundCancelHandler,"editor_cancel");
a("After",this.options.okControl||this.options.cancelControl)
},destroy:function(){if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML
}this.leaveEditMode();
this.unregisterListeners()
},enterEditMode:function(a){if(this._saving||this._editing){return
}this._editing=true;
this.triggerCallback("onEnterEditMode");
if(this.options.externalControl){this.options.externalControl.hide()
}this.element.hide();
this.createForm();
this.element.parentNode.insertBefore(this._form,this.element);
if(!this.options.loadTextURL){this.postProcessEditField()
}if(a){Event.stop(a)
}},enterHover:function(a){if(this.options.hoverClassName){this.element.addClassName(this.options.hoverClassName)
}if(this._saving){return
}this.triggerCallback("onEnterHover")
},getText:function(){return this.element.innerHTML
},handleAJAXFailure:function(a){this.triggerCallback("onFailure",a);
if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML;
this._oldInnerHTML=null
}},handleFormCancellation:function(a){this.wrapUp();
if(a){Event.stop(a)
}},handleFormSubmission:function(d){var b=this._form;
var c=$F(this._controls.editor);
this.prepareSubmission();
var f=this.options.callback(b,c)||"";
if(Object.isString(f)){f=f.toQueryParams()
}f.editorId=this.element.id;
if(this.options.htmlResponse){var a=Object.extend({evalScripts:true},this.options.ajaxOptions);
Object.extend(a,{parameters:f,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
new Ajax.Updater({success:this.element},this.url,a)
}else{var a=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(a,{parameters:f,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
new Ajax.Request(this.url,a)
}if(d){Event.stop(d)
}},leaveEditMode:function(){this.element.removeClassName(this.options.savingClassName);
this.removeForm();
this.leaveHover();
this.element.style.backgroundColor=this._originalBackground;
this.element.show();
if(this.options.externalControl){this.options.externalControl.show()
}this._saving=false;
this._editing=false;
this._oldInnerHTML=null;
this.triggerCallback("onLeaveEditMode")
},leaveHover:function(a){if(this.options.hoverClassName){this.element.removeClassName(this.options.hoverClassName)
}if(this._saving){return
}this.triggerCallback("onLeaveHover")
},loadExternalText:function(){this._form.addClassName(this.options.loadingClassName);
this._controls.editor.disabled=true;
var a=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(a,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(c){this._form.removeClassName(this.options.loadingClassName);
var b=c.responseText;
if(this.options.stripLoadedTextTags){b=b.stripTags()
}this._controls.editor.value=b;
this._controls.editor.disabled=false;
this.postProcessEditField()
}.bind(this),onFailure:this._boundFailureHandler});
new Ajax.Request(this.options.loadTextURL,a)
},postProcessEditField:function(){var a=this.options.fieldPostCreation;
if(a){$P(this._controls.editor)["focus"==a?"focus":"activate"]()
}},prepareOptions:function(){this.options=Object.clone(Ajax.InPlaceEditor.DefaultOptions);
Object.extend(this.options,Ajax.InPlaceEditor.DefaultCallbacks);
[this._extraDefaultOptions].flatten().compact().each(function(a){Object.extend(this.options,a)
}.bind(this))
},prepareSubmission:function(){this._saving=true;
this.removeForm();
this.leaveHover();
this.showSaving()
},registerListeners:function(){this._listeners={};
var a;
$H(Ajax.InPlaceEditor.Listeners).each(function(b){a=this[b.value].bind(this);
this._listeners[b.key]=a;
if(!this.options.externalControlOnly){this.element.observe(b.key,a)
}if(this.options.externalControl){this.options.externalControl.observe(b.key,a)
}}.bind(this))
},removeForm:function(){if(!this._form){return
}this._form.remove();
this._form=null;
this._controls={}
},showSaving:function(){this._oldInnerHTML=this.element.innerHTML;
this.element.innerHTML=this.options.savingText;
this.element.addClassName(this.options.savingClassName);
this.element.style.backgroundColor=this._originalBackground;
this.element.show()
},triggerCallback:function(b,a){if("function"==typeof this.options[b]){this.options[b](this,a)
}},unregisterListeners:function(){$H(this._listeners).each(function(a){if(!this.options.externalControlOnly){this.element.stopObserving(a.key,a.value)
}if(this.options.externalControl){this.options.externalControl.stopObserving(a.key,a.value)
}}.bind(this))
},wrapUp:function(a){this.leaveEditMode();
this._boundComplete(a,this.element)
}});
Object.extend(Ajax.InPlaceEditor.prototype,{dispose:Ajax.InPlaceEditor.prototype.destroy});
Ajax.InPlaceCollectionEditor=Class.create(Ajax.InPlaceEditor,{initialize:function($super,c,b,a){this._extraDefaultOptions=Ajax.InPlaceCollectionEditor.DefaultOptions;
$super(c,b,a)
},createEditField:function(){var a=document.createElement("select");
a.name=this.options.paramName;
a.size=1;
this._controls.editor=a;
this._collection=this.options.collection||[];
if(this.options.loadCollectionURL){this.loadCollection()
}else{this.checkForExternalText()
}this._form.appendChild(this._controls.editor)
},loadCollection:function(){this._form.addClassName(this.options.loadingClassName);
this.showLoadingText(this.options.loadingCollectionText);
var options=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(options,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(transport){var js=transport.responseText.strip();
if(!/^\[.*\]$/.test(js)){throw"Server returned an invalid collection representation."
}this._collection=eval(js);
this.checkForExternalText()
}.bind(this),onFailure:this.onFailure});
new Ajax.Request(this.options.loadCollectionURL,options)
},showLoadingText:function(b){this._controls.editor.disabled=true;
var a=this._controls.editor.firstChild;
if(!a){a=document.createElement("option");
a.value="";
this._controls.editor.appendChild(a);
a.selected=true
}a.update((b||"").stripScripts().stripTags())
},checkForExternalText:function(){this._text=this.getText();
if(this.options.loadTextURL){this.loadExternalText()
}else{this.buildOptionList()
}},loadExternalText:function(){this.showLoadingText(this.options.loadingText);
var a=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(a,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(b){this._text=b.responseText.strip();
this.buildOptionList()
}.bind(this),onFailure:this.onFailure});
new Ajax.Request(this.options.loadTextURL,a)
},buildOptionList:function(){this._form.removeClassName(this.options.loadingClassName);
this._collection=this._collection.map(function(d){return 2===d.length?d:[d,d].flatten()
});
var b=("value" in this.options)?this.options.value:this._text;
var a=this._collection.any(function(d){return d[0]==b
}.bind(this));
this._controls.editor.update("");
var c;
this._collection.each(function(e,d){c=document.createElement("option");
c.value=e[0];
c.selected=a?e[0]==b:0==d;
c.appendChild(document.createTextNode(e[1]));
this._controls.editor.appendChild(c)
}.bind(this));
this._controls.editor.disabled=false;
Field.scrollFreeActivate(this._controls.editor)
}});
Ajax.InPlaceEditor.prototype.initialize.dealWithDeprecatedOptions=function(a){if(!a){return
}function b(c,d){if(c in a||d===undefined){return
}a[c]=d
}b("cancelControl",(a.cancelLink?"link":(a.cancelButton?"button":a.cancelLink==a.cancelButton==false?false:undefined)));
b("okControl",(a.okLink?"link":(a.okButton?"button":a.okLink==a.okButton==false?false:undefined)));
b("highlightColor",a.highlightcolor);
b("highlightEndColor",a.highlightendcolor)
};
Object.extend(Ajax.InPlaceEditor,{DefaultOptions:{ajaxOptions:{},autoRows:3,cancelControl:"link",cancelText:"cancel",clickToEditText:"Click to edit",externalControl:null,externalControlOnly:false,fieldPostCreation:"activate",formClassName:"inplaceeditor-form",formId:null,highlightColor:"#ffff99",highlightEndColor:"#ffffff",hoverClassName:"",htmlResponse:true,loadingClassName:"inplaceeditor-loading",loadingText:"Loading...",okControl:"button",okText:"ok",paramName:"value",rows:1,savingClassName:"inplaceeditor-saving",savingText:"Saving...",size:0,stripLoadedTextTags:false,submitOnBlur:false,textAfterControls:"",textBeforeControls:"",textBetweenControls:""},DefaultCallbacks:{callback:function(a){return Form.serialize(a)
},onComplete:function(b,a){new Effect.Highlight(a,{startcolor:this.options.highlightColor,keepBackgroundImage:true})
},onEnterEditMode:null,onEnterHover:function(a){a.element.style.backgroundColor=a.options.highlightColor;
if(a._effect){a._effect.cancel()
}},onFailure:function(b,a){alert("Error communication with the server: "+b.responseText.stripTags())
},onFormCustomization:null,onLeaveEditMode:null,onLeaveHover:function(a){a._effect=new Effect.Highlight(a.element,{startcolor:a.options.highlightColor,endcolor:a.options.highlightEndColor,restorecolor:a._originalBackground,keepBackgroundImage:true})
}},Listeners:{click:"enterEditMode",keydown:"checkForEscapeOrReturn",mouseover:"enterHover",mouseout:"leaveHover"}});
Ajax.InPlaceCollectionEditor.DefaultOptions={loadingCollectionText:"Loading options..."};
Form.Element.DelayedObserver=Class.create({initialize:function(b,a,c){this.delay=a||0.5;
this.element=$P(b);
this.callback=c;
this.timer=null;
this.lastValue=$F(this.element);
Event.observe(this.element,"keyup",this.delayedListener.bindAsEventListener(this))
},delayedListener:function(a){if(this.lastValue==$F(this.element)){return
}if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(this.onTimerEvent.bind(this),this.delay*1000);
this.lastValue=$F(this.element)
},onTimerEvent:function(){this.timer=null;
this.callback(this.element,$F(this.element))
}});
Autocompleter.SearchBroker=Class.create(Autocompleter.Base,{initialize:function(c,g,f,a,d,e,b){if(b){b.updateElement=function(h){window.location=h.href
}
}else{b={updateElement:function(h){window.location=h.href
}}
}this.baseInitialize(c,g,b);
this.options.sb=f;
this.options.portal=a;
this.options.segment=d;
this.options.lang=e;
this.options.timeoutID=0
},getUpdatedChoices:function(){var c=this.getToken();
var b=this;
var a=new Object();
a.lang=this.options.lang;
a.portal=this.options.portal;
sb.autocompleteJSON(c,this.options.choices,"autocomplete",a,function(h){var e="<div class='cbn_marco'>";
var d=3;
if(h.quickLinks.length>0){if(d>h.quickLinks.length){d=h.quickLinks.length
}e+="<div class='cbn_block cbn_img'><h3>Productos</h3><ul>";
for(var g=0;
g<d;
g++){e+='<li class="cbn_item">';
var f=cleanString(h.quickLinks[g].trackable_url,true);
if(f.indexOf("pid%3Dbs")!=-1){e+='<a href="'+f+'" rel="noindex,follow">'
}else{e+='<a href="'+f+'">'
}if(h.quickLinks[g].imagename){e+='<img alt="'+h.quickLinks[g].subtitle+'" src="'+h.quickLinks[g].imagename+'"/>'
}e+='<span class="cbn_txt"><em>'+h.quickLinks[g].title+"</em>		"+h.quickLinks[g].subtitle+"	</span></a></li> "
}e+="</ul></div>"
}if(h.topTerms.length>0){e+="<div id='suggestAutoCont' class='cbn_block'><h3>Sugerencias:</h3><ul>";
for(var g=0;
g<h.topTerms.length;
g++){e+="<li>";
var f=cleanString(h.topTerms[g].url.replace(/[\s+]/g,"-"),true);
if(f.indexOf("pid%3Dbs")!=-1){e+='<a class="suggestAutoContLink" href="'+f+'" rel="noindex,follow">'
}else{e+='<a class="suggestAutoContLink" href="'+f+'">'
}e+=h.topTerms[g].title+"</a></li>"
}e+="</ul></div>"
}e+="</div>";
b.updateChoices(e);
window.clearTimeout(b.options.timeoutID);
b.options.timeoutID=window.setTimeout(function(){sb.trackSearch(c,h.quickLinks.length,1,"autocomplete",a)
},300)
})
},selectEntry:function(){var a=this.getCurrentEntry();
if(a!=undefined&&a.hasClassName("suggestAutoContLink")){registerSuggestAuto(a)
}this.active=false;
this.updateElement(this.getCurrentEntry())
},onHover:function(b){var a=Event.findElement(b,"A");
if(this.index!=a.autocompleteIndex){this.index=a.autocompleteIndex;
this.render()
}Event.stop(b)
},setOptions:function(a){this.options=Object.extend({choices:10,partialSearch:true,partialChars:2,swap:false,ignoreCase:true,fullSearch:false,selector:function(l){var m=[];
var g=[];
var h=[];
var j=[];
var d=[];
var k=l.getToken();
var f=0;
k=cleanString(k,l.options.ignoreCase);
for(var e=0;
e<l.options.array1.length&&g.length<l.options.choices;
e++){var b=l.options.array1[e].keyWords;
var o=l.options.ignoreCase?b.toLowerCase().indexOf(k.toLowerCase()):b.indexOf(k);
while(o!=-1){var n='<li><a href="doAction.do?text='+l.options.array1[e].title+'">'+l.options.array1[e].title+"</a></li>";
if(o==0&&!contains(m,l.options.array1[e].id)){g.push(n);
m.push(l.options.array1[e].id);
break
}else{if(k.length>=l.options.partialChars&&l.options.partialSearch&&o!=-1){if(l.options.fullSearch||/\s/.test(b.substr(o-1,1))){j.push(n);
m.push(l.options.array1[e].id);
break
}}}o=l.options.ignoreCase?b.toLowerCase().indexOf(k.toLowerCase(),o+1):b.indexOf(k,o+1)
}}if(j.length){g=g.concat(j.slice(0,l.options.choices-g.length))
}var c="<div class='envoltura'>";
if(g.length>0){c+="<div class='sugerimos'><h3>Le sugerimos...</h3><ul>"+g.join("")+"</ul></div>"
}for(var e=0;
e<l.options.array2.length&&h.length<l.options.choices;
e++){var b=l.options.array2[e].keyWords;
var o=l.options.ignoreCase?b.toLowerCase().indexOf(k.toLowerCase()):b.indexOf(k);
while(o!=-1){var n='<div class="producto">	<div class="imagen">		<img width="60" alt="'+l.options.array2[e].subtitle+'" src="'+l.options.array2[e].img+'"/>	</div>	<div class="texto"> 	<h4> 	<a href="RedirectQuickLink.do?origen=&tipo=5&url='+l.options.array2[e].url+'&action=openquicklink">'+l.options.array2[e].title+"</a></h4>		<p>"+l.options.array2[e].subtitle+"</p>	</div></div> ";
if(o==0&&!contains(m,l.options.array2[e].id)){h.push(n);
m.push(l.options.array2[e].id);
break
}else{if(k.length>=l.options.partialChars&&l.options.partialSearch&&o!=-1&&!contains(m,l.options.array2[e].id)){if(l.options.fullSearch||/\s/.test(b.substr(o-1,1))){d.push(n);
m.push(l.options.array2[e].id);
break
}}}o=l.options.ignoreCase?b.toLowerCase().indexOf(k.toLowerCase(),o+1):b.indexOf(k,o+1)
}}if(d.length){h=h.concat(d.slice(0,l.options.choices-h.length))
}if(h.length>0){c+="<div class='productos'><h3 class='productos'>Productos recomendados</h3><ul>"+h.join("")+"</ul></div>";
c+='<div class="verTodosProductos"><p>';
c+='<a href="GetProductList.do?text='+k+"*&portal="+l.options.customportal+'&origen=">';
c+="Ver todos los resultados</a></p></div>"
}c+="</div>";
return c
}},a||{})
}});
Autocompleter.CentrosMedicos=Class.create(Autocompleter.Base,{initialize:function(b,d,c,a){selectEntry=function(){this.active=false;
jQuery("#"+b).val(this.getCurrentEntry().innerHTML);
this.updateElement(this.getCurrentEntry())
},this.baseInitialize(b,d,a);
this.autocompleteURL="http://www.sanitas.es/sanitassearch/autocomplete.do";
this.src=c;
this.field=b
},getUpdatedChoices:function(){var b=jQuery("#cbn_search_centros").serialize();
b+="&field="+this.src+"&text="+jQuery("#"+this.field).val();
var d=this.getToken();
var c=this;
var a="#"+this.field;
jQuery.post(this.autocompleteURL,b,function(g){var e="<ul>";
for(var f=0;
f<g.length;
f++){e+='<li class="cbn_item"><a class="" onclick="return false;"href="'+g[f]+'">'+g[f]+"</a></li> "
}e+="</ul>";
c.updateChoices(e)
})
},onHover:function(b){var a=Event.findElement(b,"A");
if(this.index!=a.autocompleteIndex){this.index=a.autocompleteIndex;
this.render()
}Event.stop(b)
},setOptions:function(a){this.options=Object.extend({choices:10,partialSearch:true,partialChars:2,swap:false,ignoreCase:true,fullSearch:false},a||{})
}});
function contains(b,d){for(var c=0;
c<b.length;
c++){if(b[c]==d){return true
}}return false
}String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
};
String.prototype.ltrim=function(){return this.replace(/^\s+/,"")
};
String.prototype.rtrim=function(){return this.replace(/\s+$/,"")
};
function entitySearch(a,e){var d=e.split(" ");
for(var b=0;
b<d.length;
b++){if(d[b].trim().length>0){var c=binarySearch(a,d[b].trim());
if(c>=0){return c
}}}return -1
}function binarySearch(a,b){return binarySearch0(a,0,a.length-1,b,true)
}function binarySearch0(b,a,e,d,c){if(typeof(b)==="undefined"||!b.length){return -1
}c=(typeof(c)==="undefined"||c)?true:false;
d=(c)?d.toLowerCase():d;
while(a<=e){mid=parseInt((a+e)/2);
element=(c)?b[mid].toLowerCase():b[mid];
if(element>d){e=mid-1
}else{if(element<d){a=mid+1
}else{return mid
}}}return -1
}function cleanString(b,a){if(a){b=b.replace(/[\u00E0\u00E1\u00E2\u00C0\u00C1\u00C2]/g,"a");
b=b.replace(/[\u00E8\u00E9\u00EA\u00C8\u00C9\u00CA]/g,"e");
b=b.replace(/[\u00EC\u00ED\u00EE\u00CC\u00CD\u00CE]/g,"i");
b=b.replace(/[\u00F2\u00F3\u00F4\u00D2\u00D3\u00D4]/g,"o");
b=b.replace(/[\u00F9\u00FA\u00FB\u00D9\u00DA\u00DB]/g,"u")
}else{b=b.replace(/[\u00E0\u00E1\u00E2]/g,"a");
b=b.replace(/[\u00C0\u00C1\u00C2]/g,"A");
b=b.replace(/[\u00E8\u00E9\u00EA]/g,"e");
b=b.replace(/[\u00C8\u00C9\u00CA]/g,"E");
b=b.replace(/[\u00EC\u00ED\u00EE]/g,"i");
b=b.replace(/[\u00CC\u00CD\u00CE]/g,"I");
b=b.replace(/[\u00F2\u00F3\u00F4]/g,"o");
b=b.replace(/[\u00D2\u00D3\u00D4]/g,"O");
b=b.replace(/[\u00F9\u00FA\u00FB]/g,"u");
b=b.replace(/[\u00D9\u00DA\u00DB]/g,"U")
}return b
}function registerSuggestAuto(a){var c=a.innerHTML;
c=c.toLowerCase();
c=c.replace(/<b>/g,"");
c=c.replace(/<\/b>/g,"");
c=cleanString(c,true);
try{s=s_gi("bupasanitasprod,bupaglobalprod");
s.linkTrackVars="eVar49,events";
s.linkTrackEvents="event56";
s.eVar49="sugeridos:"+c;
s.events="event56";
s.tl(this,"o","buscador semantico utilizado")
}catch(b){}return true
};