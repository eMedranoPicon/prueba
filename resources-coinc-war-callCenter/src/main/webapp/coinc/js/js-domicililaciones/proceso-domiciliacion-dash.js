//Correccion de la inyeccion de comentarios en los templates
$("#upload-box").html($("#upload-box").html().replace("<!--","").replace("//-->",""))
$("#button-box").html($("#button-box").html().replace("<!--","").replace("//-->",""))
$("#canvas-box").html($("#canvas-box").html().replace("<!--","").replace("//-->",""))
//Fin

! function(e) {
    function t(o) {
        if (a[o]) return a[o].exports;
        var r = a[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var a = {};
    return t.m = e, t.c = a, t.p = "", t(0)
}([function(e, t, a) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = a(1),
        i = o(r),
        s = a(2),
        n = o(s),
        c = a(3),
        p = o(c),
        l = a(4),
        d = o(l);
    window.vm = new i["default"]({
        el: "body",
        components: {
            ButtonBox: n["default"],
            UploadBox: p["default"],
            CanvasBox: d["default"]
        },
        events: {
            broadcast: function(e, t) {
                this.$broadcast(e, t)
            }
        }
    })
}, function(e, t) {
    e.exports = window.Vue
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = {
        data: function() {
            return {
                uploaded: !1,
                cropping: !1,
                cropped: !1,
                download: "undefined" != typeof document.createElement("a").download,
                url: "",
                name: ""
            }
        },
        template: "#button-box",
        methods: {
            click: function(e) {
                var t = e.target,
                    a = t.dataset.action || t.parentNode.dataset.action;
                if (a) {
                    switch (a) {
                        case "restore":
                            this.restore();
                            break;
                        case "remove":
                            this.remove();
                            break;
                        case "clear":
                        case "crop":
                            this.cropping = !1
                    }
                    this.$dispatch("broadcast", a)
                }
            },
            restore: function() {
                this.cropped = !1, this.url = "", this.name = ""
            },
            remove: function() {
                this.uploaded = !1, this.cropping = !1, this.cropped && this.restore()
            }
        },
        events: {
            uploaded: function() {
                this.uploaded = !0
            },
            cropping: function() {
                this.cropping = !0
            },
            cleared: function() {
                this.cropping = !1
            },
            restored: function() {
                this.restore()
            },
            removed: function() {
                this.remove()
            },
            cropped: function(e) {
                this.cropped = !0, this.cropping = !1, this.download && (this.url = e.url, this.name = e.name)
            }
        }
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = {
        data: function() {
            return {
                uploaded: !1
            }
        },
        template: "#upload-box",
        methods: {
            read: function(e) {
                var t = this,
                    a = arguments.length <= 1 || void 0 === arguments[1] ? function() {} : arguments[1],
                    o = null;
                e ? /^image\/\w+$/.test(e.type) ? (o = new FileReader, o.onload = function() {
                    t.uploaded = !0, t.$dispatch("broadcast", "uploaded", {
                        type: e.type,
                        name: e.name,
                        url: o.result
                    }), a()
                }, o.readAsDataURL(e)) : (window.alert("Please choose an image file."), a()) : a()
            },
            change: function(e) {
                var t = e.target,
                    a = t.files;
                this.read(a && a[0], function() {
                    t.value = ""
                })
            },
            dragover: function(e) {
                e.preventDefault()
            },
            drop: function(e) {
                var t = e.dataTransfer.files;
                e.preventDefault(), this.read(t && t[0])
            }
        },
        events: {
            remove: function() {
                this.uploaded = !1
            },
            removed: function() {
                this.uploaded = !1
            }
        }
    }
}, function(e, t, a) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = a(5),
        i = o(r);
    t["default"] = {
        data: function() {
            return {
                editable: !1,
                cropper: !1,
                cropping: !1,
                data: null,
                canvasData: null,
                cropBoxData: null,
                image: null,
                type: "",
                name: "",
                url: "",
                originalUrl: ""
            }
        },
        template: "#canvas-box",
        ready: function() {
            window.addEventListener("keydown", this.keydown, !1)
        },
        beforeDestory: function() {
            window.removeEventListener("keydown", this.keydown, !1)
        },
        methods: {
            load: function(e) {
                this.image || (this.image = e.target, this.start())
            },
            click: function(e) {
                var t = this.cropper,
                    a = e.target,
                    o = "";
                if (t) switch (o = a.dataset.action || a.parentNode.dataset.action) {
                    case "move":
                    case "crop":
                        t.setDragMode(o);
                        break;
                    case "zoom-in":
                        t.zoom(.1);
                        break;
                    case "zoom-out":
                        t.zoom(-.1);
                        break;
                    case "rotate-left":
                        t.rotate(-90);
                        break;
                    case "rotate-right":
                        t.rotate(90);
                        break;
                    case "flip-horizontal":
                        t.scaleX(-this.cropper.getData().scaleX || -1);
                        break;
                    case "flip-vertical":
                        t.scaleY(-this.cropper.getData().scaleY || -1)
                }
            },
            keydown: function(e) {
                var t = this.cropper,
                    a = e.key || e.keyCode || e.which || e.charCode;
                switch (a) {
                    case 90:
                        e.ctrlKey && (e.preventDefault(), this.restore(!0));
                        break;
                    case 46:
                        this.remove(!0)
                }
                if (t) switch (a) {
                    case 13:
                        this.crop(!0);
                        break;
                    case 27:
                        this.clear(!0);
                        break;
                    case 37:
                        e.preventDefault(), t.move(-1, 0);
                        break;
                    case 38:
                        e.preventDefault(), t.move(0, -1);
                        break;
                    case 39:
                        e.preventDefault(), t.move(1, 0);
                        break;
                    case 40:
                        e.preventDefault(), t.move(0, 1);
                        break;
                    case 67:
                        t.setDragMode("crop");
                        break;
                    case 77:
                        t.setDragMode("move");
                        break;
                    case 73:
                        t.zoom(.1);
                        break;
                    case 79:
                        t.zoom(-.1);
                        break;
                    case 76:
                        t.rotate(-90);
                        break;
                    case 82:
                        t.rotate(90);
                        break;
                    case 72:
                        t.scaleX(-this.cropper.getData().scaleX || -1);
                        break;
                    case 86:
                        t.scaleY(-this.cropper.getData().scaleY || -1)
                }
            },
            dblclick: function(e) {
                e.target.className.indexOf("cropper-face") >= 0 && (e.preventDefault(), e.stopPropagation(), this.crop(!0))
            },
            start: function() {
                var e = this;
                this.cropper || (this.cropper = new i["default"](this.image, {
                    autoCrop: !1,
                    dragMode: "move",
                    background: !1,
                    built: function() {
                        e.data && (this.cropper.crop().setData(e.data).setCanvasData(e.canvasData).setCropBoxData(e.cropBoxData), e.data = null, e.canvasData = null, e.cropBoxData = null)
                    },
                    crop: function(t) {
                        t.width > 0 && t.height > 0 && !e.cropping && (e.cropping = !0, e.$dispatch("broadcast", "cropping"))
                    }
                }))
            },
            stop: function() {
                this.cropper && (this.cropper.destroy(), this.cropper = null, this.cropping = !1)
            },
            crop: function(e) {
                var t = this.cropper,
                    a = this.type;
                this.cropping && (this.originalUrl = this.url, this.data = t.getData(), this.canvasData = t.getCanvasData(), this.cropBoxData = t.getCropBoxData(), this.url = t.getCroppedCanvas("image/png" === a ? null : {
                    fillColor: "#fff"
                }).toDataURL(a), this.stop(), e && this.$dispatch("broadcast", "cropped", {
                    url: this.url,
                    name: this.name
                }))
            },
            clear: function(e) {
                this.cropping && (this.cropper.clear(), this.cropping = !1, e && this.$dispatch("broadcast", "cleared"))
            },
            restore: function(e) {
                this.cropper || (this.image = null, this.url = this.originalUrl, this.originalUrl = "", e && this.$dispatch("broadcast", "restored"))
            },
            remove: function(e) {
                this.cropping || (this.stop(), this.editable = !1, this.data = null, this.image = null, this.type = "", this.name = "", this.url = "", this.originalUrl = "", e && this.$dispatch("broadcast", "removed"))
            }
        },
        events: {
            uploaded: function(e) {
                var t = e.url,
                    a = e.type,
                    o = e.name;
                this.editable = !0, this.type = a, this.name = o, this.url = t
            },
            remove: function() {
                this.remove()
            },
            crop: function() {
                this.crop(!0)
            },
            clear: function() {
                this.clear()
            },
            restore: function() {
                this.restore()
            }
        }
    }
}, function(e, t) {
    e.exports = window.Cropper
}]);


/*FUNCIONALIDAD DEL PROCESO DE DOMICILIACION*/
var numerorecibo = 0;
var hash = 0;
var numeroFirma = 0;
var venimosDeError = 0;
$(document).ready(function(){
    $('#telefono-persona').hide();
    if(venimosDeError == 0) {
        $('#nombre-nif').hide();
    }

    // Bindeo el cierre de la modal de dni
    resetModalAlertaDNIData();

    $('.save_recibo').click(function(){
        //asigno href del div que abre el collapsble y id del collapsable
        hash = 0;
        $(".mas-datos").each(function(){
            $(this).attr("href",  "#" + (++hash)); //asigno a cada div .mas-datos un href que empiece en 0 y se vaya incrementando de 1 en 1.
            $(this).siblings('.collapse').attr("id", hash);//asigna id nueva al hermano de cada collapse
        })

        if ($('.menu__button.menu__button--success').is(':visible')) {
            $('.menu__button.menu__button--success').click();//repproduce el evento click en botón de aceptar recorte
        }
        setTimeout(doNextSaveRecibo, 10);//para que de tiempo a ejecutar las dos funciones: recortar y guardar miniatura.
    });

    function doNextSaveRecibo(){
        /*Añade miniatura de recibo en una lista*/
        var src = $('.canvas .editor img').attr('src');
        numerorecibo++;
        $('.listado_miniaturas').append('<li class="recibo"><p>Recibo nº ' + numerorecibo + '</p><img id="imagenRecibo' + numerorecibo + '" src="' + src + '" alt=""/><span class="icon-sprite remove_image"></span><a class="mas-datos" role="button" data-toggle="collapse" href="#mas-datos" aria-expanded="false" aria-controls="masDatos">Más datos</a><div class="collapse" id="mas-datos"><form class="form-en-modal" id="datos-recibo-colegios' + numerorecibo + '" action="#"><label for="telefono">Teléfono contacto</label><input id="formMain' + numerorecibo + ':telefono" name="formMain' + numerorecibo + ':telefono" type="text" class="form-control"><label for="contactaconnosotros_nombre" class="pull-left">Persona contacto</label><input id="formMain' + numerorecibo + ':nombre" name="formMain' + numerorecibo + ':nombre" type="text" value="" class="form-control"></form></div></li>');
        $('#removeImg').click(); //reproducimos el evento click sobre el icono de papelera que reinicia al cropper

        $('.close').click();
        eval("btn2" + idEventoPulsado).enable();
        $('.close').click();
    }

    $(document).on('click', '.remove_image', function() {
            $(this).parent().remove();
            if($('.firma_miniatura').children().length == 0){
                $("#btn-subir-firma").show();
                $('#mostrarNombreYnif').empty();
                numeroFirma = 0;
            }
        });

    /*FUNCION NUMERAR RECIBOS*/



    /*función al clicar guardar firma*/
    $('.save_firma').click(function(){
        //Comprobamos primero que ha insertado nombre y apellidos y nif.
        if ($('.menu__button.menu__button--success').is(':visible')) {
            $('.menu__button.menu__button--success').click();//repproduce el evento click en botón de aceptar recorte
        }
        setTimeout(doNextSaveFirma, 10);//para que de tiempo a ejecutar las dos funciones: recortar y guardar miniatura.
    });
     function doNextSaveFirma(){
        var textoError = '';
        if($("[id='formMain-nombre']").val() == ''){
            textoError = textoError + "Debes informar tu nombre y apellidos" + "<br/>";
        }
        if(!validateCIF($("[id='formMain-nif']").val())) {
            textoError = textoError + "El NIF no es válido" + "<br/>";
        }
        if(textoError != ''){
            $("#textoDelErrorFormulario").empty();
            $("#textoDelErrorFormulario").append(textoError);
            $("#mensajeDeErrorFormulario").removeClass('hidden');
            return false;
        }else {
            /*Añade miniatura de firma recortada en una lista*/
            var src = $('.canvas .editor img').attr('src');
            var nombre_firma = $('#formMain-nombre').val();
            var nif_firma = $('#formMain-nif').val();
            numeroFirma++;
            $('.firma_miniatura').append('<li><img id="imagenFirma' + numeroFirma + '" src="' + src + '" alt=""/><span class="nombre"><strong>NOMBRE:</strong> ' + nombre_firma + '<br></span><span class="nif"><strong>NIF:</strong> ' + nif_firma + '</span><span class="icon-sprite remove_image"></span><form class="form-en-modal" id="datosfirma' + numeroFirma + '" action="#"><input id="formfirma' + numeroFirma + ':nombre" name="formfirma' + numeroFirma + ':nombre" value="' + nombre_firma + '" type="hidden" class="form-control"><input id="formfirma' + numeroFirma + ':nif" name="formMain' + numeroFirma + ':nif" value="' + nif_firma + '" type="hidden" value="" class="form-control"></form></li>');
            $('#removeImg').click(); //reproducimos el evento click sobre el icono de papelera que reinicia al cropper
            $("form#datos-firma :input").each(function () {
                var input = $(this);
                $('#nombre-nif').show();
                /*$('ul.firma_miniatura li').append($(this).val() + "<br>");*/
            })
            /*$("#btn-subir-firma").hide();*/
            $('.close').click();
            eval("btn2" + idEventoPulsado).enable();
            $('.close').click();
        }
    }

    /*ocultar/mostrar botones en el modal dependiendo del botón que lo lanza*/
    $('#btn-subir-firma').click(function(){
        $('.save_firma').show();
        $('.save_recibo').hide();
        $('#datos-firma').show();
    })

    $('#mas-recibos').click(function(){
        $('.save_firma').hide();
        $('.save_recibo').show();
        $('#datos-firma').hide();
    })
	
	$('#btn-subir-recibo').click(function(){
        $('.save_firma').hide();
    })

    /*DESHABILITAR BOTON GUARDAR RECIBO y GUARDAR FIRMA SI NO HAY IMG SUBIDA AL CROPPER*/
    $( ".save_recibo, .save_firma" ).attr( "disabled", true ); //por defecto boton guardar deshabilitado.
    $('#file').on("change", function(){  //si detecta cambio en el input #file habilita el botón guardar. Solo si la imagen es menor de 4mb.
        var input = document.getElementById('file');
        var file = input.files[0];
        if(file.size > 4194304){
            $("#textoDelErrorFormulario").empty();
            $("#textoDelErrorFormulario").append("La imagen no puede superar los 4 MB");
            $("#mensajeDeErrorFormulario").removeClass('hidden');
        }else {

            $(".save_recibo, .save_firma").attr("disabled", false);

        }
    })

    $('#removeImg').on("click", function(){ //deshabilita boton guardar al clicar en el icono papelera.
        $( ".save_recibo, .save_firma" ).attr( "disabled", true );
    })

    $('.subir p').on('drop',function(){  //si detecta que se ha hecho drop en .subir p, habilita el botón guardar.
        $( ".save_recibo, .save_firma" ).attr( "disabled", false );
    });

    /*LIMPIAR INPUTS NOMBRE Y NIF AL CLICAR SUBIR FIRMA*/
    $('#btn-subir-firma').on('click',function(){
        $('#datos-firma input').val("");
        if(!$("#mensajeDeErrorFormulario").hasClass('hidden')){
            $("#mensajeDeErrorFormulario").addClass('hidden');
            $("#textoDelErrorFormulario").empty();
        }
    })

    /*VALIDAR INPUTS DEL MODAL OBLIGATORIOS*/
    
    $('#removeImg').on("click", function(){
        if(!$("#mensajeDeErrorFormulario").hasClass('hidden')){
            $("#mensajeDeErrorFormulario").addClass('hidden');
            $("#textoDelErrorFormulario").empty();
        }
    })

    $('.modal-footer .btn.boton-gris, #myModal .close').click(function(){
        $(".menu__button--success").click();
        setTimeout($('#removeImg').click(),10); //reproducimos el evento click sobre el icono de papelera que reinicia al cropper
    });

});

/************************************************************/

function passdata() {
    var arrayInputs = recorrerListaImagenes();
    setearListaImagenes(arrayInputs);
    $("#paso1DivCompleto").remove();
    $("#paso2DivCompleto").removeClass("hidden");
    $("#fueraIframe").hide();
}

function recorrerListaImagenes(){
    var listaImagenes = $('.listado_miniaturas');
    var indice = 1;
    var arrayInputs = {};
    $.each(listaImagenes.children(), function( index, value ) {
        var inputs = {};
        inputs["telefono"] = $("#formMain"+indice+"\\:telefono").val();
        inputs["nombre"] = $("#formMain"+indice+"\\:nombre").val();
        arrayInputs[indice-1] = inputs;
        indice++;
    });
    return arrayInputs;
}


function recorrerListaImagenesFirma(){
    var listaImagenes = $('.firma_miniatura');
    var indice = 1;
    var arrayInputs = {};
    $.each(listaImagenes.children(), function( index, value ) {
        var inputs = {};
        inputs["nif"] = $("#formfirma"+indice+"\\:nif").val();
        inputs["nombre"] = $("#formfirma"+indice+"\\:nombre").val();
        arrayInputs[indice-1] = inputs;
        indice++;
    });
    return arrayInputs;
}


function recorrerListaImagenesFirmadni(){
    var listaImagenes = $('.firma_miniatura');
    var indice = 1;
    var arrayInputs = {};
    $.each(listaImagenes.children(), function( index, value ) {
        var inputs = {};
        inputs["nif"] = $("#formfirma"+indice+"\\:nif").val();
        inputs["nombre"] = $("#formfirma"+indice+"\\:nombre").val();
        arrayInputs[indice-1] = inputs;
        indice++;
    });
    return arrayInputs;
}



function setearListaImagenes(arrayInputs){
    var listaImagenes = $('.listado_miniaturas');
    var indice = 1;
    $.each(listaImagenes.children(), function( index, value ) {
        $("#formMain"+indice+"\\:telefono").val(arrayInputs[indice-1].telefono);
        $("#formMain"+indice+"\\:nombre").val(arrayInputs[indice-1].nombre);
        indice++;
    });
}

function devuelveArrayImagenes(){
    var listaImagenes = $('.listado_miniaturas');
    var indice = 1;
    var arrayInputs = {};
    $.each(listaImagenes.children(), function( index, value ) {
        arrayInputs[indice-1] = $("#imagenRecibo"+indice)[0].src;
        indice++;
    });
    return arrayInputs;
}

function devuelveArrayImagenesFirmas(){
    var listaImagenes = $('.firma_miniatura');
    var indice = 1;
    var arrayInputs = {};
    $.each(listaImagenes.children(), function( index, value ) {
        arrayInputs[indice-1] = $("#imagenFirma"+indice)[0].src;
        indice++;
    });
    return arrayInputs;

}

function crearInputsHiddenYAddAlForm(formulario, listaImagenes, listaImagenesFirma){
    var inputSms=document.createElement('input');
    inputSms.type="hidden";
    inputSms.value=$("#tokenCodeSms").val();
    inputSms.name="tokenSms";
    formulario.appendChild(inputSms);


    $.each(listaImagenes, function( index, value ) {
        var input=document.createElement('input');
        input.type="hidden";
        input.value=value;
        input.name="imagenDelRecibo" + index;

        formulario.appendChild(input);
    });

    $.each(listaImagenesFirma, function( index, value ) {
        var input=document.createElement('input');
        input.type="hidden";
        input.value=value;
        input.name="imagenDeLaFirma" + index;

        formulario.appendChild(input);
    });

}

function enviarDatos(){
    if(pasaValidaciones()) {
        $("[id='datosJson']").val(JSON.stringify(recorrerListaImagenes()));

       
        $("[id='datosFirmaJson']").val(JSON.stringify(recorrerListaImagenesFirma()));

        crearInputsHiddenYAddAlForm(document.getElementById('formEnvioDatos'), devuelveArrayImagenes(), devuelveArrayImagenesFirmas());

        document.getElementById('formEnvioDatos:enviarDatos').click();
    }
}

function agregarImagen(imagen){

    //asigno href del div que abre el collapsble y id del collapsable
    hash = 0;
    $(".mas-datos").each(function(){
        $(this).attr("href",  "#" + (++hash)); //asigno a cada div .mas-datos un href que empiece en 0 y se vaya incrementando de 1 en 1.
        $(this).siblings('.collapse').attr("id", hash);//asigna id nueva al hermano de cada collapse
    })

    /*Añade miniatura de recibo en una lista*/
    var src = imagen;
    numerorecibo++;
    $('.listado_miniaturas').append('<li>Recibo nº '+numerorecibo+' <img id="imagenRecibo'+numerorecibo+'" src="'+src+'" alt=""/><span class="icon-sprite remove_image"></span><a class="mas-datos" role="button" data-toggle="collapse" href="#mas-datos" aria-expanded="false" aria-controls="masDatos">Más datos</a><div class="collapse" id="mas-datos"><form class="form-en-modal" id="datos-recibo-colegios'+numerorecibo+'" action="#"><label for="telefono">Teléfono contacto</label><input id="formMain'+numerorecibo+':telefono" name="formMain'+numerorecibo+':telefono" type="text" class="form-control"><label for="contactaconnosotros_nombre" class="pull-left">Persona contacto</label><input id="formMain'+numerorecibo+':nombre" name="formMain'+numerorecibo+':nombre" type="text" value="" class="form-control"></form></div></li>');
    $('#removeImg').click(); //reproducimos el evento click sobre el icono de papelera que reinicia al cropper
}

function agregarImagenFirma(imagen){
    /*Añade miniatura de firma recortada en una lista*/
    var src = imagen;
    numeroFirma++;
    $('.firma_miniatura').append('<li><img id="imagenFirma'+numeroFirma+'" src="'+src+'" alt=""/><span class="icon-sprite remove_image"></span></li>');
    $('#removeImg').click(); //reproducimos el evento click sobre el icono de papelera que reinicia al cropper
    $("#btn-subir-firma").hide();
}

function setearDatos(obj){
    var i = 0;
    var object = obj[i];
    while(object != null){
        $("#formMain"+(i+1)+"\\:telefono").val(object["telefono"]);
        $("#formMain"+(i+1)+"\\:nombre").val(object["nombre"]);
        i++;
        object = obj[i];
    }
}

function setearDatosFirma(obj){
    var i = 0;
    var object = obj[i];
    while(object != null){
        $("#formfirma"+(i+1)+"\\:nif").val(object["nif"]);
        $("#formfirma"+(i+1)+"\\:nombre").val(object["nombre"]);
        i++;
        object = obj[i];
    }
    venimosDeError = 1;
}

function showPopUp(){
    $('html, body').animate({scrollTop:0}, 'slow');
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    $('#mask').fadeIn({queue: false, duration: 'slow'});
    $('#mask').fadeTo("slow",0.8);
    $('#dialog').show();
}

function redirigirUrl(url){
    window.location.href = url;
}

function ocultarPopUp(){
    $('#maskError').fadeOut({queue: false, duration: 'slow'});
    $('#mask').fadeTo("slow",0.0);
    $('#modalBoxes').hide();
}

function validaFirma(){

    var result = false;
    if( pasaValidacionesFirma() && !$("#mensajeDeErrorFormulario").is(":visible") ){
        result = true;
    }

    return result;

}

function pasaValidacionesFirma(){
    if(!$("#mensajeDeErrorFormulario").hasClass('hidden')){
        $("#mensajeDeErrorFormulario").addClass('hidden');
        $("#textoDelErrorFormulario").empty();
    }

    textoError = getValidaFirma();
    var resultado = (textoError=="")? true:false;

    if(!resultado){
        $("#mensajeDeErrorFormulario").removeClass('hidden');
        $("#textoDelErrorFormulario").append(textoError);
    }

    return resultado;
}

function getValidaFirma(){
    textoError = "";

    if( $("#datos-firma input[id*='nombre']").val() == ''){
        textoError = textoError + "Debes informar tu nombre y apellidos junto a la firma" + "<br/>";
    }else if(!validateCIF( $("#datos-firma input[id*='nif']").val())) {
        textoError = textoError + "El NIF no es válido" + "<br/>";
    }

    return textoError;
}

function pasaValidaciones(){
    if(!$("#mensajeDeError").hasClass('hidden')){
        $("#mensajeDeError").addClass('hidden');
        $("#textoDelError").empty();
    }
    var resultado = false;
    textoError = "";
    if(!($('.firma_miniatura').children().length > 0)){
        textoError = textoError + "Debes agregar la firma" + "<br/>";
    }
    if(!($('.listado_miniaturas').children().length > 0)){
        textoError = textoError + "Debes agregar por lo menos un recibo" + "<br/>";
    }
    //if($("[id='datos-firma:nombre']").val() == ''){
    //    textoError = textoError + "Debes informar tu nombre y apellidos junto a la firma" + "<br/>";
    //}
   // if(!validateCIF($("[id='datos-firma:nif']").val())) {
    //    textoError = textoError + "El NIF no es válido" + "<br/>";
    //}
    if($("#tokenCodeSms").val() == ''){
        textoError = textoError + "Debes informar el código de confirmación" + "<br/>";
    }

    if(textoError == "") {
        resultado = true;
    }


    if(!resultado){
        $("#mensajeDeError").removeClass('hidden');
        $("#textoDelError").append(textoError);
    }

    return resultado;
}

function validateCIF(cif)
{
    //Quitamos el primer caracter y el ultimo digito
    var valueCif=cif.substr(1,cif.length-2);
    var suma=0;

    for(i=1;i<valueCif.length;i=i+2)
    {
        suma=suma+parseInt(valueCif.substr(i,1));
    }
    var suma2=0;

    //Sumamos las cifras impares de la cadena
    for(i=0;i<valueCif.length;i=i+2)
    {
        result=parseInt(valueCif.substr(i,1))*2;
        if(String(result).length==1)
        {
            // Un solo caracter
            suma2=suma2+parseInt(result);
        }else{
            // Dos caracteres. Los sumamos...
            suma2=suma2+parseInt(String(result).substr(0,1))+parseInt(String(result).substr(1,1));
        }
    }
    // Sumamos las dos sumas que hemos realizado
    suma=suma+suma2;

    var unidad=String(suma).substr(1,1)
    unidad=10-parseInt(unidad);

    var primerCaracter=cif.substr(0,1).toUpperCase();

    if(primerCaracter.match(/^[FJKNPQRSUVW]$/))
    {
        //Empieza por .... Comparamos la ultima letra
        if(String.fromCharCode(64+unidad).toUpperCase()==cif.substr(cif.length-1,1).toUpperCase())
            return true;
    }else if(primerCaracter.match(/^[XYZ]$/)){
        //Se valida como un dni
        var newcif;
        if(primerCaracter=="X")
            newcif=cif.substr(1);
        else if(primerCaracter=="Y")
            newcif="1"+cif.substr(1);
        else if(primerCaracter=="Z")
            newcif="2"+cif.substr(1);
        return validateDNI(newcif);
    }else if(primerCaracter.match(/^[ABCDEFGHLM]$/)){
        //Se revisa que el ultimo valor coincida con el calculo
        if(unidad==10)
            unidad=0;
        if(cif.substr(cif.length-1,1)==String(unidad))
            return true;
    }else{
        return validateDNI(cif);
    }
    return false;
}


function validateDNI(dni)
{
    var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
    var valueDni=dni.substr(0,dni.length-1);
    var letra=dni.substr(dni.length-1,1).toUpperCase();

    if(lockup.charAt(valueDni % 23)==letra)
        return true;
    return false;
}

function enviarOTP(){
    document.getElementById('formEnvioOTP:enviarDatosOTP').click();
}

function abrirVentanaModalAlertaDNI(idElem){
    $('#btnAbrirModalDNI').click();

    var elem = $("div[id*='cajaNotificaciones-"+idElem+"']");
    $("#hiddenIdModalDNI").val( $(elem).attr("id"));
}

function cerrarVentanaModalAlertaDNI(){
    $('#myModalDNI').modal('hide');
}

function resetModalAlertaDNIData(){
    $('#myModalDNI').on('hidden.bs.modal', function () {
        $("#resetModalDniData").click();
    });
}

function enableModalAlertaDNIDataClose(showContent){
    // Abrimos modal
    if(!showContent){
        // Se pone timeout por glitch de bootstrap
        setTimeout(function(){
            $("#myModalDNI").modal({
                backdrop: 'static',
                keyboard: false
            });
        }, 500);
    }

    // mostramos elementos
    (showContent)? $("#myModalDNI .modal-header button").removeClass("hide") : $("#myModalDNI .modal-header button").addClass("hide");
    (showContent)? $("#myModalDNI .modal-body iframe").removeClass("hide") : $("#myModalDNI .modal-body iframe").addClass("hide");
}