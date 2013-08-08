$(document).ready(function(){
  jQuery.extend(jQuery.expr[ ":" ],{ reallyvisible : function (a) { return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); }});
  var expresion = jQuery('h2').filter(function(){
  return /(^|\s)(Hospital la Zarzuela)(\s|$)/.test(jQuery(this).text());});
  var expresion2 = jQuery('h2').filter(function(){
  return /(^|\s)(Milenium Centro Médico Núñez de Balboa)(\s|$)/.test(jQuery(this).text());});
  var titulo = $('.titMedico li h2').html();
  var comparadorZarzuela = 'Hospital la Zarzuela';
  var comparadorBalboa = 'Milenium Centro Médico Núñez de Balboa';
  var comparadorArtaza = 'Milenium Centro Médico Artaza';
  var comparadorMurcia = 'Milenium Centro Médico Murcia';
  var comparadorBuhaira = 'Milenium Centro Médico la Buhaira';
  var compardorRobresa = 'Milenium Centre Médic Robresa';
  var comparadorBalmes = 'Milenium Centro Médico Balmes';
  var comparador2 = '902500742';
  var telefonoApp = $('.tels li').html();
  
  if (titulo != null && (comparadorZarzuela.indexOf(titulo) || comparadorBalboa.indexOf(titulo) || comparadorArtaza.indexOf(titulo) || comparadorMurcia.indexOf(titulo) ||
  comparadorBuhaira.indexOf(titulo) || comparadorRobresa.indexOf(titulo) || comparadorBalmes.indexOf(titulo)) && comparador2 == telefonoApp){
    $('.tels li').html('902102400');  
  }
  //inicializarAPI();
  
  
}); 

/* busca la lista de direcciones relacionadas con la indicada
* @param direccion: direccion sobre la que se quieren realizar busquedas
*/

 
function mostrarMapaLista( direccion ) {
  if( direccion == '' ) {
    $( '#BuscaProximidadCampo' ).focus();
  } else {
      geocoder = new google.maps.Geocoder();
    if( geocoder ) {
      var prov = '';
      if($('#provinciaHomeMedicos').val()!='p'){
         prov = $('#provinciaHomeMedicos').val();
      }
      var direccionEsp = direccion +','+prov + ',es';  
      geocoder.geocode( { 'address': direccionEsp,'region':'es'}, setListOfAddresses);     
     /* if( $( '#provinciaHomeMedicos' ).find( ':selected' ).text() != 'Provincia' ) {
        direccionEsp = direccion + ',' + $( '#provincia' ).find( ':selected' ).text().toLowerCase() + ',es';
      }
      geocoder.getLocations( direccionEsp, setListOfAddresses );*/
    }
     else {
      alert( 'El navegador no es compatible' );
    }
  }
}

function guardarCoordenadasDireccion(direccion,url){
$('#url').val(url);
if( direccion == '' ) {
    $( '#BuscaProximidadCampo' ).focus();
  } else {
      geocoder = new google.maps.Geocoder();
    if( geocoder ) {
      var prov = '';
      if($('#provinciaHomeMedicos').val()!='p'){
         prov = $('#provinciaHomeMedicos').val();
      }
    var direccionEsp = direccion +','+prov + ',es';  
    geocoder.geocode( { 'address': direccionEsp,'region':'es'}, guardaCoordenadas);     

}
  }
}

function guardaCoordenadas( response , status) {
var placemark;
var cp = $('#CPostalUrl').val();
  if(status != google.maps.GeocoderStatus.OK) {
    $( '#listaDirecciones' ).empty();
    $( '#listaDirecciones' ).append( '<p class="textotitular">No se ha podido encontrar la direcci&oacute;n</p><ul class="flechas"></ul>' );
  } else {
    $( '#map_canvas' ).hide();
   
    if(response.length > 1){
    $( '#listaDirecciones' ).empty();
    $( '#listaDirecciones' ).append( '<p class="textotitular">Usted quiere ver Centros cerca de...</p><ul class="flechas"></ul>' );
    for( var i = 0; i < response.length; i++ ) {
      placemark = response[ i ].geometry.location;
    
      if (response[i].address_components[2].long_name == 'Madrid' ){
            
             $('#CPostalOculto').val('28001');
        }
      else if (response[i].address_components[2].long_name == 'Barcelona' ){
           
             $('#CPostalOculto').val('08001');
        }
       $( '#listaDirecciones ul' ).append( '<li><a onclick="javascript:enviaCoordenadas( ' + placemark.lat() + ',' + placemark.lng() + ','+ cp +'); return false;" title=\"' + response[i].formatted_address + '">' + response[i].formatted_address + '</a></li>' );
    }
    $( '#listaDirecciones' ).show();
    }else if (response.length == 1){
        if (response[0].address_components[2].long_name == 'Madrid' ){
              $('#CPostalOculto').val('28001');
        }
    else if (response[0].address_components[2].long_name == 'Barcelona' ){
              $('#CPostalOculto').val('08001');
        }
    var latitud = response[0].geometry.location.lat();
    var longitud = response[0].geometry.location.lng();
    enviaCoordenadas(latitud,longitud,cp)
    
}
  }
}
function enviaCoordenadas( latMapa, longMapa, cp) {
  var url = $('#url').val();
  $('#latitud').val(latMapa);
  $('#longitud').val(longMapa);
  $('#CPostalUrl').val(cp);
  $('#form3').attr('action',url);
  $('#form3').submit();
  
  return false;
} 

