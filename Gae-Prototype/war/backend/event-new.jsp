<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="java.util.List"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<%@ page import="sopra.ux.gae.model.Event"%>
<%@ page import="sopra.ux.gae.dao.Dao"%>
<%@ page import="java.io.File"%>
<!DOCTYPE html>

<%@page import="java.util.ArrayList"%>
<html>
<head>
<title>Eventos</title>
<!-- styles -->
  <link rel="stylesheet" type="text/css" href="/css/main.css" />
  <link rel="stylesheet" type="text/css" href="/css/bootstrap-datetimepicker.min.css" />

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
  <![endif]-->

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="liberiasjs.jsp"/>
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
	
	<script src="js/application.js"></script>
</head>
<body>
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
	<div style="width: 100%;">
		<div class="line"></div>
		<div class="topLine">
			<div style="float: left;" class="headline">Eventos</div>
			<div style="float: right;">
				<a href="<%=url%>"><%=urlLinktext%></a>
				<%=(user == null ? "" : user.getNickname())%></div>
		</div>
	</div>
    <% if(user == null) { %>
    No puedes crear Eventos. Logueate <a href="<%=url%>"><%=urlLinktext%></a>
   <% } else { %>
	<div class="main">
		<div class="headline">Nuevo Evento</div>
		<div class="form">
			<form action="/new" method="post" accept-charset="utf-8" onkeypress="return noenter(event)">
				<table>
					<tr>
						<td valign="top"><label for="title">Titulo Evento</label></td>
						<td><input type="text" name="title" id="title" size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="dateStart">Hora de
								Inicio:</label></td>
						<td><input type="text" name="dateStart" id="dateStart"
							size="40" /></td>
					</tr>
					<td valign="top"><label for="dateEnd">Hora de fin:</label></td>
					<td><input type="text" name="dateEnd" id="dateEnd" size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="address">Direccion</label></td>
						<td><input type="text" name="address" id="address" size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="zipcode">Codigo Postal</label></td>
						<td><input type="text" name="zipcode" id="zipcode" size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="city">Ciudad</label></td>
						<td><input type="text" name="city" id="city" size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="country">Pais</label></td>
						<td><input type="text" name="country" id="country" size="40" /></td>
					</tr>

					<tr>
						<td><input type="button" value="Ubicar en Google Maps"
							onclick="codeAddress()"></td>
					</tr>
					<tr>
						<td valign="top"><label for="description">Descripcion</label></td>
						<td><textarea rows="4" cols="30" name="description"
								id="description"></textarea></td>
					</tr>
					<tr>
						<td valign="top"><label for="url">URL Evento</label></td>
						<td><input type="text" name="url" id="url" size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="audience">Asistentes(separados
								por comas)</label></td>
						<td><input type="text" name="audience" id="audience"
							size="40" /></td>
					</tr>
					<tr>
						<td valign="top"><label for="tags">Etiquetas(separadas
								por comas)</label></td>
						<td><input type="text" name="tags" id="tags" size="40" /></td>
					</tr>

					<tr>
						<td colspan="2" align="right"><input type="submit"
							value="Crear" /></td>
					</tr>
				</table>
			</form>
		</div>
	<div class="mapWrapper">
		<div id="map-canvas"></div>
	</div>
	<a href="/index.jsp">Volver home</a>	
		<%}%>
	</div>
</body>
</html>
