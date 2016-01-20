$(document).ready(function () {
  "use strict";

  $(".calendary-interaction").on('click', function() {
    if ($("ul.calendary").hasClass("slideup")) {
      $("ul.calendary").removeClass("slideup").addClass("slidedown");
    } else {
      $("ul.calendary").removeClass("slidedown").addClass("slideup");
    }
  });

});
