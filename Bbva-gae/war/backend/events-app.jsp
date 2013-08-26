<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<%
	UserService userService = UserServiceFactory.getUserService();
	User user = userService.getCurrentUser();

	String url = userService.createLoginURL(request.getRequestURI());
	String urlLinktext = "Login";
	if (user != null) {
		url = userService.createLogoutURL(request.getRequestURI());
		urlLinktext = "Logout";
	}
%>
<!DOCTYPE html>

<html lang="es" >
<head>
<title>backend - events:: BBVA in cloud</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">

<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<link rel="stylesheet" type="text/css" href="/css/bootstrap-datetimepicker.min.css" />

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->


<jsp:include page="/libraries-angular.jsp" />
<jsp:include page="/libraries-angular-events.jsp" />

<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="/libraries-js.jsp" />

<script src="https://apis.google.com/js/client.js?onload=auth"></script>
<!--
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
-->
</head>
<body ng-app="app">

	<div class="container">

		<!-- include backend-header.jsp -->
		<jsp:include page="/content/common/backend-header.jsp" />
		<!-- EO include backend-header.jsp -->

		<!-- include navbar.jsp -->
		<jsp:include page="/content/common/backend-navbar.jsp" />
		<!-- EO include navbar.jsp -->

		<!-- include events-home.html -->
		<section class="section-page" ng-controller="appController">

			<header class="header-section">
				<h1>{{textTitle}}</h1>
			</header>

			<div class="container-fluid">
				<div class="row-fluid">

					<div class="alert alert-error" ng-show="showError">
						<p>{{textError}}</p>
					</div>

					<div ng-view></div>

					<div class="span15" ng-show="showEditLayout">
						<!--
						<section id="map"  >
						  <div ui-map="myMap" ui-options="mapOptions" class="map-canvas" style="height:300px;width:400px;border:2px solid #777777;margin:3px; border:1px solid"></div>
						</section>-->

						<div id="map" ui-map="myMap"
						style="height:300px;width:400px;border:2px solid #777777;margin:3px; border:1px solid"
						ui-options="mapOptions"
						ui-event="{'map-idle' : 'onMapIdle()'}"
						>
						</div>

						<!--In addition to creating the markers on the map, div elements with existing google.maps.Marker object should be created to hook up with events -->
						<div ng-repeat="marker in myMarkers" ui-map-marker="myMarkers[$index]"
						ui-event="{'map-click': 'markerClicked(marker)'}">
						</div>



						<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid" style=" border-width:0 " width="100%" height="400px" frameborder="0" scrolling="no"></iframe>
    				</div>


				</div>
			</div>

		</section>

	</div>

  <footer>
    <p></p>
  <footer>


	<!--
<script src="/js/maps.js"></script>-->
	<script src="/js/calendar.js"></script>

	<script type="text/javascript">
		/*
		 $(function() {
		 console.log('carga datepicker');
		 //no funciona en el entorno ANGULARjs
		 $('#dateStart').datetimepicker({
		 language : 'es',
		 pickSeconds : false,
		 startDate: new Date()
		 });
		 $('#dateEnd').datetimepicker({
		 language : 'es',
		 pickSeconds : false,
		 startDate: new Date()
		 });
		 //Fecha de Finalizacion Obligatoria para poder crear evento en google calendar
		 $('#dateEnd').click( function(){
		 console.log('click on dateEnd');
		 if ($('#dateEnd').val()=='') {
		 $('#dateEnd').val($('#dateStart').val());
		 }
		 });

		 //funcionaria si la pagina se recargara. Hack temporal para evitar errores carga js. Disculpe las molestias :)
		 setTimeout(function() {
		 $(document).ready(function () {
		 if(window.location.href.indexOf("event-edit") > -1) {
		 previewMap();
		 }
		 });
		 }, 2000);

		 });*/
	</script>
</body>
</html>