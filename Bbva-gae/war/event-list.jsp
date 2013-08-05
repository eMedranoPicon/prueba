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

<html>
<head>
<title>Eventos</title>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<link rel="stylesheet" type="text/css"
	href="/css/bootstrap-datetimepicker.min.css" />
<style>
#map-canvas-front {
	width: 900px;
	height: 400px;
}

.mapWrapper {
	padding: 30px;
}
</style>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
  <![endif]-->

<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="/libraries-js.jsp" />

<!-- EO Bloque de Librerias - libreriasjs -->
<script src="https://apis.google.com/js/client.js"> 
  // { "client": {}, 
    // "googleapis.config": { 
   //    root: "https://sopragroupux.appspot.com/_ah/api"       
  //   } 
//   } 
</script>

<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true">
	</script>

<script src="js/application.js"></script>
<script type="text/javascript">
setTimeout(function() {
	loadGapi();
	},400);
</script>

</head>
<body>

	<div>
		<div>
			<div style="float: left;" class="headline">Eventos</div>
			<div style="float: right;">
				<a href="<%=url%>"><%=urlLinktext%></a>
				<%=(user == null ? "" : user.getNickname())%></div>
		</div>
	</div>

	<div>
		<div class="mapWrapper">
			<div id="map-canvas-front"></div>
		</div>
		<div>
			<table class="table table-striped">
				<tr>
					<th>Titulo</th>
					<th>Hora Inicio</th>
					<th>Hora Fin</th>
					<th>Direccion Completa</th>
					<th>Descripcion</th>
					<th>URL</th>
					<th>Asistentes</th>
					<th>Etiquetas</th>
				</tr>

				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>

		<a style="display:<%=(user == null ? "none" : "block")%>"
			href="/backend/event-new.jsp">Nuevo Evento</a>
	</div>


</body>
</html>
