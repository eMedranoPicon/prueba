<!DOCTYPE html>
<html lang="es" ng-app="appFront" ng-controller="appFrontController" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
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

</head>
<!--  http://alefeuvre.github.io/foundation-grid-displayer/ -->
<!-- <body data-grid-framework="bo" data-grid-color="blue" data-grid-opacity="0.5" data-grid-zindex="10" data-grid-nbcols="12">-->
<body>

	<div class="container">


		<!-- include header.jsp -->
		<jsp:include page="/content/common/header.jsp" />
		<!-- EO include header.jsp -->

		<!-- include navbar.jsp -->
		<jsp:include page="/content/common/navbar.jsp" />
		<!-- EO include navbar.jsp -->

		<!-- include events-home.html -->
		<section class="section-page">
			<header class="header-section" ng-cloak>
				<h1>{{locationPath | titlePage}}</h1>
			</header>

			<div class="container-fluid">
				<div class="row-fluid">

					<div ng-view></div>

				</div>
			</div>
		</section>
		<!-- EO include events-home.html -->

		<jsp:include page="/content/common/footer.html" />

	</div>
	<!-- EO Container Page -->

</body>
<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="/libraries-js.jsp" />
<jsp:include page="/libraries-angular.jsp" />
<script
	src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
<jsp:include page="/libraries-angular-maps.jsp" />
<jsp:include page="/libraries-angular-front.jsp" />
</html>