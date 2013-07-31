<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="java.util.List"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<%@ page import="sopra.ux.gae.model.Event"%>
<%@ page import="sopra.ux.gae.dao.Dao"%>
<%@ page import="java.io.File"%>
<%@page import="java.util.ArrayList"%>
<%
	Dao dao = Dao.INSTANCE;

	UserService userService = UserServiceFactory.getUserService();
	User user = userService.getCurrentUser();

	String url = userService.createLoginURL(request.getRequestURI());
	String urlLinktext = "Login";
	List<Event> events = new ArrayList<Event>();
	events = dao.getEvents();
	if (user != null) {
		url = userService.createLogoutURL(request.getRequestURI());
		urlLinktext = "Logout";
	}
%>
<!DOCTYPE html>

<html>
<head>
<title>Eventos</title>
 <!-- styles -->
  <link href="css/main.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
  <![endif]-->

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="liberiasjs.jsp"/>
  <!-- EO Bloque de Librerias - libreriasjs -->
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<style>
#map-canvas-front {
	width: 960px;
	height: 480px;
}

.mapWrapper {
	
}
</style>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
  <![endif]-->

<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="liberiasjs.jsp" />
<!-- EO Bloque de Librerias - libreriasjs -->
<script src="https://apis.google.com/js/client.js?onload=loadGapi"> 
   { "client": {}, 
     "googleapis.config": { 
       root: "https://sopragroupux.appspot.com/_ah/api"       
     } 
   } 
</script>
<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true">
	</script>

<script src="js/api.js"></script>


</head>
<body>

	<div>
		<div></div>
		<div>
			<div>Eventos</div>
			<div>
				<a href="<%=url%>"><%=urlLinktext%></a>
				<%=(user == null ? "" : user.getNickname())%></div>
		</div>
	</div>

	<div>
		<div class="mapWrapper">
			<div id="map-canvas-front"></div>
		</div>
		<div>
			Hay
			<%=events.size()%>
			Eventos
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

				<%
					for (Event event : events) {
				%>
				<tr>
					<td><%=event.getTitle()%></td>
					<td><%=event.getDateStart()%></td>
					<td><%=event.getDateEnd()%></td>
					<td><%=event.getAddress()%></td>
					<td><%=event.getDescription()%></td>
					<td><%=event.getUrl()%></td>
					<td><%=event.getAudience()%></td>
					<td><%=event.getTags()%></td>
				</tr>
				<%
					}
				%>
			</table>
		</div>

		<a style="display:<%=(user == null ? "none" : "block")%>"
			href="/backend/new-event.jsp">Nuevo Evento</a>
	</div>


</body>
</html>
