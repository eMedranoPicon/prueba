<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="sopra.ux.gae.model.Event" %>
<%@ page import="sopra.ux.gae.dao.Dao" %>

<!DOCTYPE html>


<%@page import="java.util.ArrayList"%>

<html>
  <head>
    <title>Events</title>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
      <meta charset="utf-8"> 
  </head>
  <body>
<%
Dao dao = Dao.INSTANCE;

UserService userService = UserServiceFactory.getUserService();
User user = userService.getCurrentUser();

String url = userService.createLoginURL(request.getRequestURI());
String urlLinktext = "Login";
List<Event> events = new ArrayList<Event>();
            
if (user != null){
    url = userService.createLogoutURL(request.getRequestURI());
    urlLinktext = "Logout";
    events = dao.getEvents(user.getUserId());
}
    
%>
  <div style="width: 100%;">
    <div class="line"></div>
    <div class="topLine">
      <div style="float: left;"><img src="images/todo.png" /></div>
      <div style="float: left;" class="headline">Events</div>
      <div style="float: right;"><a href="<%=url%>"><%=urlLinktext%></a> <%=(user==null? "" : user.getNickname())%></div>
    </div>
  </div>

<div style="clear: both;"/>  
You have a total number of <%= events.size() %>  Events.

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

<% for (Event event : events) {%>
<tr> 
<td>
<%=event.getTitle()%>
</td>
<td>
<%=event.getDateStart()%>
</td>
<td>
<%=event.getDateEnd()%>
</td>
<td>
<%=event.getAddress()%>
</td>
<td>
<%=event.getDescription()%>
</td>
<td>
<%=event.getUrl()%>
</td>
<td>
<%=event.getAudience()%>
</td>
<td>
<%=event.getTags()%>
</td>
</tr> 
<%}
%>
</table>


<hr />

<div class="main">

<div class="headline">New Event</div>

<% //if (user != null){ %> 

<form action="/new" method="post" accept-charset="utf-8">
  <table>
  <tr>
    <td valign="top"><label for="title">Titulo Evento</label></td>
    <td><input type="text" name="title" id="title" size="65" /></td>
  </tr>
  <tr>
    <td valign="top"><label for="dateStart">Hora de Inicio:</label></td>
    <td><input type="text" name="dateStart" id="dateStart" size="35" /></td>
  </tr>
   <td valign="top"><label for="dateEnd">Hora de fin:</label></td>
    <td><input type="text" name="dateEnd" id="dateEnd" size="35" /></td>
  </tr> 
   <td valign="top"><label for="address">Direccion Completa</label></td>
    <td><input type="text" name="address" id="address" size="65" /></td>
  </tr>       
    <tr>
      <td valign="description"><label for="description">Descripcion</label></td>
      <td><textarea rows="4" cols="30" name="description" id="description"></textarea></td>
    </tr>
  <tr>
    <td valign="top"><label for="url">URL Evento</label></td>
    <td><input type="url" name="url" id="url" size="65" /></td>
  </tr>
   <tr>
    <td valign="top"><label for="audience">Asistentes(separados por comas)</label></td>
    <td><input type="text" name="audience" id="audience" size="65" /></td>
  </tr>
  <tr>
    <td valign="top"><label for="tags">Etiquetas(separadas por comas)</label></td>
    <td><input type="text" name="tags" id="tags" size="65" /></td>
  </tr>
  
  
  <tr>
      <td colspan="2" align="right"><input type="submit" value="Crear"/></td>
    </tr>
  </table>
</form>

<% //}else{ %>

<!-- Please login with your Google account -->

<% //} %>
</div>
</body>
</html> 