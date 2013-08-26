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

	<!-- Bloque de Librerias - libreriasjs -->
	<jsp:include page="/libraries-js.jsp" />

	<script src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>

	<!-- para google maps - mas angular -->
	<script src="/src/lib/angular-ui/ui-utils/modules/event/event.js"></script>
	<script src="/src/lib/angular-ui/ui-map/ui-map.js"></script>
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
	<!-- eo para google maps -->

	<!--<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=onGoogleReady"></script>
-->
	<script src="/src/appMap.js"></script>

	<script src="https://apis.google.com/js/client.js?onload=auth"></script>

</head>
<body>
<div class="container">

	<!-- include backend-header.jsp -->
	<jsp:include page="/content/common/backend-header.jsp" />
	<!-- EO include backend-header.jsp -->

	<!-- include navbar.jsp -->
	<jsp:include page="/content/common/backend-navbar.jsp" />
	<!-- EO include navbar.jsp -->

	<div ng-app='maptesting'>
	    <div ng-controller="MapCtrl">
	        <div id="map_canvas" ui-map="myMap"
	        style="height:300px;width:400px;border:2px solid #777777;margin:3px; border:1px solid"
	        ui-options="mapOptions"
	        ui-event="{'map-idle' : 'onMapIdle()'}"
	        >
	        </div>
	        <!--In addition to creating the markers on the map, div elements with existing google.maps.Marker object should be created to hook up with events -->
	        <div ng-repeat="marker in myMarkers" ui-map-marker="myMarkers[$index]" ui-event="{'map-click': 'markerClicked(marker)'}"></div>
	    </div>
	</div>

</div>

<footer>
	<p></p>
<footer>
</body>
</html>