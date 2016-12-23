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
var adDataState = {};
var maxSingleImageSize = 4;
var maxTotalImageSize = 10;
var maxRecibImageNumber = 3;
var maxFirmImageNumber = 1;
$(document).ready(function(){
    addPolyfills();

    if(venimosDeError == 0) {
        $('#nombre-nif').hide();
    }

    // Validations
    launchInputValidations();

    // Ocultamos la capa de error al inicio
    $("#mensajeDeError").hide();
    $('#dialog').hide();

    /* Funcionalidad de Continuar */
    $('#alta-domiciliacion .continuar').click(function(){
        if(pasaPreValidacionesRecibos(this)){
            $('.progreso-top').css("width","66%");
            $("#ErrorNumSubidas").hide();
            if($("#alta-domiciliacion #primeraPantalla").is(":visible")){
                passdata();
                enviarOTP();
            }else if($("#alta-domiciliacion #segundaPantalla").is(":visible")){
                console.log("2");
            }else if($("#alta-domiciliacion #terceraPantalla").is(":visible")){
                console.log("3");
            }

            beforeAndDelete($("#trdContent"), $('.caja_miniaturas'));
            $('#terceraPantalla, button.boton-cancelar, button.enviar, .caja_miniaturas.revisa').show();
            $('#primeraPantalla, #avisoDoble, button.continuar').hide();

            /*body con fondo gris si enviar está visible*/
            if($("button.enviar").is(":visible")){
                $('body').css("background","#f7f7f7");
            }
            pageNumberManager();
        }
    });

    $('#alta-domiciliacion .enviar').click(function(){
        if(pasaValidaciones($("#alta-domiciliacion .enviar"))){
            enviarDatos();
            $('.progreso-top').hide();
            $("#ErrorNumSubidasFirmas").hide();
        }
    });

    $("#papelera").click(function(event){
        if($(".cropper-crop-box").is(":visible")){
            event.preventDefault();
            event.stopPropagation();
        }else{
            $('#removeImg').click();
        }
    });

    $('#btn-subir-recibo').on("click", function (){
        if(validateAllFirmRecib(this) && validateRecibCount(this)){
            $("#segundaPantalla h1.titulo").text("Sube la foto de cada recibo");
            $('#primeraPantalla, #terceraPantalla, .avisos, #avisoDoble, button.enviar, button.continuar, .nombreFirmaLabel, .DNIFirmaLabel').hide();
            $('#segundaPantalla, #botoneraConPasos, button.boton-cancelar, button.save_recibo, .nombreReciboLabel').show();
            $('input#nombreRecibo').val(''); //limpio el input del nombre del recibo.
        }
    });
    $('#btn-subir-firma').on("click", function () {
        if(validateAllFirmRecib(this) && validateFirmCount(this)){
            $("#segundaPantalla h1.titulo").text("Sube la firma del titular de los recibos.");
            $('#segundaPantalla p.text-center strong').html("<span>Puede ser una foto de la firma escrita en papel, legible</span> y no un recorte del DNI");
            $('#primeraPantalla, .avisos, #avisoDoble, button.enviar, button.continuar, button.save_recibo, .nombreReciboLabel, #btn-subir-firma, #terceraPantalla').hide();
            $('#segundaPantalla, #botoneraConPasos, button.boton-cancelar, button.save_firma, .nombreFirmaLabel, .DNIFirmaLabel').show();
            $('input#nombreFirma, input#DNIFirma').val(''); //limpio los inputs del nombre y DNI de la firma.
            $('body').css("background","none");
            $('').hide();
        }
    });
    $('button.inicio').on('click', function () {

        $("#goDash a").click();
        /*
        $('.reciboIcon, #primeraPantalla, .avisos').show();
        $('#confirmacion, button.inicio').hide();
        $('#btn-subir-recibo').text('SUBIR RECIBO');

        resetOnInit();
        pageNumberManager();
        */
    });

    /*FUNCION AL CLICAR SUBIR RECIBO*/
    $('.save_recibo').click(function(){

        if(validateAllFirmRecib(this, $('.canvas .editor img:visible')) && validateImg($('.save_recibo'),$('.canvas .editor img:visible'))) {
            if ($("input[name='nombreRecibo']").val() == ''){
                $("input[name='nombreRecibo']").val("Recibo");
            }

            if ($('#aceptarCrop').is(':visible')) {
                $('#aceptarCrop').click();
            }

            setTimeout(doNextSaveRecibo, 10);
        }
    });


    /*FUNCION AL CLICAR SUBIR FIRMA*/
    $('.save_firma').click(function(){
        if(validateAllFirmRecib(this, $('.canvas .editor img:visible')) && pasaValidacionesFirma($('.save_firma'))) {

            if ($('#aceptarCrop').is(':visible')) {
                $('#aceptarCrop').click();
            }
            $('#terceraPantalla').show();
            $('body').css("background","#f7f7f7");
            setTimeout(doNextSaveFirma, 10);
        }
    });



    /*Funcion eliminar miniaturas recibos*/
    $(document).on('click', 'ul.listado_miniaturas i.fa-times', function() {
        // No elimina si es la ultima pantalla y hay solo 1 recibo
        if(!checkLastRecibLastStep()){
            // Si eliminamos una miniatura ocultamos el popup de error para evitar descuadres ya que la caja de error se posiciona de forma absoluta
            if($("#mensajeDeError").is(':visible')){
                $("#mensajeDeError").hide();
                $("#textoDelError").empty();
            }

            // Borramos el elemento
            $(this).parents(".col-md-5").remove();

            // Comrpobamos que este cuadrado el grid
            bubbleGriddy($(".listado_miniaturas").children(".row"),0);

            // Oculta la caja contenedora de las miniaturas si no tiene li
            if ($('ul.listado_miniaturas li').length == 0) {
                $('.caja_miniaturas').hide();
            }
        }
    });

    $(document).on('click', 'ul.listado_miniaturas_firmas i.fa-times', function() {
        // Si eliminamos una miniatura ocultamos el popup de error para evitar descuadres ya que la caja de error se posiciona de forma absoluta
        if($("#mensajeDeError").is(':visible')){
            $("#mensajeDeError").hide();
            $("#textoDelError").empty();
        }

        // Borramos el elemento
        $(this).parents(".col-md-5").remove();

        // Comrpobamos que este cuadrado el grid
        bubbleGriddy($(".listado_miniaturas_firmas").children(".row"),0);
    });


    /*DESHABILITAR BOTON GUARDAR RECIBO y GUARDAR FIRMA SI NO HAY IMG SUBIDA AL CROPPER*/
    $( ".save_recibo, .save_firma" ).attr( "disabled", true ); //por defecto boton guardar deshabilitado.
    $('#file').on("change", function(){  //si detecta cambio en el input #file habilita el botón guardar.
        $( ".save_recibo, .save_firma" ).attr( "disabled", false );
    })

    $('#removeImg').on("click", function(){ //deshabilita boton guardar al clicar en el icono papelera.
        $( ".save_recibo, .save_firma" ).attr( "disabled", true );
    })

    $('.subir p').on('drop',function(){  //si detecta que se ha hecho drop en .subir p, habilita el botón guardar.
        $( ".save_recibo, .save_firma" ).attr( "disabled", false );
    });

    $(".save_recibo, .save_firma").on("click", function(){
        $('.close').click();
    })



    /*BOTON CANCELAR REINICIA EL CROPPER*/
    $('#cancelar').on('click', function(){
        $('#cancelCrop').click();
        $('#removeImg').click();

        if ($("#btn-subir-firma").is(":visible")) {
            $(".progreso-top").css("width","33%");
        }

        if ($("button.save_firma").is(":visible")) {
            $("#terceraPantalla").show();
        }

        if($("#alta-domiciliacion #terceraPantalla").is(":visible")){
            if(!$("#nombreFirma").is(":visible")) {
                // Volver a pantalla de recibos
                beforeAndDelete($("#cancelar.boton-cancelar"), $("#botoneraConPasos"));
                $('#terceraPantalla, button.boton-cancelar, button.enviar, .caja_miniaturas.revisa').hide();
                $('#primeraPantalla, #avisoDoble, button.continuar').show();

                $('body').css("background","none");

                // Mostrar minis solo si hay
                if($('ul.listado_miniaturas li').length > 0) $('.caja_miniaturas').show();

                beforeAndDelete($("#botoneraConPasos"),$('.caja_miniaturas'));
                beforeAndDelete($("#terceraPantalla > div"), $("#revisaH1"));
            }else {
                // Cancela subir firma
                $('#btn-subir-firma, button.enviar').show();
                $('#segundaPantalla, .nombreFirmaLabel, button.save_firma, .DNIFirmaLabel').hide();
            }
        }
        else if($("#alta-domiciliacion #segundaPantalla").is(":visible")){
            if($(".caja_miniaturas").is(":visible")){
                // Subir recibos
                $('#segundaPantalla, .riesgo.top, button.boton-cancelar, .save_recibo').hide();
                $('.reciboIcon, #primeraPantalla, #avisoDoble, .riesgo.down, .caja_miniaturas, button.continuar').show();
                $('#btn-subir-recibo').text('SUBIR RECIBO');
            }else{
                // Subir primer recibo
                $('#segundaPantalla, .riesgo.top, button.boton-cancelar, .save_recibo').hide();
                $('.reciboIcon, #primeraPantalla, .avisos, .riesgo.down').show();
                $('#btn-subir-recibo').text('SUBIR RECIBO');
            }

        }

        pageNumberManager();
    });



    $(".showPopUpOperacionError").change(function(){
        console.log("change!!");
    });



    Vue.component('canvas-box', {
        template: '<div v-show="editable" class="canvas"><div @dblclick="dblclick" class="editor"><template v-if="url"><img src="{{ url }}" alt="{{ name }}" @load="load"/></template></div><div @click="click" v-show="cropper" class="toolbar"><button data-action="move" title="Move (M)" class="toolbar__button"><spanclass="fa fa-arrows"></span></button><button data-action="crop" title="Crop (C)" class="toolbar__button"><spanclass="fa fa-crop"></span></button><button data-action="zoom-in" title="Zoom In (I)" class="toolbar__button"><spanclass="fa fa-search-plus"></span></button><button data-action="zoom-out" title="Zoom Out (O)" class="toolbar__button"><spanclass="fa fa-search-minus"></span></button><button data-action="rotate-left" title="Rotate Left (L)" class="toolbar__button"><span class="fa fa-rotate-left"></span></button><button data-action="rotate-right" title="Rotate Right (R)" class="toolbar__button"><span class="fa fa-rotate-right"></span></button><button data-action="flip-horizontal" title="Flip Horizontal (H)"class="toolbar__button"><span class="fa fa-arrows-h"></span></button><button data-action="flip-vertical" title="Flip Vertical (V)"class="toolbar__button"><span class="fa fa-arrows-v"></span></button><button id="papelera" data-action="remove" title="Borrar" class="toolbar__button"><span class="fa fa-trash"></span></button></div></div>'
    });



});

