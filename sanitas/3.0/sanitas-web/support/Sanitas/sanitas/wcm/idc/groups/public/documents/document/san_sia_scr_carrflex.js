// JavaScript Document
$(document).ready(function() { 
		$("a.box").lightBox(); 
		$("#sliderinferior").jCarouselLite({
				btnNext: "#al",
				btnPrev: "#de",
				visible: 3
			});
	    $("#sliderinferior2").jCarouselLite({
				btnNext: "#al2",
				btnPrev: "#de2",
				visible: 3
		});
	    $("#sliderinferior3").jCarouselLite({
				btnNext: "#al3",
				btnPrev: "#de3",
				visible: 3
		});
});