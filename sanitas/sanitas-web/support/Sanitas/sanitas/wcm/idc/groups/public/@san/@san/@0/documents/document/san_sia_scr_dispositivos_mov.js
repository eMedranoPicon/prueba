var dispositivoMovil = "";
function conDispositivoMovil(){
  var isCuadro = document.getElementById("isCuadroMedico").value;
  if (isCuadro == "true"){
    var noInteresa = checkCookie("noMeInteresaGuiaMedica");
    var flagMovil = document.getElementById("flagMovil").innerHTML;
    var numeroMasTarde = valorCookieMasTarde();
    if(!noInteresa && (flagMovil == 0 && numeroMasTarde < 3)){
      var esAndroid = false;
      var esIphone = false;
      var esIpad = false;
      var userAgent = "";
      var popupModalMovil = document.getElementById("popupModalMovil").style;
      //Comprobar el tipo de browser --> ¿Android, Iphone o Ipad?
      
      // Android			
      userAgent = navigator.userAgent;
      esAndroid = userAgent.toLowerCase().indexOf("android") > -1;

      // Ipad
      // For use within normal web clients 
      esIpad = navigator.userAgent.match(/iPad/i) != null;
  
      // For use within iPad developer UIWebView
      esIPad = /iPad/i.test(userAgent) || /iPhone OS 3_1_2/i.test(userAgent) || /iPhone OS 3_2_2/i.test(userAgent);
      
      // Iphone
      esIphone = userAgent.match(/iPhone/i);
      
      var titulo = document.getElementById("titulo");
      if(esAndroid) {
        titulo.innerHTML = titulo.innerHTML + ' smartphone Android.';
        popupModalMovil.display = 'block';
      }else if(esIpad){
        titulo.innerHTML = titulo.innerHTML + ' iPad.';
        popupModalMovil.display = 'block';
      }else if(esIphone) {
        titulo.innerHTML = titulo.innerHTML + ' iPhone.';
        popupModalMovil.display = 'block';
      }
    }
    }
}

//Metodo que asigna una cookie si al usuario no le interesa la aplicacion.
function noMeInteresa(){
  var c_name = "noMeInteresaGuiaMedica";
  var c_value = "1";
  var c_expiracion = new Date();
  c_expiracion.setDate(c_expiracion.getDate() + 182);
  document.cookie = c_name + "=" + c_value + ";expires=" + c_expiracion.toUTCString();
  document.getElementById("popupModalMovil").style.display = 'none';
}

//Metodo que comprueba si existe una cookie con el nombre que recibe como parametro.
function checkCookie(c_name){
  var i,x,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++){
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name){
      return true;
    }
  }
}

//Metodo que asigna la cookie masTarde si el usuario desea que le pregunten mas tarde por la aplicacion movil.
function preguntarMasTarde(){
  var c_name = "masTardeGuiaMedica";
  var c_value = parseInt(valorCookieMasTarde()) + 1;
  var c_expiracion = new Date();
  c_expiracion.setDate(c_expiracion.getDate() + 182);
  document.cookie = c_name + "=" + c_value + ";expires=" + c_expiracion.toUTCString();
  document.getElementById("popupModalMovil").style.display = 'none';
}

//Metodo que devuelve el valor de la cookie masTarde.
function valorCookieMasTarde(){
  if(checkCookie("masTardeGuiaMedica")){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x=="masTardeGuiaMedica"){
        return unescape(y);
      }
    }
  }else{
    return 0;
  }
}
// Fin Resolucion INT-1277
