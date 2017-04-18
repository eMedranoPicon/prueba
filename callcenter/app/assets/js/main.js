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
   $('#st-accordion').accordionSoft();

   // INITIALIZE PIE CHART
   if($('.pie-chart').length)
     $( pieChart );

   // INITIALIZE POINT CHART
   if($('#point-chart').length)
     $( pointChart );

   // INITIALIZE PROGRESS BAR
   if($('.progress-bar').length)
     $( progressBar );

});