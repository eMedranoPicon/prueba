<!DOCTYPE html>
<html lang="es" ng-app="appFront">
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
<body>

	<div class="container">
		<!-- include header.jsp -->
		<jsp:include page="/content/common/header.jsp" />
		<!-- EO include header.jsp -->

		<!-- include navbar.jsp -->
		<jsp:include page="/content/common/navbar.jsp" />
		<!-- EO include navbar.jsp -->
		<!-- include places-fronte.html -->
		<section class="section-page">
			<header class="header-section">
				<h1>Lugares de Inter&eacutes</h1>
			</header>

			<div class="container-fluid">
				<div class="row-fluid">

					<div ng-view></div>

				</div>
			</div>
		</section>
		<!-- EO include places-front.html -->
		<!-- include footer.jsp -->
		<jsp:include page="/content/common/footer.html" />
		<!-- EO include footer.jsp -->

	</div>
	<!-- EO Container Page -->

	<!-- Bloque de Librerias - libreriasjs -->
	<jsp:include page="/libraries-js.jsp" />
	<jsp:include page="/libraries-angular.jsp" />	
	<jsp:include page="/libraries-angular-front.jsp" />	
	<jsp:include page="/libraries-angular-maps.jsp" />
	<script
		src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
</body>
</html>