/************************************************************/

function addPolyfills(){
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    Number.isInteger = Number.isInteger || function(value) {
            return typeof value === "number" &&
                isFinite(value) &&
                Math.floor(value) === value;
        };
}

/************************************************************/

function checkLastRecibLastStep(){
    var ret = false;
    if( $(".enviar").is(":visible") && ($('ul.listado_miniaturas li').length == 1) ){
        ret = true;
    }

    return ret;
}

function launchInputValidations(){
    //  Number
    $(".onlyNumberVal").keypress(function (e) {
        var k;
        document.all ? k = e.keyCode : k = e.which;
        if (!((k >= 48 && k <= 57) || k == 8 || k == 0)){
            return false;
        }
    });

    // No Numbers
    $(".noNumberVal").keypress(function (event) {
        document.all ? inputValue = event.keyCode : inputValue = event.which;

        // Se estructura así para debug
        if ( inputValue == 32 || inputValue == 39 || inputValue == 8 || inputValue == 0 ) {
        }else if ( (/[a-zA-ZñÑáéíóúÁÉÍÓÚ ]/).test(String.fromCharCode(inputValue)) ){
        }else{
            event.preventDefault();
        }



    });

    flyValidations();
}

function doNextSaveFirma(){
    var src = $('.canvas .editor img:visible').attr('src');
    $('#segundaPantalla').hide();
    afterAndDelete($('.reciboIcon'), $('#terceraPantalla h1'));//el titular de la tercera pantalla se situa después del icono del recibo
    afterAndDelete($('#btn-subir-firma'), $('.caja_miniaturas_firmas'));//la lista de firmas se situa después del boton de subir firma
    afterAndDelete($('.solicitud'), $("#botoneraConPasos")); //la botonera con los pasos 1/3 se situa después de la lista de firmas
    $('.caja_miniaturas_firmas').show();//muestro la lista de miniaturas
    $('#removeImg').click();//recoge evento de reiniciar cropper


    /*Añade miniatura de firma en una lista*/
    var nombre_firma = $('input#nombreFirma').val();
    var dni_firma = $('input#DNIFirma').val();
    var varBaseContainer = $('.listado_miniaturas_firmas');
    var varStringToAppend = '<div class="col-md-5"><li class="col-md-12"><div class="col-md-5"><img id="imagenFirma" src="' + src + '" alt=""/></div><div style="float: left;" class="col-md-6"><div class="iconosFirma"><label id="iconoGuardar" class="fa fa-lg fa-check-circle fa-2x fa-domic-fedit hidden" onclick="ocultarEditarFirma(this);"/><label id="iconoEditar"  class="fa fa-lg fa-edit fa-domic-fedit" onclick="mostrarEditarFirma(this);" /><i class="fa fa-times chkErr" aria-hidden="true" onclick="cerrarEditarFirma(this)"></i></div><div class="datosFirma">' +
        '<div id="inputNombreMini" class="nombreMini hidden"><input type="text" class="noNumberVal" id="modifNombre" style="color:black;"/></div><div id="nombre" class="edit">' + nombre_firma + '</div>' +
        '<div id="inputDni" class="nombreMini hidden"><input type="text" id="modifDni" style="color:black;"/></div><div id="dni" class="edit">' + dni_firma + '</div></div></div></li></div>';

    var varStringToMakeRow = "<div class='row'></div>";

    makeMeGriddy(varBaseContainer,varStringToAppend,varStringToMakeRow);

    $('input#nombreFirma, input#DNIFirma').val('');//limpia campos de nombre y DNI

    $(".save_firma").hide(); // Ocultamos el boton de salvar firma para no crear discordancias

    $('#botoneraConPasos, #btn-subir-firma, button.enviar').show();

    launchInputValidations();
}

