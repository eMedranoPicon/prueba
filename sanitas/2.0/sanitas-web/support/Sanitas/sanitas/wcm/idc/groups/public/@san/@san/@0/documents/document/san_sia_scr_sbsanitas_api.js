var SearchBroker=function(c,a,b){includejQueryUI=a;includeUICSS=b;if(c.charAt(c.length-1)=="http://www.sanitas.es/"){c=c.substring(0,c.length-1)}sbUrl=c;loaded=false};SearchBroker.prefns=[];SearchBroker.prototype={init:function(){var a=this;if(typeof(jQuery)=="undefined"){SearchBroker.loadJS("../../../../../../js/jquery-api.html")}else{SearchBroker.firejQuery()}return this},trackSearch:function(e,b,f,d,a){var c=function(){var h={totalHits:b,page:f,q:e,scope:d,referrer:document.referrer};if(a!==null){h=SearchBroker.mergeProps(h,a)}var i=SearchBroker.getCookie("sb_session_id");if(i){h.session=i}var g=SearchBroker.getCookie("sb_user_id");if(g&&!h.user){h.user=g}jQuery.ajax({url:sbUrl+"/services/trackSearch",dataType:"jsonp",data:h,jsonp:"jsonCallback"})};if(SearchBroker.loaded){jQuery(c)}else{SearchBroker.prefns[SearchBroker.prefns.length]=c}},trackDocuments:function(b,e,f,d,a){var c=function(){var g=jQuery(b);jQuery.each(g,function(h,i){jQuery(i).bind("mousedown",function(l){var m={page:f,q:e,scope:d,url:this.href,follow:false};if(a!==null){m=SearchBroker.mergeProps(m,a)}var n=SearchBroker.getCookie("sb_session_id");if(n){m.session=n}var j=SearchBroker.getCookie("sb_user_id");if(j&&!m.user){m.user=j}var k=jQuery(this);if(k.attr("sb-title")!==""&&k.attr("sb-title")!==undefined){m.title=k.attr("sb-title")}else{if(k.attr("title")!==""&&k.attr("title")!==undefined){m.title=k.attr("title")}else{if(this.text!==""&&this.text!==undefined){m.title=this.text}else{if(this.innerText!==""&&this.innerText!==undefined){m.title=this.innerText}}}}jQuery.ajax({url:sbUrl+"/services/open",dataType:"jsonp",data:m,jsonp:"jsonCallback"})})})};if(SearchBroker.loaded){jQuery(c)}else{SearchBroker.prefns[SearchBroker.prefns.length]=c}},featuredDocs:function(b,e,d,a,f){var c=function(){var h={o:"json",m:e,q:b,scope:d,t:"*"};var i=SearchBroker.getCookie("sb_session_id");if(i){h.session=i}var g=SearchBroker.getCookie("sb_user_id");if(g&&!h.user){h.user=g}if(a){h=SearchBroker.mergeProps(h,a)}jQuery.ajax({url:sbUrl+"/services/featured",dataType:"jsonp",data:h,success:function(j){f(j)},jsonp:"jsonCallback"})};if(SearchBroker.loaded){jQuery(c)}else{SearchBroker.prefns[SearchBroker.prefns.length]=c}},featuredDocsCount:function(b,a,d){var c=function(){var e={o:"json",q:b,t:"*"};if(a){e=SearchBroker.mergeProps(e,a)}jQuery.ajax({url:sbUrl+"/services/featuredCount",dataType:"jsonp",data:e,success:function(f){d(f)},jsonp:"jsonCallback"})};if(SearchBroker.loaded){jQuery(c)}else{SearchBroker.prefns[SearchBroker.prefns.length]=c}},autocompleteJSON:function(b,e,d,a,f){var c=function(){var h={o:"json",m:e,q:b,scope:d,t:"*"};if(!d||d==null){delete h.scope}var i=SearchBroker.getCookie("sb_session_id");if(i){h.session=i}var g=SearchBroker.getCookie("sb_user_id");if(g&&!h.user){h.user=g}if(a){h=SearchBroker.mergeProps(h,a)}jQuery.ajax({url:sbUrl+"/services/autocomplete",dataType:"jsonp",data:h,success:f,jsonp:"jsonCallback"})};if(SearchBroker.loaded){jQuery(c)}else{SearchBroker.prefns[SearchBroker.prefns.length]=c}},autocomplete:function(f,d,g,c,a){var e=this;var b=function(){jQuery(f).autocomplete({delay:0,minLength:d,focus:function(h,i){return false},select:function(h,i){if(i.item.type=="topTerm"){$(f).val(i.item["native"].title_raw)}else{if(i.item.type=="quicklink"){document.location.href=i.item["native"].trackable_url}}return false},source:function(i,h){e.autocompleteJSON(i.term,g,c,a,function(l){var j=jQuery.map(l.quickLinks,function(m){return{label:m.title,sublabel:m.subtitle,value:m.title,id:m.id,"native":m,type:"quicklink"}});var k=jQuery.map(l.topTerms,function(m){return{label:m.title,value:m.title,id:m.url,"native":m,type:"topTerm"}});h(jQuery.merge(k,j))})}}).data("autocomplete")._renderItem=function(h,i){if(i["native"].imagename){return jQuery("<li></li>").data("item.autocomplete",i).append('<a><div class="imagen_producto_ac"><img width="60px" src="'+i["native"].imagename+'" /></div><div class="texto_producto_ac"><span><strong>'+i.label+"</strong></span><br /><span>"+i.sublabel+"</span></div></a>").appendTo(h)}else{return jQuery("<li></li>").data("item.autocomplete",i).append("<a><span>"+i.label+"</span></a>").appendTo(h)}}};if(SearchBroker.loaded){jQuery(b)}else{SearchBroker.prefns[SearchBroker.prefns.length]=b}},getLandings:function(c,d,b,e){var a=function(){var f={m:c,l:d,scope:b,o:"json",t:"*"};jQuery.ajax({url:sbUrl+"/services/landing",dataType:"jsonp",data:f,success:e,jsonp:"jsonCallback"})};if(SearchBroker.loaded){jQuery(a)}else{SearchBroker.prefns[SearchBroker.prefns.length]=a}},getTopSearches:function(b,c,d){var a=function(){var e={m:c,scope:b,o:"json",t:"*"};jQuery.ajax({url:sbUrl+"/services/topsearch",dataType:"jsonp",data:e,success:d,jsonp:"jsonCallback"})};if(SearchBroker.loaded){jQuery(a)}else{SearchBroker.prefns[SearchBroker.prefns.length]=a}}};SearchBroker.loadJS=function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("src",sbUrl+a);document.getElementsByTagName("head")[0].appendChild(b)};SearchBroker.firejQuery=function(){var b=SearchBroker.getCookie("sb_session_id");var a={createUser:SearchBroker.getCookie("sb_user_id")===null,createSession:b===null};if(b){SearchBroker.setCookie("sb_session_id",b,new Date(new Date().getTime()+1800*1000))}jQuery.ajax({url:sbUrl+"/services/ping",dataType:"jsonp",jsonp:"jsonCallback",data:a,success:function(c){if(c.userId){SearchBroker.setCookie("sb_user_id",c.userId,new Date(new Date().getTime()+365*3*24*3600*1000))}if(c.sessionId){SearchBroker.setCookie("sb_session_id",c.sessionId,new Date(new Date().getTime()+1800*1000))}if(includejQueryUI){SearchBroker.loadJS("../../../../../../js/jqueryui-api.html")}else{SearchBroker.loaded=true;SearchBroker.fireFullLoaded()}if(includeUICSS){var d=document.createElement("link");d.setAttribute("rel","stylesheet");d.setAttribute("type","text/css");d.setAttribute("href",sbUrl+"/css/jqueryui-api/jquery-ui.css");document.getElementsByTagName("head")[0].appendChild(d)}}})};SearchBroker.setCookie=function(b,c,a){document.cookie=b+"="+c+";expires="+a.toUTCString()};SearchBroker.getCookie=function(a){currentcookie=document.cookie;if(currentcookie.length>0){firstidx=currentcookie.indexOf(a+"=");if(firstidx!=-1){firstidx=firstidx+a.length+1;lastidx=currentcookie.indexOf(";",firstidx);if(lastidx==-1){lastidx=currentcookie.length}return unescape(currentcookie.substring(firstidx,lastidx))}}return null};SearchBroker.mergeProps=function(d,c){var b={};for(var a in d){if(d[a]===null){continue}b[a]=d[a]}for(var a in c){if(c[a]===null){continue}b[a]=c[a]}return b};SearchBroker.fireFullLoaded=function(){if(SearchBroker.loaded&&SearchBroker.prefns!==null){for(var a=0;a<SearchBroker.prefns.length;a++){jQuery(SearchBroker.prefns[a])}SearchBroker.prefns=[]}};SearchBroker.firejQueryUI=function(){SearchBroker.loaded=true;SearchBroker.fireFullLoaded()};