$(document).ready(function () {
  "use strict";

  // SLIDE UP/DOWN SUBELEMENT
  $(".row-detail-content .element-container")
    .on('click', function() {
      slideUpDown($(this));
      slideUpDown($(this).find('.triangle'));
      slideUpDown($(this).next('.subelement-container'));
    });


  $(".row-detail-content .element-container-alerts")
    .on('click', function() {
      slideUpDown($(this).next('.alerts-container'));
    });


  $(".row-detail-content .subelement-container .content")
    .on('click', function() {
      var element = $(this).find('.check');
      reverseClass(element, 'icon-check', 'icon-check-green');
    });

});
