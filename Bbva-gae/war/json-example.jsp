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

  <!-- include header.jsp -->
  <jsp:include page="/content/common/header.jsp"/>
  <!-- EO include header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/navbar.jsp"/>
  <!-- EO include navbar.jsp -->

  <!-- include events-home.html -->
  <section class="section-page">
    <header class="header-section">
      <h1>Parser json</h1>
    </header>

    <div class="container-fluid">
      <div class="row-fluid">

        <div class="span24">

<pre>
<script type="text/javascript">
   var json =
                  { "store": {
                        "book": [
                          { "category": "reference",
                                "author": "Nigel Rees",
                                "title": "Sayings of the Century",
                                "price": 8.95
                          },
                          { "category": "fiction",
                                "author": "Evelyn Waugh",
                                "title": "Sword of Honour",
                                "price": 12.99
                          },
                          { "category": "fiction",
                                "author": "Herman Melville",
                                "title": "Moby Dick",
                                "isbn": "0-553-21311-3",
                                "price": 8.99
                          },
                          { "category": "fiction",
                                "author": "J. R. R. Tolkien",
                                "title": "The Lord of the Rings",
                                "isbn": "0-395-19395-8",
                                "price": 22.99
                          }
                        ],
                        "bicycle": {
                          "color": "red",
                          "price": 19.95
                        }
                  }
                },
           out = "";

       out += jsonPath(json, "$.store.book[*].author").toJSONString() + "\n>";
       out += jsonPath(json, "$..author").toJSONString() + "\n";
       out += jsonPath(json, "$.store.*").toJSONString() + "\n";
       out += jsonPath(json, "$.store..price").toJSONString() + "\n";
       out += jsonPath(json, "$..book[(@.length-1)]").toJSONString() + "\n";
       out += jsonPath(json, "$..book[-1:]").toJSONString() + "\n";
       out += jsonPath(json, "$..book[0,1]").toJSONString() + "\n";
       out += jsonPath(json, "$..book[:2]").toJSONString() + "\n";
       out += jsonPath(json, "$..book[?(@.isbn)]").toJSONString() + "\n";
       out += jsonPath(json, "$..book[?(@.price<10)]").toJSONString() + "\n";
       out += jsonPath(json, "$..*").toJSONString() + "\n";

/*
       out += jsonPath(json, "$.store.book[*].author", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..author", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$.store.*", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$.store..price", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..book[(@.length-1)]", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..book[-1:]", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..book[0,1]", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..book[:2]", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..book[?(@.isbn)]", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..book[?(@.price<10)]", {resultType:"PATH"}).toJSONString() + "\n";
out += jsonPath(json, "$..*", {resultType:"PATH"}).toJSONString() + "\n";
*/
       document.write(out);
  </script>
</pre>

        </div>


      </div>
    </div>
  </section>
  <!-- EO include events-home.html -->

</div> <!-- EO Container Page -->

</body>
</html>