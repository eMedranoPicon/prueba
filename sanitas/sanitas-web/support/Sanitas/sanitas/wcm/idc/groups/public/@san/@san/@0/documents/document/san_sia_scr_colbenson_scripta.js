var Scriptaculous={Version:"1.8.1",require:function(a){document.write('<script type="text/javascript" src="'+a+'"><\/script>')
},REQUIRED_PROTOTYPE:"1.6.0",load:function(){function a(b){var c=b.split(".");
return parseInt(c[0])*100000+parseInt(c[1])*1000+parseInt(c[2])
}if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||(a(Prototype.Version)<a(Scriptaculous.REQUIRED_PROTOTYPE))){throw ("script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE)
}$A(document.getElementsByTagName("script")).findAll(function(b){return(b.src&&b.src.match(/scriptaculous\.js(\?.*)?$/))
}).each(function(c){var d=c.src.replace(/scriptaculous\.js(\?.*)?$/,"");
var b=c.src.match(/\?.*load=([a-z,]*)/);
(b?b[1]:"builder,effects,dragdrop,controls,slider,sound").split(",").each(function(e){Scriptaculous.require(d+e+".js")
})
})
}};
Scriptaculous.load();