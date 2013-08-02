<%
   response.setHeader( "Pragma", "no-cache" );
   response.setHeader( "Cache-Control", "no-cache" );
   response.setDateHeader( "Expires", 0 );
%>
<!DOCTYPE html>
<html lang="es">
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

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="libraries-js.jsp"/>
  <!-- EO Bloque de Librerias - libreriasjs -->

</head>
<!--  http://alefeuvre.github.io/foundation-grid-displayer/ -->
<!-- <body data-grid-framework="bo" data-grid-color="blue" data-grid-opacity="0.5" data-grid-zindex="10" data-grid-nbcols="12">-->
<body>

<div class="container">

  <!-- include header.html -->
  <header class="header-page row-fluid hidden-print">
    <a href="index.jsp">
      <h1><span>BBVA in cloud</span></h1>
    </a>

    <h2>BBVA in Google Cloud</h2>

    <div class="legendTop pull-right">
      <ul class="languages">
        <li><a href="#" class="lang-button">Ingl&eacute;s</a></li>
        <li><a href="#" class="lang-button lang-current">Castellano</a></li>
      </ul>
      <br/>
      <a class="btn btn-medium" href="#">Acceso administradores</a>
    </div>
  </header>
  <!-- EO include header.html -->

  <!-- include navbar.html -->
  <nav class="navbar">
    <div class="navbar-inner">
      <div class="container">

        <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>

        <!-- Be sure to leave the brand out there if you want it shown -->
        <a class="brand visible-phone" href="#">BBVA in Google Cloud</a>

        <!-- Everything you want hidden at 940px or less, place within here -->
        <div class="nav-collapse collapse">
          <!-- .nav, .navbar-search, .navbar-form, etc -->
          <ul class="nav">
            <li class="active divider-vertical"><a href="/index.jsp">Home</a></li>
            <li class="divider-vertical"><a href="/event-list.jsp" >Eventos</a></li>
            <li class="divider-vertical"><a href="#">Lugar&eacute;s de inter&eacute;s</a></li>
            <li class="divider-vertical"><a href="#">V&iacute;deos</a></li>
          </ul>

          <form class="navbar-search">
            <input type="text" class="search-query" placeholder="Search">
          </form>

        </div>

      </div>
    </div>
  </nav>
  <!-- EO include navbar.html -->

  <!-- include carousel.html -->
  <div id="myCarousel" class="carousel slide">

    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Carousel items -->
    <div class="carousel-inner">

      <div class="active item">
        <img src="img/carousel/slide-02d.jpg" alt="">
        <div class="container">
          <div class="carousel-caption">
           <h1>Example headline.</h1>
              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <a class="btn btn-large btn-primary" href="#">Learn more</a>
          </div>
        </div>
      </div>

      <div class="item">
        <img src="img/carousel/slide-01d.jpg" alt="">
        <div class="container">
          <div class="carousel-caption">
           <h1>Another example headline.</h1>
              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <a class="btn btn-large btn-primary" href="#">Sign up today</a>
          </div>
        </div>
      </div>

      <div class="item">
        <img src="img/carousel/slide-03d.jpg" alt="">
      </div>

    </div>

    <!-- Carousel nav -->
    <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
    <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
  </div>
  <!-- EO include carousel.html -->

  <!-- include events-home.html -->
  <section class="section-page">
    <header class="header-section">
      <h1>Eventos</h1>
    </header>

    <div class="container-fluid">
      <div class="row-fluid">

        <div class="span12">
          <article>

          </article>
        </div>

        <div class="span12">
          <iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid" style=" border-width:0 " width="100%" height="400px" frameborder="0" scrolling="no"></iframe>
        </div>

      </div>
    </div>
  </section>
  <!-- EO include events-home.html -->

</div> <!-- EO Container Page -->

</body>
</html>