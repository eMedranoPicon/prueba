(function($) {
  "use strict";

  function Close(btn) {
    btn.click(function() {
      var currentBtn = $(this);
      var identifierToClose = currentBtn.attr('data-close');

      currentBtn.parents(identifierToClose).slideUp();
    });
  }

  $.fn.close = function() {
    this.each(function() {
      var close = $.data(this, "close_plugin");

      if(!close) {
        close = new Close($(this));
        $.data(this, "close_plugin", close);
      }
    });
  };
})(jQuery);
