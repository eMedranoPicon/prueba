<%
   response.setHeader( "Pragma", "no-cache" );
   response.setHeader( "Cache-Control", "no-cache" );
   response.setDateHeader( "Expires", 0 );
%>
<!DOCTYPE html>
<html lang="es" ng-app="appFront">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta charset="utf-8">
  <!--<link rel="icon" href="img/favicon.ico" type="image/icon">-->
  <title>BBVA in cloud</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- styles -->
  <link href="/css/main.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
  <![endif]-->

  <jsp:include page="/libraries-angular.jsp" />
  <script src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
  <jsp:include page="/libraries-angular-maps.jsp" />
  <jsp:include page="/libraries-angular-events.jsp" />
  <jsp:include page="/libraries-angular-front.jsp" />

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="/libraries-js.jsp" />

</head>
<!--  http://alefeuvre.github.io/foundation-grid-displayer/ -->
<!-- <body data-grid-framework="bo" data-grid-color="blue" data-grid-opacity="0.5" data-grid-zindex="10" data-grid-nbcols="12">-->
<body>

<div class="container">

  <!-- include header.jsp -->
  <jsp:include page="/content/common/header.jsp"/>
  <!-- EO include header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/navbar.jsp"/>
  <!-- EO include navbar.jsp -->

  <!-- include carousel.html -->
  <jsp:include page="/src/views/banner/banner-front.html"/>
  <!-- EO include carousel.html -->

  <!-- include events-home.html -->
  <section class="section-page">
    <header class="header-section">
      <h1><a href="content/events/events.jsp">Eventos</a></h1>
    </header>

    <div class="container-fluid">
      <div class="row-fluid">

        <div class="span12">

          <div class="row-fluid">

            <jsp:include page="/src/views/events/front/events-list-home.html"/>

          </div>


        </div>

        <div class="span12">
          <iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=470&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid" style=" border-width:0 " width="100%" height="470px" frameborder="0" scrolling="no"></iframe>
        </div>

      </div>
    </div>
  </section>
  <!-- EO include events-home.html -->

  <jsp:include page="/content/common/footer.html"/>

</div> <!-- EO Container Page -->

</body>
</html>