/*
  INICIALIZACIÓN DE LOS SCRIPTS
 */
$(document).ready(function () {
    "use strict";

    var flipContainerHoverClass;

    if( Modernizr.csstransitions )
        flipContainerHoverClass = 'hover';
    else
        flipContainerHoverClass = 'modern-hover';


    // MASK FOR INPUTS
    $(":input").inputmask();

    // INITIALIZE ACCORDION
    if($('#st-accordion').length)
        $('#st-accordion').accordionSoft();

    // INITIALIZE PIE CHART
    if($('.pie-chart').length)
        $( pieChart );

    // INITIALIZE POINT CHART
    if($('#point-chart').length)
        $( pointChart );

    // INITIALIZE POINT CHART
    if($('.progress-bar').length)
        $( progressBar );

    // INITIALIZE PRESUPUESTOS
    presupuestos.initControllers(flipContainerHoverClass);

    // INITIALIZE DETAIL PRESUPUESTOS
    if($('.detail-presupuestos').length)
        detailPresupuestos.initControllers(flipContainerHoverClass);

    // INITIALIZE TIMELINE
    if($('.timeline').length)
        timeline.initControllers();

    // INITIALIZE MODULES
    modules.initControllers();

});
