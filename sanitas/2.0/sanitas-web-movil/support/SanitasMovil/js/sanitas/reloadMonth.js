$(document).ready(function() {
	$(".err").hide();
	
	$(".dia").focus(function(){
		var indice = $(this).attr("name").split("-");
		//alert (indice[1]);
		$("#mes"+indice[1]).attr("disabled","disabled");
		$("#anio"+indice[1]).attr("disabled","disabled");
	});
	
	$(".mes").focus(function(){
		var indice = $(this).attr("name").split("-");
		//alert (indice[1]);
		$("#anio"+indice[1]).attr("disabled","disabled");
	});
});

var meses = new Array()
meses[28] = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";
meses[30] = "Enero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";
meses[31] = "Enero,Marzo,Mayo,Julio,Agosto,Octubre,Diciembre";



function validateCp(campo){
        var filter = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
        // utilizamos test para comprobar si el parametro valor cumple la regla
        if(filter.test(campo))
            return true;
        else
            return false;
}

function reloadMes(dia,valor){
	var mesDom = "mes";
	var html = "";
	//alert(valor);
	var intValor = parseInt(valor,10);
	if (intValor < 30){
		//Nos vale cualquier mes
		arr = meses[28].split(",");
	}else{
		if (intValor == 30){
			//Seleccion 30
			arr = meses[30].split(",");
		}else{
			//Seleccion 31
			arr = meses[31].split(",");
		}
	}
	var mes = 1;
	for (i = 0; i < arr.length; i++){
		html += "<option value='" + mes + "'>" + arr[i] + "</option>";
		mes++;
	}
	$("#"+mesDom).removeAttr("disabled");
	//$("#anio"+indice).removeAttr("disabled");
	$("#"+mesDom).html(html);
	
	enableYear();
}

function enableYear(){
	var anioDom = "anyo";
	
	var html = "";
	
	var fecha=new Date();

	var year = parseInt(fecha.getFullYear());
	var iniYear = year - 100;

	for (i = year; i > iniYear; i--){
		html += "<option value='" + i + "'>" + i + "</option>";
	}
	$("#"+anioDom).removeAttr("disabled");
	//$("#anio"+indice).removeAttr("disabled");
	$("#"+anioDom).html(html);
}
