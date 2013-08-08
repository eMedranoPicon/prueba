if(!Control){var Control={}
}Control.Slider=Class.create({initialize:function(d,a,b){var c=this;
if(Object.isArray(d)){this.handles=d.collect(function(f){return $P(f)
})
}else{this.handles=[$P(d)]
}this.track=$P(a);
this.options=b||{};
this.axis=this.options.axis||"horizontal";
this.increment=this.options.increment||1;
this.step=parseInt(this.options.step||"1");
this.range=this.options.range||$R(0,1);
this.value=0;
this.values=this.handles.map(function(){return 0
});
this.spans=this.options.spans?this.options.spans.map(function(e){return $P(e)
}):false;
this.options.startSpan=$P(this.options.startSpan||null);
this.options.endSpan=$P(this.options.endSpan||null);
this.restricted=this.options.restricted||false;
this.maximum=this.options.maximum||this.range.end;
this.minimum=this.options.minimum||this.range.start;
this.alignX=parseInt(this.options.alignX||"0");
this.alignY=parseInt(this.options.alignY||"0");
this.trackLength=this.maximumOffset()-this.minimumOffset();
this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));
this.active=false;
this.dragging=false;
this.disabled=false;
if(this.options.disabled){this.setDisabled()
}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;
if(this.allowedValues){this.minimum=this.allowedValues.min();
this.maximum=this.allowedValues.max()
}this.eventMouseDown=this.startDrag.bindAsEventListener(this);
this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.update.bindAsEventListener(this);
this.handles.each(function(f,e){e=c.handles.length-1-e;
c.setValue(parseFloat((Object.isArray(c.options.sliderValue)?c.options.sliderValue[e]:c.options.sliderValue)||c.range.start),e);
f.makePositioned().observe("mousedown",c.eventMouseDown)
});
this.track.observe("mousedown",this.eventMouseDown);
document.observe("mouseup",this.eventMouseUp);
document.observe("mousemove",this.eventMouseMove);
this.initialized=true
},dispose:function(){var a=this;
Event.stopObserving(this.track,"mousedown",this.eventMouseDown);
Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
this.handles.each(function(b){Event.stopObserving(b,"mousedown",a.eventMouseDown)
})
},setDisabled:function(){this.disabled=true
},setEnabled:function(){this.disabled=false
},getNearestValue:function(a){if(this.allowedValues){if(a>=this.allowedValues.max()){return(this.allowedValues.max())
}if(a<=this.allowedValues.min()){return(this.allowedValues.min())
}var c=Math.abs(this.allowedValues[0]-a);
var b=this.allowedValues[0];
this.allowedValues.each(function(d){var e=Math.abs(d-a);
if(e<=c){b=d;
c=e
}});
return b
}if(a>this.range.end){return this.range.end
}if(a<this.range.start){return this.range.start
}return a
},setValue:function(b,a){if(!this.active){this.activeHandleIdx=a||0;
this.activeHandle=this.handles[this.activeHandleIdx];
this.updateStyles()
}a=a||this.activeHandleIdx||0;
if(this.initialized&&this.restricted){if((a>0)&&(b<this.values[a-1])){b=this.values[a-1]
}if((a<(this.handles.length-1))&&(b>this.values[a+1])){b=this.values[a+1]
}}b=this.getNearestValue(b);
this.values[a]=b;
this.value=this.values[0];
this.handles[a].style[this.isVertical()?"top":"left"]=this.translateToPx(b);
this.drawSpans();
if(!this.dragging||!this.event){this.updateFinished()
}},setValueBy:function(b,a){this.setValue(this.values[a||this.activeHandleIdx||0]+b,a||this.activeHandleIdx||0)
},translateToPx:function(a){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(a-this.range.start))+"px"
},translateToValue:function(a){return((a/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start)
},getRange:function(b){var a=this.values.sortBy(Prototype.K);
b=b||0;
return $R(a[b],a[b+1])
},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX)
},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX)
},isVertical:function(){return(this.axis=="vertical")
},drawSpans:function(){var a=this;
if(this.spans){$R(0,this.spans.length-1).each(function(b){a.setSpan(a.spans[b],a.getRange(b))
})
}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value))
}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum))
}},setSpan:function(b,a){if(this.isVertical()){b.style.top=this.translateToPx(a.start);
b.style.height=this.translateToPx(a.end-a.start+this.range.start)
}else{b.style.left=this.translateToPx(a.start);
b.style.width=this.translateToPx(a.end-a.start+this.range.start)
}},updateStyles:function(){this.handles.each(function(a){Element.removeClassName(a,"selected")
});
Element.addClassName(this.activeHandle,"selected")
},startDrag:function(c){if(Event.isLeftClick(c)){if(!this.disabled){this.active=true;
var d=Event.element(c);
var e=[Event.pointerX(c),Event.pointerY(c)];
var a=d;
if(a==this.track){var b=Position.cumulativeOffset(this.track);
this.event=c;
this.setValue(this.translateToValue((this.isVertical()?e[1]-b[1]:e[0]-b[0])-(this.handleLength/2)));
var b=Position.cumulativeOffset(this.activeHandle);
this.offsetX=(e[0]-b[0]);
this.offsetY=(e[1]-b[1])
}else{while((this.handles.indexOf(d)==-1)&&d.parentNode){d=d.parentNode
}if(this.handles.indexOf(d)!=-1){this.activeHandle=d;
this.activeHandleIdx=this.handles.indexOf(this.activeHandle);
this.updateStyles();
var b=Position.cumulativeOffset(this.activeHandle);
this.offsetX=(e[0]-b[0]);
this.offsetY=(e[1]-b[1])
}}}Event.stop(c)
}},update:function(a){if(this.active){if(!this.dragging){this.dragging=true
}this.draw(a);
if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}Event.stop(a)
}},draw:function(b){var c=[Event.pointerX(b),Event.pointerY(b)];
var a=Position.cumulativeOffset(this.track);
c[0]-=this.offsetX+a[0];
c[1]-=this.offsetY+a[1];
this.event=b;
this.setValue(this.translateToValue(this.isVertical()?c[1]:c[0]));
if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this)
}},endDrag:function(a){if(this.active&&this.dragging){this.finishDrag(a,true);
Event.stop(a)
}this.active=false;
this.dragging=false
},finishDrag:function(a,b){this.active=false;
this.dragging=false;
this.updateFinished()
},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this)
}this.event=null
}});