/* callback function que establece la lista de direcciones asociadas a la introducida por el usuario
* @param response: response asociada a la peticion de proximidad
*/
function setListOfAddresses( response , status) {
var placemark;
  if(status != google.maps.GeocoderStatus.OK) {
    $( '#listaDirecciones' ).empty();
    $( '#listaDirecciones' ).append( '<p class="textotitular">No se ha podido encontrar la direcci&oacute;n</p><ul class="flechas"></ul>' );
  } else {
    $( '#map_canvas' ).hide();
   
    if(response.length > 1){
    $( '#listaDirecciones' ).empty();
    $( '#listaDirecciones' ).append( '<p class="textotitular">Usted quiere ver Centros cerca de...</p><ul class="flechas"></ul>' );
    for( var i = 0; i < response.length; i++ ) {
      placemark = response[ i ].geometry.location;
      var cp = '';
      if (response[i].address_components[2].long_name == 'Madrid' ){
             cp = '28001';
             $('#CPostalOculto').val('28001');
        }
      else if (response[i].address_components[2].long_name == 'Barcelona' ){
             cp = '08001'; 
             $('#CPostalOculto').val('08001');
        }
      $( '#listaDirecciones ul' ).append( '<li><a onclick="javascript:busquedaLocalizaciones( ' + placemark.lat() + ',' + placemark.lng() + ',\'' + response[i].formatted_address + '\',\''+ cp +'\'); return false;" title=\"' + response[i].formatted_address + '">' + response[i].formatted_address + '</a></li>' );
    }
    $( '#listaDirecciones' ).show();
    }
    else {
      if(response.length == 1){     
        if (response[0].address_components[2].long_name == 'Madrid' ){
              $('#CPostalOculto').val('28001');
        }
    else if (response[0].address_components[2].long_name == 'Barcelona' ){
              $('#CPostalOculto').val('08001');
        }
        busquedaLocalizaciones( response[0].geometry.location.lat(), response[0].geometry.location.lng(),response[0].formatted_address );
      }
    }
  }
  return false;
}

/* busqueda de localizaciones cercanas a las coordenadas dadas
* @param latMapa: coordenada latitud
* @param longMapa: coordenada longitud
* @param texto: texto asociado al mapa
*/
function busquedaLocalizaciones( latMapa, longMapa, texto, cp) {
  var url="/sanitas/seguros/es/particulares/medicosycentros/cuadro-medico-sanitas/"+esDniTarjetaMapa()+$('#busquedaGuia').html()+"/"+ getNomPestana() +"/proximidad/"+provincia+"/"+especialidad+"/"+subespecialidad+"/"+latMapa+"/"+longMapa;
  $('#CPostalOculto').val(cp);

  $('#form3').attr('action',url);
  $('#form3').submit();
  
  return false;
} 

function pintarMapa(id,lat, long, latBusq,longBusq){    
 $('#producto').attr("disabled","disabled");
      var point =  new google.maps.LatLng(lat,long);
      var begin =   new google.maps.LatLng(latBusq,longBusq); 
      var directionsService =  new google.maps.DirectionsService();
      
      
      var directionsDisplay =  new google.maps.DirectionsRenderer();
      var myOptions = {
        zoom: 15,
        center: point,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        language: 'es'
      }
      var map = new  google.maps.Map(document.getElementById('mapa'+id),myOptions);
      


      directionsDisplay.setMap(map,myOptions);
      
      var request = {
          origin:begin,
          destination:point,
          travelMode: google.maps.TravelMode.DRIVING,
          region: 'es'
        
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {            
            $('#distancia'+id).html(response.routes[0].legs[0].distance.text+','+response.routes[0].legs[0].duration.text);
            directionsDisplay.setDirections(response);          
            $('#mapa'+id+'route').html('');
            $('#mapa'+id+'route').append('<ol><\/ol>');
            var flag_salida = 0;
            for(step in response.routes[0].legs[0].steps){
              if (response.routes[0].legs[0].steps[step].instructions == null){
                break;
              }
              $('#mapa'+id+'route').children('ol').append('<li>'+response.routes[0].legs[0].steps[step].instructions+'<\/li>');
            }
          }
          else {            
            if (latBusq == null || longBusq == null || latBusq == 0 || longBusq == 0 ){
              $('#mapa'+id+'route').html('');
            } else {
              $('#mapa'+id+'route').html('No ha sido posible calcular una ruta');
            }
          }
        });
        
      setTimeout(function(){
      var marker = new google.maps.Marker({
        position: point, 
        map: map,
        icon: "http://www.sanitas.es/img/site_sanitas/medicosycentros/miniLogo.png",
        zIndex:500,
        animation: google.maps.Animation.DROP
      });
      },1000);
        
       if ($('#famacia' + id).attr('checked')) { 
        marcadoresFarmacias(map);
       }
        if ($('#famaciaguardia' + id).attr('checked')) { 
          marcadoresFarmaciasGuardia(map);
        }
            
        
      $('#cerrarmapa'+id).show(500);
      $('#abrirmapa'+id).hide(500);
      
  
}