function getNoReciboAcc(){

    var recbisNo = $("ul.listado_miniaturas").find("li").length;
    if(recbisNo == 0){
        numerorecibo = 1;
    }else{
        ++numerorecibo;
    }
    return numerorecibo;

}

function doNextSaveRecibo(){
    var src = $('.canvas .editor img:visible').attr('src');
    $('#primeraPantalla').show();//mostrar primera pantalla al guardar miniatura de recibo
    $('#btn-subir-recibo').text('SUBIR OTRO RECIBO');
    $('#avisoDoble, #botoneraConPasos, button.continuar').show();
    afterAndDelete($('.caja_miniaturas'), $("#botoneraConPasos"));
    $('#segundaPantalla, .riesgo.top, button.boton-cancelar, .save_recibo').hide();
    $('.caja_miniaturas').show();//muestro la lista de miniaturas
    $('#removeImg').click();

    /*Añade miniatura de recibo en una lista*/
    var nombre_recibo = $('input#nombreRecibo').val();
    var varBaseContainer = $("ul.listado_miniaturas");

    var noRecibo = getNoReciboAcc();
    var contadorNombreRecibos = (nombre_recibo!='Recibo')? "" : noRecibo;

    var varStringToAppend = '<div class="col-md-5"><li><img id="imagenRecibo" src="'+src+'" alt=""/><label id="iconoGuardarNombre" class="fa fa-lg fa-check-circle fa-2x fa-domic-confirm hidden" onclick="ocultarEditar(this);"/><label id="iconoEditarNombre"  class="fa fa-lg fa-edit fa-domic-edit" onclick="mostrarEditar(this);" /><i class="fa fa-times" aria-hidden="true"></i><span id="inputNombreMini" class="nombreMini hidden"><input type="text" id="modifNombre" style="color:black;"/></span><span id="nombreRecibo" class="nombreMini">'+nombre_recibo+contadorNombreRecibos+'</span><a class="mas-datos" role="button" data-toggle="collapse" href="#mas-datos'+noRecibo+'" aria-expanded="false" aria-controls="masDatos'+noRecibo+'" onclick="saveAdDataState(event, this)">AÑADIR DATOS ADICIONALES</a><div class="collapse" id="mas-datos'+noRecibo+'"><form id="datos-adicionales" action="#"><label for="contactaconnosotros_nombre"><input id="formMain:nombre" name="formMain:nombre" type="text" value="" class="form-control noNumberVal" placeholder="Persona de contacto" maxlength="20"></label><label for="telefono"><input id="formMain:telefono" name="formMain:telefono" type="text" class="form-control onlyNumberVal" placeholder="Teléfono de contacto" maxlength="9"></label><label for="telefono"><input id="formMain:telefonoAbonado" name="formMain:telefono" type="text" class="form-control onlyNumberVal" placeholder="Teléfono del abonado" maxlength="9"></label><button class="btn boton-transparente" id="cerrar'+noRecibo+'" role="button" data-toggle="collapse" href="#mas-datos'+noRecibo+'" aria-expanded="false" aria-controls="masDatos'+noRecibo+'">CERRAR</button><button class="btn boton-blanco" id="guardar'+noRecibo+'" role="button" data-toggle="collapse" href="#mas-datos'+noRecibo+'" aria-expanded="false" aria-controls="masDatos'+noRecibo+'">GUARDAR</button></form></div></li></div>';

    var varStringToMakeRow = "<div class='row'></div>";

    $("#nombreRecibo :input").each(function(){
        var input = $(this);
        $('#nombreRecibo').show();
        $('ul.listado_miniaturas li').append($(this).val() + "<br>");
    })
    makeMeGriddy(varBaseContainer,varStringToAppend,varStringToMakeRow);

    var idSelector = "mas-datos"+noRecibo;
    var idCancelar = "cerrar"+noRecibo;
    var idGuardar = "guardar"+noRecibo;

    $("div[id='"+idSelector+"']").find("button[id='"+idCancelar+"']").click(function(){
        console.log("click cerrar");
        onAdDataClose(this);
    });

    $("div[id='"+idSelector+"']").find("button[id='"+idGuardar+"']").click(function(){
        console.log("click guardar");
        onAdDataSave(this);
    });

    launchInputValidations();

}

