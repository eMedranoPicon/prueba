var popupStatusAlta = 0;
  //loading popup with jQuery magic!
  function loadPopupAlta() {
    //loads popup only if it is disabled
    if (popupStatusAlta == 0) {
      $("#backgroundPopupAlta").css({
        "opacity" : "0.7"
      });
      $("#backgroundPopupAlta").fadeIn("slow");
      $("#popupContactAlta").fadeIn("slow");
      popupStatusAlta = 1;
    }
  }

  //centering popup
  function centerPopupAlta() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupContactAlta").height();
    var popupWidth = $("#popupContactAlta").width();
    //centering
    $("#popupContactAlta").css({
      "position" : "fixed",
      "top" : windowHeight / 2 - popupHeight / 2,
      "left" : windowWidth / 2 - popupWidth / 2
    });
    //only need force for IE6
    $("#backgroundPopupAlta").css({
      "height" : windowHeight
    });

  }
$("#videoamazonloading").click(function() {
  $("#playerID").attr("src","https://www.youtube.com/embed/820VlP9ML8w?autoplay=1");
  centerPopupAlta();
  loadPopupAlta();
  return false;
});

$("#cancelAltaPopup").click(function() {
    var video = $("#playerID").attr("src");
    $("#playerID").attr("src","");
    $("#playerID").attr("src","https://www.youtube.com/embed/820VlP9ML8w");
    
    $("#backgroundPopupAlta").fadeOut("slow");
    $("#popupContactAlta").fadeOut("slow");
    
    popupStatusAlta = 0;
    return false;
  });
  
  
  
 