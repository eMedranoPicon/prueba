jQuery(window).load(function(){cbnautocomplete()
});
function cbnautocomplete(){if(jQuery("#s").length){new Autocompleter.SearchBroker("s","cbn_autocompletado",null,null,null,null,{choices:5,minChars:1})
}}jQuery(function(){var c=jQuery("input#s");
var h=jQuery("div.cbn_input");
var d=jQuery("div.cbn_buscador");
var e=h.width();
var g=h.parent().width()-(h.outerWidth()-e)-28;
var b=jQuery("#cbn_clear");
var a=c.val();
var f=jQuery("#cbn_autocompletado");
b.focus(function(){c.val("");
a="Quiero encontrar..."
});
c.bind("focus",function(){if(c.val()===a){c.val("")
}jQuery(this).animate({color:"#000"},300);
jQuery(this).parent().animate({width:g+"px",backgroundColor:"#fff",paddingRight:"43px"},300,function(){if(!(c.val()===""||c.val()===a)){if(!(jQuery.browser.msie&&jQuery.browser.version<9)){b.fadeIn(300)
}else{b.css({display:"block"})
}}}).addClass("cbn_focus");
d.addClass("cbn_retrofocus")
}).bind("blur",function(){jQuery(this).animate({color:"#b4bdc4"},300);
jQuery(this).parent().animate({width:e+"px",backgroundColor:"#eaeaea",paddingRight:"15px"},300,function(){if(c.val()===""){c.val(a)
}}).removeClass("cbn_focus");
d.removeClass("cbn_retrofocus");
if(!(jQuery.browser.msie&&jQuery.browser.version<9)){b.fadeOut(100)
}else{b.css({display:"none"})
}}).keyup(function(){if(c.val()===""){if(!(jQuery.browser.msie&&jQuery.browser.version<9)){b.fadeOut(300)
}else{b.css({display:"none"})
}}else{if(!(jQuery.browser.msie&&jQuery.browser.version<9)){b.fadeIn(300)
}else{b.css({display:"block"})
}}})
});
function delAccent(a){a=a.toLowerCase();
a=a.replace(/[à|â|ä|á]/g,"a");
a=a.replace(/[è|ê|ë|é]/g,"e");
a=a.replace(/[ì|î|ï|�]/g,"i");
a=a.replace(/[ò|ô|ö|ó]/g,"o");
a=a.replace(/[ù|û|ü|ú]/g,"u");
return a
}function processText(a){a=delAccent(a.toLowerCase());
a=a.replace(/\s+/g,"-");
return a
}function cbnDoSearch(a,b,d){if(b==""||b.length<3){return false
}else{try{s=s_gi("bupasanitasprod,bupaglobalprod");
s.linkTrackVars="eVar49,eVar72,events";
s.linkTrackEvents="event56";
s.eVar49=b;
s.eVar72="buscador semantico";
s.events="event56";
s.tl(this,"o","buscador semantico utilizado")
}catch(c){}b=processText(b);
jQuery("#"+a).attr("action",d+b)
}return true
};