/*FUNCION AÑADIR ROW CADA 2 ELEMENTOS EN LA LISTA DE MINIATURAS*/
function makeMeGriddy(baseContainer, stringToAppend, stringToMakeRow) {
    var appender;
    var rowNumber = $(baseContainer).find(".row").length;
    if (rowNumber > 0) {
        var control = false;
        var index = 0;
        while (!control && (index < rowNumber)) {
            var item = $(baseContainer).find(".row")[index];
            if ($(item).find(".col-md-5").length < 2) {
                control = true;
                appender = item;
            }
            ++index;
        }

        if (!control) {
            appender = $(stringToMakeRow);
            $(baseContainer).append(appender);
        }
    } else {
        appender = $(stringToMakeRow);
        $(baseContainer).append(appender);
    }
    $(appender).append(stringToAppend);
}

/**
 * Funcion para hacer bubble sobre la lista de miniaturas
 * @param bubbleList lista de rows
 * @param bubbleIndex indice de iteracion
 */
function bubbleGriddy(bubbleList, bubbleIndex){
    var elemsPerRow = 2;
    var selectorRowChildren = ".col-md-5";

    // CB Si es la ultima row o control del index
    if( (bubbleIndex >= (bubbleList.length-1)) ){
        // Do Nothing
        // CB Si la row tiene n elementos ( 2 elementos ) hijos directos
    }else if( $(bubbleList[bubbleIndex]).children(selectorRowChildren).length == elemsPerRow ){
        // Do Nothing
        // CI En otro caso hay que mover
    }else{
        doGriddyMove(bubbleList[bubbleIndex], bubbleList[bubbleIndex+1]);
        bubbleGriddy(bubbleList, ++bubbleIndex);
    }

}

/**
 * Funcion para hacer el movimiento de burbuja dentro de la lista de miniaturas
 * @param rowSorce fila a la que le falta un elemento
 * @param nextRow fila siguiente a la que se debe de robar un elemento
 */
function doGriddyMove(rowSorce, nextRow){
    var selectorRowChildren = ".col-md-5";
    // Si la row de donde tenemos que coger elementos tiene
    if($(nextRow).children(selectorRowChildren).length > 0 ){
        afterAndDelete($(rowSorce).children(selectorRowChildren)[0], $(nextRow).children(selectorRowChildren)[0]);
    }
}

function passdata() {
    var arrayInputs = recorrerListaImagenes();
    setearListaImagenes(arrayInputs);
}

