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

<html lang="es">
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
</head>
<body ng-app="app">

<div class="container">

	<jsp:include page="/backend/backend-header.jsp" />

	<jsp:include page="/backend/backend-navbar.jsp" />

	<section class="section-page" ng-controller="appController" ng-cloak >

		<header class="header-section">
			<h1>{{textTitle}}</h1>
		</header>

		<div class="container-fluid">
			<div class="row-fluid">

				<div class="alert alert-error" ng-show="showError">
					<p>{{textError}}</p>
				</div>

				<div ng-view></div>

			</div>
		</div>

	</section>

	<jsp:include page="/content/common/footer.html" />

</div>

	<jsp:include page="/libraries-angular.jsp" />
	<script	src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
	<jsp:include page="/libraries-angular-maps.jsp" />
	<jsp:include page="/libraries-angular-events.jsp" />
	<!-- Bloque de Librerias - libreriasjs -->
	<jsp:include page="/libraries-js.jsp" />
	<script src="https://apis.google.com/js/client.js?onload=loadGapi"></script>
	<!--
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
	-->
	<!--
	<script src="/js/maps.js"></script>
	-->
	<script src="/js/calendar.js"></script>
	<script src="/js/auth.js"></script>
</body>
</html>