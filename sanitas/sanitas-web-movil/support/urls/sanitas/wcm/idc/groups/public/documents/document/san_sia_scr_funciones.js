// CSS Browser Selector   v0.2.9
var css_browser_selector = function() {
	var ua=navigator.userAgent.toLowerCase(),is=function(t){return ua.indexOf(t) != -1;},h=document.getElementsByTagName('html')[0],b=(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?'gecko ff2':is('firefox/3')?'gecko ff3':is('gecko/index.html')?'gecko':is('opera/9')?'opera opera9':/opera\s(\d)/.test(ua)?'opera opera'+RegExp.$1:is('konqueror')?'konqueror':is('chrome')?'chrome webkit safari':is('applewebkit/index.html')?'webkit safari':is('mozilla/index.html')?'gecko':'',os=(is('x11')||is('linux'))?' linux':is('mac')?' mac':is('win')?' win':'';var c=b+os+' js'; h.className += h.className?' '+c:c;
}();

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function P7_autoLayers() { //v1.4 by PVII
 var g,b,k,f,args=P7_autoLayers.arguments;a=parseInt(args[0]);if(isNaN(a))a=0;
 if(!document.p7setc){p7c=new Array();document.p7setc=true;for(var u=0;u<10;u++){
 p7c[u]=new Array();}}for(k=0;k<p7c[a].length;k++){if((g=MM_findObj(p7c[a][k]))!=null){
 b=(document.layers)?g:g.style;b.visibility="hidden";}}for(k=1;k<args.length;k++){
 if((g=MM_findObj(args[k]))!=null){b=(document.layers)?g:g.style;b.visibility="visible";f=false;
 for(var j=0;j<p7c[a].length;j++){if(args[k]==p7c[a][j]) {f=true;}}
 if(!f){p7c[a][p7c[a].length++]=args[k];}}}
}

function MM_setTextOfLayer(objId,x,newText) { //v9.0
  with (document) if (getElementById && ((obj=getElementById(objId))!=null))
    with (obj) innerHTML = unescape(newText);
}

/****************/
function PopUp(img){ 
foto1= new Image(); 
foto1.src=(img); 
Control(img); 
} 
function Control(img){ 
    if((foto1.width!=0)&&(foto1.height!=0)){ 
        verFoto(img); 
    }else{ 
        funcion="Control('"+img+"')"; 
        intervalo=setTimeout(funcion,20); 
        } 
    } 
function verFoto(img){ancho=foto1.width+20; 
    alto=foto1.height+20; 
    cadena="width="+ancho+",height="+alto; 
    ventana=window.open(img,"",cadena); 
}
/****************/
function toggler(obj) {
	var el = document.getElementById(obj);
	if ( el.style.display != 'none' ) {
		el.style.display = 'none';
	}
	else {
		el.style.display = '';
	}
}
/****************/
function ShowHide(LayerName,TotalLayers){//v1.0
	var temp = new Array();
	temp = LayerName.split('_');
	ReLayerName = temp[0];
	
		for (i=1;i<=TotalLayers;i++){
		document.getElementById(ReLayerName+'_'+i).style.display = 'none';
		}
	document.getElementById(LayerName).style.display = 'block';
}
/****************/
function LinkClasses(IDlink,TotalLinks,OFF,ON){//v1.0
	var temp = new Array();
	temp = IDlink.split('_');
	ReIDlink = temp[0];

		for (i=1;i<=TotalLinks;i++){
		document.getElementById(ReIDlink+'_'+i).className = OFF;
		}
	document.getElementById(IDlink).className = ON;
}
/****************/
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
/****************/
function DisplayIt(IDlayerName, action){
	var w3cDom=document.all||document.getElementById
	if (w3cDom){
		var doc=document.getElementById? document.getElementById(IDlayerName) : document.all[IDlayerName]

		if ( action != null ) {
			if ( action == 'show' ) 
				doc.style.display = 'block';
			else if ( action == 'hidden' ) 
				doc.style.display = 'none';
		}else{
			if(doc.style.display == 'none'){
				doc.style.display = 'block';
			}else{
				doc.style.display = 'none';
			}
		}
   }
}
/****************/
var bustcachevar=1 //bust potential caching of external pages after initial request? (1=yes, 0=no)
var loadedobjects=""
var rootdomain="http://"+window.location.hostname
var bustcacheparameter=""

function ajaxpage(url, containerid){
var page_request = false
if (window.XMLHttpRequest) // if Mozilla, Safari etc
page_request = new XMLHttpRequest()
else if (window.ActiveXObject){ // if IE
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
} 
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
page_request.onreadystatechange=function(){
loadpage(page_request, containerid)
}
if (bustcachevar) //if bust caching of external page
bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
page_request.open('GET.html', url+bustcacheparameter, true)
page_request.send(null)
}

function loadpage(page_request, containerid){
if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
document.getElementById(containerid).innerHTML=page_request.responseText
}

function loadobjs(){
if (!document.getElementById)
return
for (i=0; i<arguments.length; i++){
var file=arguments[i]
var fileref=""
if (loadedobjects.indexOf(file)==-1){ //Check to see if this object has not already been added to page before proceeding
if (file.indexOf(".js")!=-1){ //If object is a js file
fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", file);
}
else if (file.indexOf(".css")!=-1){ //If object is a css file
fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", file);
}
}
if (fileref!=""){
document.getElementsByTagName("head").item(0).appendChild(fileref)
loadedobjects+=file+" " //Remember this object as being already added to page
}
}
}
/*SIZER*/
function increaseFontSize(obj) {
	var className = getClassName(obj);
	if ('small' == className) {
		d(obj).className = 'normal';
	}else if ('normal' == className) {
		d(obj).className = 'large';
	}else if ('large' == className) {
		d(obj).className = 'large-x';
	}else if ('small-x' == className) {
		d(obj).className = 'small';
	}
}

function decreaseFontSize(obj) {
	var className = getClassName(obj);
	if ('normal' == className) {
		d(obj).className = 'small';
	}else if ('large' == className) {
		d(obj).className = 'normal';
	}else if ('large-x' == className) {
		d(obj).className = 'large';
	}else if ('small' == className) {
		d(obj).className = 'small-x';
	}
}

function getClassName(obj) {
  return d(obj).className;
}

function d(id) {
  return document.getElementById(id);
}
/****************/
// F. Permadi May 2000
function getFlashMovieObject(movieName)
{
  if (window.document[movieName]) 
  {
    return window.document[movieName];
  }
  if (navigator.appName.indexOf("Microsoft Internet")==-1)
  {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName]; 
  }
  else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
  {
    return document.getElementById(movieName);
  }
}

function StopFlashMovie(MovieID){
	var flashMovie=getFlashMovieObject(MovieID);
	flashMovie.StopPlay();
}