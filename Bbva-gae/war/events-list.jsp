<!DOCTYPE html>
<html lang="es" ng-app="app">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta charset="utf-8">
  <!--<link rel="icon" href="img/favicon.ico" type="image/icon">-->

  <title>backend:: BBVA in cloud</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- styles -->
  <link href="/css/main.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
  <script src="/js/lib/html5shiv.js"></script>
  <![endif]-->

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="libraries-js.jsp"/>
  <!-- EO Bloque de Librerias - libreriasjs -->

  <script src="https://apis.google.com/js/client.js"></script>

  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>

  <script src="src/app.js"></script>
  <script src="src/controllers/EventsListController.js"></script>
  <script src="src/controllers/EventDetailController.js"></script>

</head>

<body onload=auth();>

<div class="container">

  <!-- include header.jsp -->
  <jsp:include page="/content/common/header.jsp"/>
  <!-- EO include header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/navbar.jsp"/>
  <!-- EO include navbar.jsp -->


  <section class="section-page">

    <header class="header-section">
      <h1>Eventos</h1>
    </header>

    <div class="container-fluid">
      <div class="row-fluid">

        <div ng-view></div>

      </div>
    </div>

  </section>

</div> <!-- EO Container Page -->
</body>
</html>