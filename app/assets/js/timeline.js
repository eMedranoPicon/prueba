/*
  Controladores del componente timeLine
*/
var timeline = (function() {

  var namespace = '.timeline';
  var $root;


  // JQUERY CONTROLLERS
  function initControllers() {

    $root = $(namespace);

    // MODULE PRINCIPAL
    // DESPLEGAR DETALLES
    $root.find('.fila .button-details')
    .on('click', function(event) {
      var $elems = $(this).closest('.st-accordion').find('.modules-container');
      var $thisElem = $(this).closest('.fila').find('.modules-container');
      for(var e=0; e < $elems.length; e++){
        $($elems[e]).closest('.fila').find('.button-details').removeClass('selected');
        if($($elems[e]).hasClass('slidedown') && !$($elems[e]).is($thisElem)){
          modules.slideContainer($($elems[e]));
          modules.rebootWarning($($elems[e]));
        }
      }
      if($thisElem.hasClass('slideup'))
        $(this).addClass('selected');
      modules.slideContainer($thisElem);
      modules.rebootWarning($thisElem);
    });

    // MODULE ALERTS (TIMELINE)
    // SLIDE DOWN ALERTS
    $root.find(
      ".receipt-detail-content .element-container-alerts .icon-container,"+
      ".prestamo-detail-content .element-container-alerts .icon-container")
      .on('click', function() {
        var $previousElem, h;
        var $container = $(this).closest('.modules-container');
        var $elem = $container.find('.alerts-container');

        if($(this).closest('.element-container-alerts').is('.receipt-detail-content .element-container-alerts')){
          $previousElem = $container.find('.receipt-detail-container');
        }
        else {
          $previousElem = $container.find('.prestamo-detail-container');
        }

        modules.changeToSubModule($previousElem, $elem, $container);
      });

    // RETURN TO PRINCIPAL / SLIDE UP ALERTS
    $root.find(
      ".alerts-container .button-module,"+
      ".alerts-container.prestamo .button-module")
      .on('click', function() {
        var $elem, $container, $content;

        $container = $(this).closest('.modules-container');
        $content = $(this).closest('.alerts-container');
        if($(this).is('.alerts-container.prestamo .button-module')){
          $elem = $(this).closest('.fila').find('.prestamo-detail-container');
        }
        else {
          $elem = $(this).closest('.fila').find('.receipt-detail-container');
        }

        modules.changeToSubModule($content, $elem, $container);
      });
  }

  return {
    initControllers: initControllers
  };
})();
