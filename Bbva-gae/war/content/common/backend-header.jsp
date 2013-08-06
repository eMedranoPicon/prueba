<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>

<%
  UserService userService = UserServiceFactory.getUserService();
  User user = userService.getCurrentUser();

  String url = userService.createLoginURL(request.getRequestURI());
  String urlLinktext = "Login";

  if (user != null)
  {
    url = userService.createLogoutURL(request.getRequestURI());
    urlLinktext = "Logout";
  }
%>

<!-- include backend-header.jsp -->
<header class="header-page row-fluid hidden-print">
  <a href="index.jsp">
    <h1><span>BBVA in cloud</span></h1>
  </a>

  <h2>BBVA in Google Cloud - Gestión del site</h2>

  <div class="legendTop pull-right">
    <div style="float: right;">
      <%=(user == null ? "" : user.getNickname())%> |
      <a href="<%=url%>"><%=urlLinktext%></a>
    </div>
  </div>
</header>
<!-- EO include backend-header.jsp -->