function recorrerListaImagenes(){
    var listaImagenes = $('.listado_miniaturas');
    var indice = 1;
    var arrayInputs = {};

    $.each($('.listado_miniaturas').find("li"), function( index, value ) {
        var inputs = {};
        inputs["alias"] = $(this).find("[id='nombreRecibo']").text();
        inputs["telefono"] = $(this).find("input[id$='telefono']").val();
        inputs["telefonoAbonado"] = $(this).find("input[id$='telefonoAbonado']").val();
        inputs["nombre"] = $(this).find("input[id$='nombre']").val();
        arrayInputs[indice-1] = inputs;
        indice++;
    });
    return arrayInputs;
}

function recorrerListaFirmas(){
    var indice = 1;
    var arrayInputs = {};

    $.each($('.listado_miniaturas_firmas').find("li"), function( index, value ) {
        var inputs = {};
        inputs["nombreYapp"] = $(this).find("div[id='nombre']").text();
        inputs["nif"] = $(this).find("div[id='dni']").text();
        arrayInputs[indice-1] = inputs;
        indice++;
    });
    return arrayInputs;
}

function setearListaImagenes(arrayInputs){
    var listaImagenes = $('.listado_miniaturas');
    var indice = 1;
    $.each(listaImagenes.find("li"), function( index, value ) {
        $(this).find("[id$='nombreRecibo']").text(arrayInputs[indice-1].alias);
        $(this).find("input[id$='telefono']").val(arrayInputs[indice-1].telefono);
        $(this).find("input[id$='telefonoAbonado']").val(arrayInputs[indice-1].telefonoAbonado);
        $(this).find("input[id$='nombre']").val(arrayInputs[indice-1].nombre);
        indice++;
    });
}

function devuelveArrayImagenes(){
    var listaImagenes = $('.listado_miniaturas');
    var indice = 1;
    var arrayInputs = {};
    $.each(listaImagenes.find("li"), function( index, value ) {
        arrayInputs[indice-1] = $(this).find("img[id='imagenRecibo']").attr("src");
        indice++;
    });
    return arrayInputs;
}

function devuelveArrayImagenesFirmas(){
    var listaImagenes = $('.listado_miniaturas_firmas');
    var indice = 1;
    var arrayInputs = {};
    $.each($('.listado_miniaturas_firmas').find("li"), function( index, value ) {
        arrayInputs[indice-1] = $(this).find("img[id='imagenFirma']").attr("src");
        indice++;
    });
    return arrayInputs;

}

function crearInputsHiddenYAddAlForm(formulario, listaImagenes, listaImagenesFirma, callback){
    var inputSms=document.createElement('input');
    inputSms.type="hidden";
    inputSms.value=$("#tokenCodeSms").val();
    inputSms.name="tokenSms";
    var inputSelector = "input[name='tokenSms']";
    if($(inputSelector).length > 0) $(inputSelector).remove();
    formulario.appendChild(inputSms);


    $.each(listaImagenes, function( index, value ) {
        var input=document.createElement('input');
        input.type="hidden";
        input.value=value;
        input.name="imagenDelRecibo" + index;

        var inputSelector = "input[name='"+input.name+"']";
        if($(inputSelector).length > 0) $(inputSelector).remove();
        formulario.appendChild(input);
    });

    $.each(listaImagenesFirma, function( index, value ) {
        var input=document.createElement('input');
        input.type="hidden";
        input.value=value;
        input.name="imagenDeLaFirma" + index;

        var inputSelector = "input[name='"+input.name+"']";
        if($(inputSelector).length > 0) $(inputSelector).remove();
        formulario.appendChild(input);
    });

    callback();
}

function enviarDatos(){
    $("button.enviar").attr("disabled", true);

    $("[id='datosJson']").val(JSON.stringify(recorrerListaImagenes()));
    $("[id='datosFirmaJson']").val(JSON.stringify(recorrerListaFirmas()));

    crearInputsHiddenYAddAlForm(document.getElementById('formEnvioDatos'), devuelveArrayImagenes(), devuelveArrayImagenesFirmas(), function(){
        $("button[id$='enviarDatos']").click();
        //document.getElementById('formEnvioDatos:enviarDatos').click();
    });

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
    $('#mask').fadeOut({queue: false, duration: 'slow'});
    $('#mask').fadeTo("slow",0.0);
    $('#mask').hide();
    $('#dialog').hide();
}

function pasaValidaciones(elem){
    if($("#mensajeDeError").is(':visible')){
        $("#mensajeDeError").hide();
        $("#textoDelError").empty();
    }
    var resultado = false;
    textoError = "";
    /*if(!($('.listado_miniaturas_firmas').find("li").length > 0)){
     textoError = textoError + "Debes agregar la firma" + "<br/>";
     }*/
    if(!($('.listado_miniaturas').find("li").length > 0)){
        textoError = textoError + "Debes agregar por lo menos un recibo" + "<br/>";
    }

    /*if($("#tokenCodeSms").val() == ''){
        textoError = textoError + "Debes informar el código de confirmación" + "<br/>";
    }*/

    if(textoError == "") {
        resultado = true;
    }


    if(!resultado){
        showErrorUnderElement(elem);
        $("#textoDelError").append(textoError);
    }

    return resultado;
}

function pasaPreValidacionesRecibos(elem){
    if($("#mensajeDeError").is(':visible')){
        $("#mensajeDeError").hide();
        $("#textoDelError").empty();
    }
    var resultado = false;
    textoError = "";

    if(!($('.listado_miniaturas').find("li").length > 0)){
        textoError = textoError + "Debes agregar por lo menos un recibo" + "<br/>";
    }

    if(textoError == "") {
        resultado = true;
    }

    if(!resultado){
        showErrorUnderElement(elem);
        $("#textoDelError").append(textoError);
    }

    return resultado;
}