// Creates a marker at the given point with the given number label, ***centro medico
  function createMarker(point, descripcion,contenido,  icono, mapa) 
  { 
      var marker = new google.maps.Marker({
          position: point, 
          map: mapa, 
          icon: icono,
          title:descripcion
      }); 
      
      var infowindow = new google.maps.InfoWindow({
          content: contenido
      });
      
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(mapa,marker);
      });
      return marker;
  }
  
  
  function recalcularFarmacias(id,lat, long,latBusq,longBusq){  
     pintarMapa(id,lat, long,latBusq,longBusq);      
}      

function verMapa(id,lat, long,latBusq,longBusq){  
     var arrayScripts = document.getElementsByTagName("script");
     var continuar = false;
     var srcAPI = "http://maps.google.es/maps/api/js?v=3.6.2&amp;sensor=false&amp;language=es&amp;client=gme-bupa&amp;channel=Sanitas-guiamedica-web";
     for(var i=0,t=arrayScripts.length;i<t;i++){
      if(arrayScripts[i].src==srcAPI){
        continuar = true;
        break;
      }
     }
     if (continuar == false){
       var calssScript = $('#scriptAPI').attr('class');
       while (calssScript == null){
        calssScript = $('#scriptAPI').attr('class');
       }
     }
      $('#mapa'+id).show(500);
      $('#mapa'+id+'route').show(500);
      $('#inputRuta'+id).show(500);
      $('#botRuta'+id).show(500);
      $('#divRuta'+id).show(500);
      if(''==$('#mapa'+id).html()){      
        setTimeout(function(){pintarMapa(id,lat, long,latBusq,longBusq)},600);
      }
      else {    
        $('#cerrarmapa'+id).show(800);
        $('#abrirmapa'+id).hide(800);
      }
}

function creaRuta(idMap,lat,long){
    var prov = '';
    if($('#provinciaHomeMedicos').val()!='p'){
       prov = $('#provinciaHomeMedicos').val();
    }
    var direccionEsp = $('#inputRuta'+idMap).val()+',es';  
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': direccionEsp,'region':'es'}, function(response , status){
      presentaNuevaRuta(response , status,idMap,lat,long);
    });     
}

function presentaNuevaRuta(response , status,idMap,lat,long){
  if(response.length >= 1){
    pintarMapa(idMap,lat,long,response[0].geometry.location.lat(), response[0].geometry.location.lng());
  } else {
    $('#mapa'+idMap+'route').html('No ha sido posible calcular una ruta');
  }
}



function cerrarMapa(id){
      $('#mapa'+id).hide(500);
      $('#mapa'+id+'route').hide(500);
      $('#cerrarmapa'+id).hide(500);
      $('#inputRuta'+id).hide(500);
      $('#botRuta'+id).hide(500);
      $('#divRuta'+id).hide(500);
      $('#abrirmapa'+id).show(500);      
}


function ponerFocoMapa(id) {
    $('#mapa'+id).height('430px');
}

function quitarFocoMapa (id){
  $('#mapa'+id).height('250px');
}

function esDniTarjetaMapa(){
    var esTarjeta = $('#numtarjeta')!=null && $('#numtarjeta').val()!=null && $('#numtarjeta').val() != '' &&  $('#numtarjeta').val() != 'undefined';    
    var esDNI = $('#usuariopordni')!=null && $('#usuariopordni').val()!=null && $('#usuariopordni').val() != '' &&  $('#usuariopordni').val() != 'undefined';    
    return (esTarjeta ?'tarjeta/' : '')+(esDNI ?'dni/' : '');    
}

function inicializarAPI(){
  var calssScript = $('#scriptAPI').attr('class');
  if (calssScript == null){
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.id = "scriptAPI";
     script.className = "cargadoOK";
     script.src = "http://maps.google.es/maps/api/js?v=3.6.2&amp;sensor=false&amp;language=es&amp;client=gme-bupa&amp;channel=Sanitas-guiamedica-web";
     document.body.appendChild(script);
   }
}

function inicializarAPIVerMapa(){
  var calssScript = $('#scriptAPI').attr('class');
  if (calssScript == null){
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.id = "scriptAPI";
     script.className = "cargadoOK";
     script.src = "http://maps.google.es/maps/api/js?v=3.6.2&amp;sensor=false&amp;language=es&amp;client=gme-bupa&amp;channel=Sanitas-guiamedica-web&amp;callback=verMapa";
     document.body.appendChild(script);
   }
}


