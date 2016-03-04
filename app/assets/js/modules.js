/*
 * Controladores genéricos para los módulos
 */
var modules = (function() {

  var $root,
      $receiptModule,
      $prestamoModule,
      $alertsModule,
      $devolverBajaModule;

  var rootName          = '.modules-container',
      receiptName       = '.receipt-detail-content',
      prestamoName      = '.prestamo-detail-content',
      alertsName        = '.alerts-module-content',
      devolverBajaName  = '.devolver-baja-module-content';


  var countDevBaja = 0,
      marginTop = 10;


  // FUNCTIONS FOR MODULES
  function rebootWarning($context) {
    var $elems, $warning;
    var $container = $context.closest('.modules-container');

    $elems = $container.find('.devolver-baja-container');
    for(var e=0; e < $elems.length; e++) {
      $warning = $($elems[e]).find('.warning-container');
      if(!$warning.hasClass('hidden'))
        $warning.addClass('hidden');
    }
    countDevBaja = 0;
  }

  function slideContainer($context) {
    var $container = $context.closest('.modules-container');
    var h = $container.find('.slidedown .module-inner-content').outerHeight() + marginTop;
    if ($container.hasClass("slideup")) {
      $container.removeClass("slideup").addClass("slidedown");
      $container.css('height', h+'px');
    } else {
      $container.removeClass("slidedown").addClass("slideup");
      $container.removeAttr('style');
    }
  }

  function clearStyle($content) {
    $content.css('height', 0);
  }

  function changeToSubModule($previousElem, $subModule, $container) {
    var h;

    slideUpDown($previousElem);
    slideUpDown($subModule);
    clearStyle($previousElem);

    h = $subModule.find('.module-inner-content').outerHeight() + marginTop;
    $subModule.css('height', h+'px');
    h = h + marginTop;
    $container.css('height', h+'px');
  }

  // JQUERY CONTROLLERS
  function initControllers() {

    $root               = $(rootName);
    $receiptModule      = $root.find(receiptName);
    $prestamoModule     = $root.find(prestamoName);
    $alertsModule       = $root.find(alertsName);
    $devolverBajaModule = $root.find(devolverBajaName);


    /***************************************
    ******* RECEIPT PRESTAMO MODULES *******
    ***************************************/

    // SLIDE UP/DOWN SUBELEMENT
    $root.find(
      ".receipt-detail-content .element-container,"+
      ".prestamo-detail-content .element-container")
      .on('click', function() {
        var $elem = $(this).closest('.module-inner-content');
        var $subE = $(this).next('.subelement-container');
        var $childs = $subE.find('.content');
        var h = $childs.length * $($childs[0]).outerHeight();

        slideUpDown($(this).find('.triangle'));
        if($subE.hasClass('slideup')){
          $subE.css('height', h+'px');
          h = $elem.outerHeight() + h + marginTop;
        }
        else {
          clearStyle($subE);
          h = $elem.outerHeight() - h + marginTop;
        }
        slideUpDown($subE);
        $(this).closest('.modules-container').css('height', h+'px');
      });

    // CHANGE SUBELEMENT CHECK
    $root.find(
      ".receipt-detail-content .subelement-container .content,"+
      ".prestamo-detail-content .subelement-container .content")
      .on('click', function() {
        var $element = $(this).find('.check');
        reverseClass($element, 'icon-check', 'icon-check-green');
      });

    // AMORTIZAR PRESTAMO
    $root.find(".prestamo-detail-content .button-module.prestamo")
      .on('click', function() {

        slideContainer($(this));
      });


    // SLIDE DOWN DEVOLVER Y BAJA
    $receiptModule.find(
      ".button-module,"+
      ".bottom-container .link")
      .on('click', function() {
        var $elem;
        var $container = $(this).closest('.modules-container');
        var $previousElem = $container.find('.receipt-detail-container');

        countDevBaja = 0;
        if($(this).is(".receipt-detail-content .button-module")) {
          $elem = $(this).closest('.fila').find('.devolver-baja-container.devolver');
        }
        else {
          $elem = $(this).closest('.fila').find('.devolver-baja-container.baja');
        }

        changeToSubModule($previousElem, $elem, $container);
      });


    /************************************
    ******* DEVOLVER BAJA MODULES *******
    ************************************/

    //HOVER ENLACE SMS
    $devolverBajaModule.find(".link-container")
      .hover(function() {
        $(this).find('i').addClass('icon-hover');
        $(this).find('a').addClass('hover');
      }, function() {
        $(this).find('i').removeClass('icon-hover');
        $(this).find('a').removeClass('hover');
      });

    // CONFIRM
    $devolverBajaModule.on('click', ".confirm", function() {
        var $elem, $previousElem, h;
        var $container = $(this).closest('.modules-container');
        var $warning = $(this).closest('.devolver-baja-module-content').find('.warning-container');

        $previousElem = $(this).closest('.devolver-baja-container');
        if(countDevBaja === 0){
          $warning.removeClass('hidden');
          countDevBaja++;
          h = $previousElem.outerHeight() + $warning.outerHeight() + marginTop;
          $container.css('height', h+'px');
        }
        else {
          $elem = $container.find('.receipt-detail-container');
          rebootWarning($(this));
          changeToSubModule($previousElem, $elem, $container);
        }
      });

    // CANCEL
    $devolverBajaModule.on('click', '.cancel', function() {
        var $container = $(this).closest('.modules-container');
        var $previousElem = $(this).closest('.devolver-baja-container');
        var $elem = $container.find('.receipt-detail-container');

        rebootWarning($(this));
        changeToSubModule($previousElem, $elem, $container);
      });

  }


  // GETERS AND SETERS
  function getMarginTop() {
    return marginTop;
  }

  function getCountDevBaja() {
    return countDevBaja;
  }

  return {
    rebootWarning: rebootWarning,

    slideContainer: slideContainer,

    clearStyle: clearStyle,

    changeToSubModule: changeToSubModule,

    getMarginTop: getMarginTop,

    getCountDevBaja: getCountDevBaja,

    initControllers: initControllers
  };
}());