function pasaValidacionesFirma(elem) {

    if($("#mensajeDeError").is(':visible')){
        $("#mensajeDeError").hide();
        $("#textoDelError").empty();
    }
    var resultado = false;
    textoError = "";
    if($("[id='nombreFirma']").val() == ''){
        textoError = textoError + "Debes informar tu nombre y apellidos junto a la firma" + "<br/>";
    }

    if(!validateCIF($("[id='DNIFirma']").val())) {
        textoError = textoError + "El NIF no es válido" + "<br/>";
    }

    if(textoError == "") {
        resultado = true;
    }


    if(!resultado){
        showErrorUnderElement(elem);
        $("#textoDelError").append(textoError);
    }

    return resultado;
}

function pasaValidacionesEditFirma(elem) {

    if($("#mensajeDeError").is(':visible')){
        $("#mensajeDeError").hide();
        $("#textoDelError").empty();
    }
    var resultado = false;
    var item = $($(elem).parents("li")[0]);
    textoError = "";
    if($(item).find("[id='modifNombre']").val() == ''){
        textoError = textoError + "Debes informar tu nombre y apellidos junto a la firma" + "<br/>";
    }

    if(!validateCIF($(item).find("[id='modifDni']").val())) {
        textoError = textoError + "El NIF no es válido" + "<br/>";
    }

    if(textoError == "") {
        resultado = true;
    }


    if(!resultado){
        showErrorUnderElement(elem);
        $("#textoDelError").append(textoError);
        var offset = $(elem).offset().left;
        $("#mensajeDeError").css({left: offset+13});
    }

    return resultado;
}

function flyValidations(){
    $(".btn, .chkErr").click(function(){

        // Si es el mismo
        if(!($(this).hasClass("enviar") || $(this).hasClass("save_firma") || $(this).hasClass("save_recibo") || $(this).hasClass("continuar") || ($(this).attr("id")=="btn-subir-recibo") || ($(this).attr("id")=="btn-subir-firma") )){

            if($("#mensajeDeError").is(":visible")){
                $("#mensajeDeError").hide();
                $("#textoDelError").empty();
            }
        }

        // Si está en otro botón eliminamos el error
        if($('#mensajeDeError').data("data-source") !=  $(this).attr("id")){
            if($("#mensajeDeError").is(":visible")){
                $("#mensajeDeError").hide();
                $("#textoDelError").empty();
            }
        }

    });
}

function showErrorUnderElement(elem){

    $("#mensajeDeError table").css({width: '200px'});
    $('#mensajeDeError').data("data-source", $(elem).attr("id"));
    $('#mensajeDeError').css({
        position: 'absolute',
        top: $(elem).offset().top + $(elem).outerHeight() + 10,
        left: $(elem).offset().left + ($(elem).width()*0.4)
    }).show();

}
/*FUNCION PINTA MENSAJE ERROR SUPERADO NUM. ELEMENTOS SUBIDOS*/
function ErrorBajoElemento(elem){
    $('#ErrorNumSubidas').data("data-source", $(elem).attr("id"));
    $('#ErrorNumSubidas').css({
        position: 'absolute',
        top: $(elem).offset().top + $(elem).outerHeight() + 10,
        left: $(elem).offset().right + ($(elem).width()/2)
    }).show();
}

function ErrorBajoElementoFirma(elem){
    $('#ErrorNumSubidasFirmas').data("data-source", $(elem).attr("id"));
    $('#ErrorNumSubidasFirmas').css({
        position: 'absolute',
        top: $(elem).offset().top + $(elem).outerHeight() + 10,
        left: $(elem).offset().right + ($(elem).width()/2)
    }).show();
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
    $("#formEnvioOTP button[id*='enviarDatosOTP']").click();
}

function onEventSendDataErr(){
    $("#dialog .textoPopUpAmazonAnular").text("No ha sido posible completar la operación. Pruebe otra vez pasados unos momentos.");
    showPopUp();

    // Volvemos a habilitar el botón
    $("button.enviar").attr("disabled", false);
}

function onEventSendData(){


    if($("input[id$='showTokenError']").val() == "true") {
        // No se hace nada
    }else if($("input[id$='showPopUpOperacionError']").val() == "true"){
        $("#dialog .textoPopUpAmazonAnular").text($("span[id$='mensajeErrorVal']").text());
        showPopUp();
    }else{
        $('#segundaPantalla, #terceraPantalla, button.save_firma, button.boton-cancelar, button.enviar, .caja_miniaturas_firmas, img.reciboIcon, #revisaH1').hide();
        $('#confirmacion').show();
        $('a.inicio').css("display","inline-block");
        afterAndDelete($("#confirmacion"),$("#botoneraConPasos"));

        $("#resetEnviarDatos").click();
        pageNumberManager();
    }

    // Volvemos a habilitar el botón
    $("button.enviar").attr("disabled", false);
}

function saveAdDataState(event, elem){

    if(!$(elem).hasClass("noAction")) {
        var obj = {};
        var item = $(elem).next("div.collapse");
        obj["id"] = $(item).attr("id");
        obj["name"] = $(item).find("input[id='formMain:nombre']").val();
        obj["tlf"] = $(item).find("input[id='formMain:telefono']").val();
        obj["tlfA"] = $(item).find("input[id='formMain:telefonoAbonado']").val();
        adDataState[Object.keys(adDataState).length] = obj;

        $(elem).addClass("noAction");
    }else{
        event.preventDefault();
        event.stopPropagation();
    }
}

