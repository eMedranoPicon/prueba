$(document).ready(function() {
      
	  //Ocultar tooltips
	  $('div[id^="tooltipmovement"]').hide();
	  
	  $('span[id^="movement"]').mouseover(function(){
		var nameElement = this.id;
		var numberNameElement = nameElement.substring(8);
		  var nameTooltip = "#tooltipmovement" + numberNameElement;
		$(nameTooltip).show();

	  });
	  
	  $('span[id^="movement"]').mouseleave(function(){
		var nameElement = this.id;
		var numberNameElement = nameElement.substring(8);
		var nameTooltip = "#tooltipmovement" + numberNameElement;
		$(nameTooltip).hide();
	  });
});

    gaCall();	
