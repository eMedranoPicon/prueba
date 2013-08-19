//
//	jQuery Validate example script
//
//	Prepared by David Cochran
//
//	Free for your use -- No warranties, no guarantees!
//

$(document).ready(function()
{

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

		$('#new-form').validate(
		{
		    rules: {
		      title: {
		        minlength: 10,
		        required: true
		      }
		    },

			highlight: function(element) {
				$(element).closest('.control-group').removeClass('success').addClass('error');
			},

			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.control-group').removeClass('error').addClass('success');
			},

			submitHandler: function(form) {
		    	//do ajax call
		     	jEvenBuilder();
		   }
	  });

}); // end document.ready