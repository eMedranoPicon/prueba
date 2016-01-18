$(document).ready(function () {
"use strict";
    
    //Permito máscaras en inputs con data-inputmask="..."
    $(":input").inputmask();

    // Sliders
    $(".slider-money, .slider-month").slider();

    $(".slider-money").on("slide", function(slideEvt) {
      $(".value-money").val(slideEvt.value);
    });
    $(".slider-money").on("slideStop", function(slideEvt) {
      $('.alert-money').hide();
    });

    $(".slider-month").on("slide", function(slideEvt) {
      $(".value-month").val(slideEvt.value);
    });
    $(".slider-month").on("slideStop", function(slideEvt) {
      $('.alert-month').hide();
    });
    
    $('.value-money').on("blur", function(){
      var minValue = $('.slider-money').data('slider-min');
      var maxValue = $('.slider-money').data('slider-max');
      var currentValue = (this.value).replace(/[.]/g, '');
      if(currentValue >= minValue && currentValue <= maxValue) {
        $('.alert-money').hide();
        $('.slider-money').slider('setValue', currentValue, true);
        $('.slider-money').slider('refresh');
      } else {
        $('.alert-money').show();
      }
    });

    $('.value-month').on("blur", function(){
      var minValue = $('.slider-month').data('slider-min');
      var maxValue = $('.slider-month').data('slider-max');
      var currentValue = this.value;
      if(currentValue >= minValue && currentValue <= maxValue) {
        $('.alert-month').hide();
        $('.slider-month').slider('setValue', currentValue, true);
        $('.slider-month').slider('refresh');
      } else {
        $('.alert-month').show();
      }
    });
    

    //Editar el nombre del prestamo en la vista detalle
    $('.edit-prestamo').on('click', function() {
      //Elementos del DOM 
      var $text = $(this).siblings('.info').find('p.name');
      var $input = $(this).siblings('.info').find('input');
      var $icon = $(this).find('i');

      //Asignamos el valor a los elementos del DOM
      if($text.is(':visible')) {
        $input.val($text.text());
        $icon.addClass('fa-check-circle fa-2x').removeClass('fa-edit');
        $(this).siblings('.info').removeClass('mgt-5');
      } else {
        $text.text($input.val());
        $icon.addClass('fa-edit').removeClass('fa-check-circle fa-2x');
        $(this).siblings('.info').addClass('mgt-5');
      }

      //Ocultamos o mostramos los elementos del DOM
      $text.toggle();
      $input.toggle();
    });


    //Guardar el nombre del prestamo en el paso 3
    $('.save-prestamo').on('click', function() {
      var value = $(this).siblings('input').val();
      $('.final-prestamo h3').html(value)   

      $(this).parent().hide();
      $(this).parent().siblings().show();
    });

  });