/* Init Funciones de tratamiento de datos adicionales de miniaturas de recibos  */
function onAdDataClose(elem){
    var id = $($(elem).parents("div.collapse")[0]).attr("id");
    var item;
    var itemKey;
    for (var key in adDataState) {
        if (adDataState.hasOwnProperty(key)) {
            if(adDataState[key].id == id){
                item = adDataState[key];
                itemKey = key;
            }
        }
    }

    if(typeof item != "undefined"){
        $(elem).parent().find("input[id='formMain:nombre']").val(item["name"]);
        $(elem).parent().find("input[id='formMain:telefono']").val(item["tlf"]);
        $(elem).parent().find("input[id='formMain:telefonoAbonado']").val(item["tlfA"]);
        delete adDataState[itemKey];
    }

    if($($($(elem).parents("li")[0]).find("a.mas-datos")).hasClass("noAction")) $($($(elem).parents("li")[0]).find("a.mas-datos")).removeClass("noAction");
}

function onAdDataSave(elem){
    if($($($(elem).parents("li")[0]).find("a.mas-datos")).hasClass("noAction")) $($($(elem).parents("li")[0]).find("a.mas-datos")).removeClass("noAction");
}

/* End Funciones de tratamiento de datos adicionales de miniaturas de recibos  */

/* Funciones de edicion inline */

function mostrarEditar(elem){
    var value = $($(elem).parents("li")[0]).find("[id$='nombreRecibo']").text();
    $($(elem).parents("li")[0]).find("[id$='modifNombre']").val(value);

    $($(elem).parents("li")[0]).find("[id$='inputNombreMini']").removeClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='nombreRecibo']").addClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='iconoGuardarNombre']").removeClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='iconoEditarNombre']").addClass('hidden');
}
function ocultarEditar(elem){
    var value = $($(elem).parents("li")[0]).find("[id$='modifNombre']").val();
    if(value != "") $($(elem).parents("li")[0]).find("[id$='nombreRecibo']").text(value);

    $($(elem).parents("li")[0]).find("[id$='inputNombreMini']").addClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='nombreRecibo']").removeClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='iconoGuardarNombre']").addClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='iconoEditarNombre']").removeClass('hidden');
}

function mostrarEditarFirma(elem){
    var value = $($(elem).parents("li")[0]).find("[id$='nombre']").text();
    $($(elem).parents("li")[0]).find("[id$='modifNombre']").val(value);

    var valueDni = $($(elem).parents("li")[0]).find("[id$='dni']").text();
    $($(elem).parents("li")[0]).find("[id$='modifDni']").val(valueDni);

    $($(elem).parents("li")[0]).find("[id$='inputNombreMini']").removeClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='inputDni']").removeClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='nombre']").addClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='dni']").addClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='iconoGuardar']").removeClass('hidden');
    $($(elem).parents("li")[0]).find("[id$='iconoEditar']").addClass('hidden');

    $("#btn-subir-firma").attr("disabled", true);
    $(".enviar").attr("disabled", true);
}
function ocultarEditarFirma(elem){

    if(pasaValidacionesEditFirma(elem)){
        var value = $($(elem).parents("li")[0]).find("[id$='modifNombre']").val();
        if(value != "") $($(elem).parents("li")[0]).find("[id$='nombre']").text(value);

        var valueDni = $($(elem).parents("li")[0]).find("[id$='modifDni']").val();
        if(valueDni != "") $($(elem).parents("li")[0]).find("[id$='dni']").text(valueDni);

        $($(elem).parents("li")[0]).find("[id$='inputNombreMini']").addClass('hidden');
        $($(elem).parents("li")[0]).find("[id$='inputDni']").addClass('hidden');
        $($(elem).parents("li")[0]).find("[id$='nombre']").removeClass('hidden');
        $($(elem).parents("li")[0]).find("[id$='dni']").removeClass('hidden');
        $($(elem).parents("li")[0]).find("[id$='iconoGuardar']").addClass('hidden');
        $($(elem).parents("li")[0]).find("[id$='iconoEditar']").removeClass('hidden');

        if($(".listado_miniaturas_firmas").find(".fa-check-circle:visible").length == 0){
            $("#btn-subir-firma").attr("disabled", false);
            $(".enviar").attr("disabled", false);
        }
    }

}

function cerrarEditarFirma(elem){
    $("#btn-subir-firma").attr("disabled", false);
    $(".enviar").attr("disabled", false);
}

/* End Funciones de edicion inline */

/* Funciones de validacion de imagenes */

function validateImg(elem ,imgElem){
    var resultado = "";
    if($("#mensajeDeError").is(':visible')){
        $("#mensajeDeError").hide();
        $("#textoDelError").empty();
    }

    if(!validateImgSize(imgElem)){
        resultado = "La imagen excede el tamaño máximo: 4Mb <br/>";
    }

    if(!validateImgFormat(imgElem)){
        resultado = resultado + "La imagen no tiene un formato válido <br/>";
    }

    if(resultado != "") {
        showErrorUnderElement(elem);
        $("#textoDelError").append(resultado);
        return false;
    }else{
        return true;
    }
}

function validateImgSize(elem){
    var imgSize = getImgSize(elem);
    if(imgSize != -1){
        return (imgSize > maxSingleImageSize)? false : true;
    }else{
        return false;
    }
}

