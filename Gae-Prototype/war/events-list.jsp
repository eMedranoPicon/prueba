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
<link rel="stylesheet" type="text/css" href="css/main.css" />
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
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
	
	<div style="width: 100%;">
		<div class="line"></div>
		<div class="topLine">
			<div style="float: left;" class="headline">Eventos</div>
			<div style="float: right;">
				<a href="<%=url%>"><%=urlLinktext%></a>
				<%=(user == null ? "" : user.getNickname())%></div>
		</div>
	</div>

	<div class="main">		
	<div class="mapWrapper">
		<div id="map-canvas-front"></div>
	</div>
	<div>
	Hay <%=events.size()%> Eventos
		<table>
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
	
	<a style="display:<%=(user == null ? "none" : "block" )%>" href="/backend/eventApplication.jsp">Nuevo Evento</a>	
	</div>


</body>
</html>
