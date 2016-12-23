var action;
centerPopupAccess();
loadPopupAccess();
hideContract();


//CONTROLLING EVENTS IN jQuery
$(document).ready(function() {
	//Click the button event!
	$("#acceptAccess2").click(function() {
		$("#backgroundPopupPartners").fadeOut("slow");
		$("#popupAccess").fadeOut("slow");						
	});

	//Click the button event!
	$("#cancelAccess").click(function() {
		$("#backgroundPopupPartners").fadeOut("slow");
		$("#popupAccess").fadeOut("slow");
		
	});
});

function centerPopupAccess() {
 /* request data for centering */
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
                     
  var popupHeight = $("#popupAccess").height();
  var popupWidth = $("#popupAccess").width();
  /* centering */
  $("#popupAccess").css({
            "position": "fixed",
            "top": windowHeight/2-popupHeight/2,
            "left": windowWidth/2-popupWidth/2
        });
  /* only need force for IE6 */

  $("#backgroundPopupPartners").css({
            "height": windowHeight
  });
}

function loadPopupAccess() {
	$("#backgroundPopupPartners").css({
        "opacity": "0.7"
    });
    $("#backgroundPopupPartners").fadeIn("slow");
    $("#popupAccess").fadeIn("slow");
}

function changeContract(){	
	if(document.getElementById("acceptClub").checked){
		document.getElementById("btnAcceptAccess").style.display = 'none';
		document.getElementById("btnAcceptAccessOk").style.display = '';
	}else{
		document.getElementById("btnAcceptAccess").style.display = '';
		document.getElementById("btnAcceptAccessOk").style.display = 'none';
	}
}

function showContract(){
	document.getElementById("acceptClub").checked = false;
	document.getElementById("popupAccess").style.display = 'block';
	document.getElementById("backgroundPopupPartners").style.display = 'block';
	
	trackEvent(this, 'Cuerpo','unetealclub',idtext);
					
}
function hideContract(){
	
		document.getElementById("popupAccess").style.display = 'none';
		document.getElementById("backgroundPopupPartners").style.display = 'none';
	
}