function validateRecibCount(elem){
    $("#ErrorNumSubidas").html("");
    if($(".caja_miniaturas .listado_miniaturas li img").length < maxRecibImageNumber){
         
        return true;
    }else{
        if(typeof elem != "undefined") {
            if($("#mensajeDeError").is(':visible')){
                $("#mensajeDeError").hide();
                $("#textoDelError").empty();
            }

            ErrorBajoElemento(elem);
            $("#ErrorNumSubidas").append('<div class="col-md-12 col-md-offset-2"><img id="mostrar1" type="image" style="height: 35px; width: 34px;" src="/res/coinc/images/iconos/ico_info.png">' + "No se puede subir más recibos en esta solicitud por exceder el tamaño máximo de imágenes permitido. Puedes enviar esta solicitud así y realizar otra nueva" + '</div>');
        }
        return false;
    }
}

function validateFirmCount(elem){
    $("#ErrorNumSubidasFirmas").html("");
    if($(".caja_miniaturas_firmas .listado_miniaturas_firmas li img").length < maxFirmImageNumber){
        return true;
    }else{
        if(typeof elem != "undefined") {
            if($("#mensajeDeError").is(':visible')){
                $("#mensajeDeError").hide();
                $("#textoDelError").empty();
            }

            ErrorBajoElementoFirma(elem);
            
            $("#ErrorNumSubidasFirmas").append('<div class="col-md-12 col-md-offset-2"><img id="mostrar1" type="image" style="height: 35px; width: 34px;" src="/res/coinc/images/iconos/ico_info.png">' + "Solo se puede subir una firma de titular distinto de la cuenta por solicitud. Puedes enviar esta solicitud así e incluirlo en otra nueva." + '</div>');
        }
        return false;
    }
}

function validateAllFirmRecib(elem, img){

    var imgs = $.merge($(".caja_miniaturas .listado_miniaturas li img"), $(".caja_miniaturas_firmas .listado_miniaturas_firmas li img"));

    // Si se pasa una imagen la agregamos
    if(typeof img != "undefined") imgs = $.merge(imgs, img);

    if(validateAllImgSize(imgs)){
        return true;
    }else{
        if(typeof elem != "undefined") {
            if($("#mensajeDeError").is(':visible')){
                $("#mensajeDeError").hide();
                $("#textoDelError").empty();
            }

            showErrorUnderElement(elem);
            $("#textoDelError").append("Se ha alcanzado el tamaño máximo de subida de ficheros.");
        }
        return false;
    }
}

// Parametros de entrada
// Lista de img
function validateAllImgSize(imgList){

    if(getAllImgSize(imgList) < maxTotalImageSize){
        return true;
    }else{
        return false;
    }

}

// Parametros de entrada
// Lista de img
function getAllImgSize(imgList, index){
    if(typeof index == "undefined"){
        return getAllImgSize(imgList, 0);
    }else{
        if(index < imgList.length){
            return getImgSize(imgList[index]) + getAllImgSize(imgList, ++index);
        }else{
            return 0;
        }
    }
}

function getImgSize(elem){
    var head = 'data:image/'+getImgFormat(elem)+';base64,';
    var src = $(elem).attr("src");
    var imgFileSize = Math.round((src.length - head.length)*3/4) ;

    return (Number.isInteger(imgFileSize))? imgFileSize/1024/1024 : -1;
}

function getImgFormat(elem){
    var ret = "";
    var src = $(elem).attr("src");

    // jpg
    if(src.includes("data:image/jpg")){
        // jpg
        ret = "jpg";

    }else if(src.includes("data:image/jpeg")){
        // jpeg
        ret = "jpeg";

    }else if(src.includes("data:image/tiff")){
        // tiff
        ret = "tiff";

    }else if(src.includes("data:image/png")){
        // png
        ret = "png";

    }else if(src.includes("data:image/bmp")){
        // bmp
        ret = "bmp";

    }else if(src.includes("data:image/gif")){
        // gif
        ret = "gif";

    }

    return ret;
}

function validateImgFormat(elem){

    return ((getImgFormat(elem)!="")? true : false);
}

/* End Funciones de validacion de imagenes */

/* Funciones de navegacion */

function afterAndDelete(target, source){

    var src = $(source).detach();
    $(target).after(src);

}

function beforeAndDelete(target, source){

    var src = $(source).detach();
    $(target).before(src);

}

function resetOnInit(){
    // Reset de titulos
    beforeAndDelete($("#terceraPantalla .container"), $("#revisaH1"));
    $("#revisaH1").show();

    // Reset de inputs subir firma
    $(".nombreFirmaLabel").hide();
    $(".DNIFirmaLabel").hide();

    // Reset de input de sms
    $("input[id*='tokenCodeSms']").val("");

    // miniaturas
    beforeAndDelete($("#confirmacion"), $(".caja_miniaturas"));
    $(".caja_miniaturas").hide();

    // Borramos las imagenes
    $('.listado_miniaturas, .listado_miniaturas_firmas').children("div").remove();
}

function pageNumberManager(){

    setTimeout(function(){
        if($("button.enviar").is(":visible")){
            $("#1de3").hide();
            $("#2de3").show();
            $("#3de3").hide();
        }else if($("a.inicio").is(":visible")){
            $("#1de3").hide();
            $("#2de3").hide();
            $("#3de3").show();
        }else{
            $("#1de3").show();
            $("#2de3").hide();
            $("#3de3").hide();
        }
    }, 300);

}

/* End Funciones de navegacion */

