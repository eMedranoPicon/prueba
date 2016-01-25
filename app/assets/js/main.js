$(document).ready(function () {
  "use strict";

  // MASK FOR INPUTS
  $(":input").inputmask();

  // SLIDE UP/DOWN CALENDAR
  $(".calendary-interaction").on('click', function() {
    if ($("ul.calendary").hasClass("slideup")) {
      $("ul.calendary").removeClass("slideup").addClass("slidedown");
    } else {
      $("ul.calendary").removeClass("slidedown").addClass("slideup");
    }
  });

  //HOVER ICONS IN TARGET-FUTURE
  $(".target-future").hover(
    function() {
      $(this).find('.modify>i').addClass('icon-orange');
    }, function() {
      $(this).find('.modify>i').removeClass('icon-orange');
    }
  );

  // FLIP
  $('.flip').click(function(e){
    if (!$(this).find(".card").hasClass("flipped")) {
      $(this).find(".card").addClass("flipped");

      if($(this).find(".label-input").length){
        var $labelInput = $(this).find(".label-input");
        var labelID = $labelInput.attr('for');
        $('#'+labelID).show().focus();
        $labelInput.on('click', function() {
          $('#'+labelID).show().focus();
        });
      }
    }

  });

  $('.return-flip').click(function(event) {
    $(this).closest('.flipped').removeClass('flipped');
    event.stopPropagation();
  });

  // DATA INPUT STYLE CARD FUTURE
  $('.my-input')
    .on('blur', function() {
      var id = $(this).data('id');
      var value = $(this).val().split(',');
      $(this).hide();
      $('#label-input' + id).show();
      $('.value'+id).html(value[0]);
      $('.decimal'+id).html(value[1]);
    })
    .on('focus', function() {
      var $labelInput = $('#label-input' + $(this).data('id'));
      var value = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
      $labelInput.hide();
      $(this).val(value);
  });


});
