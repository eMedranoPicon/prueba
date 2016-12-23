var contextPath = "";
var mobileExp = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile|o2|opera mini|palm( os)?|plucker|pocket|pre\/|psp|smartphone|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce; (iemobile|ppc)|xiino/i;

// Simple device detection
var ua = navigator.userAgent.toLowerCase();
var isiOS = (ua.match(/(ipad|iphone|ipod)/g) ? true : false);
var isAndroid = ua.indexOf("android") > -1;

jQuery(function() {
	jQuery('button')
			.on(
					'click',
					function() {
						sendEventGA('Usar la aplicación');
						
						var customUrlScheme = "coinc://start";

						// Don't give desktop browsers a chance to fail on a
						// nativeapp:// protocol
						if (!mobileExp.test(navigator.userAgent)) {
							goToCoincDesktop();
							return;
						}

						if (isAndroid) {
							var clicked = +new Date, timeout = 100;
							window.location = customUrlScheme;
							window
									.setTimeout(
											function() {
												// If we're still here after
												// another (timeout), try
												// facebook web app
												if (+new Date - clicked < timeout * 2) {
													// console.log('clicked '+
													// (+new Date - clicked) +'
													// ago- go to browser');
													if (isAndroid) {
														sendEventGA('Ir al market');
														window.location = "market://details?id=com.bankinter.coinc&hl=es";
													}
												} else {
													console
															.log('too late for browser');
												}
											}, timeout);
						} else if (isiOS) {
							setTimeout(
									function() {
										sendEventGA('Ir al market');
										window.location = "https://itunes.apple.com/es/app/coinc/id750951893?mt=8";
									}, 25);

							// If "custom-uri://" is registered the app will
							// launch immediately and your
							// timer won't fire. If it's not set, you'll get an
							// ugly "Cannot Open Page"
							// dialogue prior to the App Store application
							// launching
							window.location = customUrlScheme;
						}
					});
});

function goToCoincDesktop() {
	sendEventGA('Ir al escritorio');
	$('#hdnBtn').click();
}

function sendEventGA(action) {
	trackEvent('send', 'event', 'button', 'click', action);
	//ga('send', 'event', 'button', 'click', action);
}

$(document)
		.ready(
				function() {
					contextPath = $("#contextPath").text();
					if (isiOS) {
						$("#coinc_screenshot")
								.attr("src",
										contextPath + "/res/coinc/images/landing/coinc_landing_iphone.png");
					} else if (isAndroid) {
						$("#coinc_screenshot")
								.attr("src",
										contextPath + "/res/coinc/images/landing/coinc_landing_android.png");
					} else {
						$("#coinc_screenshot").attr("src",
								contextPath + "/res/coinc/images/landing/logo_coinc.jpg");
					}
				});