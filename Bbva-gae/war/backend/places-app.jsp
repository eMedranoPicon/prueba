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

<html lang="es" ng-app="appPlace">
<head>
  <title>backend - places:: BBVA in cloud</title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <!-- styles -->
  <link rel="stylesheet" type="text/css" href="/css/main.css" />

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->


  <jsp:include page="/libraries-angular.jsp"/>
  <jsp:include page="/libraries-angular-places.jsp"/>

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="/libraries-js.jsp" />

<script src="https://apis.google.com/js/client.js?onload=auth"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>

</head>
<body>

<div class="container">

  <!-- include backend-header.jsp -->
  <jsp:include page="/content/common/backend-header.jsp"/>
  <!-- EO include backend-header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/backend-navbar.jsp"/>
  <!-- EO include navbar.jsp -->

  <!-- include events-home.html -->
  <section class="section-page" ng-controller="appControllerPlaces">

    <header class="header-section">
   		<h1>{{textTitle}}</h1>
  	</header>

    <div class="container-fluid">
      <div class="row-fluid" >

        <div class="alert alert-error" ng-show="showError">
          <p>{{textError}}</p>
        </div>

        <div ng-view></div>

      </div>
		</div>

	</section>

</div>
<!-- script src="/js/maps.js"></script> -->
</body>

</html>