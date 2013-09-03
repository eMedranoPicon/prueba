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

<html lang="es" ng-app="appBack">
<head>
<title>backend - events:: BBVA in cloud</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<link rel="stylesheet" type="text/css"
	href="/css/bootstrap-datetimepicker.min.css" />

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->

</head>
<body>

	<div class="container">

		<!-- include backend-header.jsp -->
		<jsp:include page="/content/common/backend-header.jsp" />
		<!-- EO include backend-header.jsp -->
		<!-- include navbar.jsp -->
		<jsp:include page="/content/common/backend-navbar.jsp" />
		<!-- EO include navbar.jsp -->


		<!-- include events-home.html -->
		<section class="section-page">

			<header class="header-section">
				<h1>Mapa de eventos</h1>
			</header>

			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span24">
						<div class="Flexible-container">
							<div id="map-canvas" class="map_canvas map_canvas_list"></div>
						</div>
					</div>
				</div>
			</div>

		</section>
	</div>
	<jsp:include page="/libraries-js.jsp" />
	<!-- Bloque de Librerias - Angularjs - genericas -->
	<jsp:include page="/libraries-angular.jsp" />
	<!-- EO Bloque de Librerias -  Angularjs - genericas -->
	<script src="/src/appBack.js"></script>
	<script
		src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
	<script src="/js/maps.js"></script>


	<script type="text/javascript">
		//temporal
		mapEvents();
	</script>
</body>
</html>