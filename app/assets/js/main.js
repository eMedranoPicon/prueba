$(document).ready(function () {
  "use strict";

  $(".calendary-interaction").on('click', function() {
    if ($("ul.calendary").hasClass("slideup")) {
      $("ul.calendary").removeClass("slideup").addClass("slidedown");
    } else {
      $("ul.calendary").removeClass("slidedown").addClass("slideup");
    }
  });

  $(".target-future").hover(
    function() {
      $(this).find('.modify>i').addClass('icon-orange');
    }, function() {
      $(this).find('.modify>i').removeClass('icon-orange');
    }
  );

  $(".card").flip();

});
