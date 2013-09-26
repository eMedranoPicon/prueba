$(document).ready(function() {
	$("#contenidoFlex1").hide();
  $("#contenidoFlex2").hide();

});
function verMas(id){

    if ($("#flexControl" + id).html() == 'Ocultar'){
      $("#flexControl" + id).html("Ver m&aacute;s");
      $("#contenidoFlex" +id).hide();
    }else{
      $("#flexControl" + id).html("Ocultar");
      $("#contenidoFlex" + id).show();
    }

}