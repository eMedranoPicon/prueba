(function($) {
  "use strict";

  function AddressForm() {
    var hiddenForm = $(".change-address-form"),
        addressContainer = $(".address-to-send");

    $("#changeAddress").click(function (){
      $(addressContainer).addClass("hidden");
      $(hiddenForm).removeClass("hidden");
    });
  }

  $.fn.addressForm = function() {
    this.each(function() {
      var address = $.data(this, "addressForm_plugin");

      if(!address) {
        address = new AddressForm();
        $.data(this, "addressForm_plugin", address);
      }
    });
  };
})(jQuery);
