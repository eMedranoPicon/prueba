function pieChart() {

  // Config settings
  var chartSizePercent = 100;                        // The chart radius relative to the canvas width/height (in percent)
  var sliceBorderWidth = 1;                         // Width (in pixels) of the border around each slice
  var sliceBorderStyle = "#F79D25";                    // Colour of the border around each slice

  var chartStartAngle = Math.PI;              // Start the chart at 12 o'clock instead of 3 o'clock
  var fillColour = "#24313C";
  var fillColourSelectedPrimary = "#f8f9f9";
  var fillColourSelectedSecondary = "#F79D25";
  var fillColourSelectedSecondTransp = "rgba(247, 157, 37, 0.8)";

  // Declare some variables for the chart
  var canvas;                       // The canvas element in the page

  var animationId = 0;              // Tracks the interval ID for the animation created by setInterval()
  var chartData = [];               // Chart data (labels, values, and angles)
  var totalValue = 0;               // Total of all the values in the chart
  var canvasWidth;                  // Width of the canvas, in pixels
  var canvasHeight;                 // Height of the canvas, in pixels
  var centreX;                      // X-coordinate of centre of the canvas/chart
  var centreY;                      // Y-coordinate of centre of the canvas/chart
  var chartRadius;                  // Radius of the pie chart, in pixels
  var currentPullOutAngle = chartStartAngle;   // How many pixels the pulled-out slice is currently pulled out in the animation
  var currentPullOutSlice = -1;


  var pullOutFrameStep;                         // How many pixels to move a slice with each animation frame
  var pullOutFrameInterval = 40;                    // How long (in ms) between each animation frame
  var pullOutMaxTime = 450;                         // Max time duration of animation
  var maxPullOutAngle = 10;


  // Set things up and draw the chart
  init();


  /**
   * Set up the chart data and colours, as well as the chart and table click handlers,
   * and draw the initial pie chart
   */
  function init() {

    // Get the canvas element in the page
    canvas = $('.chart')[0];

    // Exit if the browser isn't canvas-capable
    if ( typeof canvas.getContext === 'undefined' ) return;

    // Initialise some properties of the canvas and chart
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    centreX = canvasWidth / 2;
    centreY = canvasHeight / 2;
    chartRadius = Math.min( canvasWidth, canvasHeight ) / 2 * ( chartSizePercent / 100 );


    // Grab the data from the table,
    // and assign click handlers to the table data cells

    var currentRow = -1;
    var currentCell = 0;

    $('#pieChartData td').each( function() {
      currentCell++;
      if ( currentCell == 1) {
        currentRow++;
        chartData[currentRow] = [];
        chartData[currentRow].icon = $(this).find('i').attr('class');
      }
      else if (currentCell == 2) {
        var value = parseFloat($(this).text());
        chartData[currentRow].expected = value;
        totalValue += value;
        value = value.toFixed(2);
        chartData[currentRow].value = value;
      }
      else if (currentCell == 3) {
        var spent = parseFloat($(this).text());
        chartData[currentRow].spent = spent;
      }
      else if (currentCell == 4) {
        chartData[currentRow]['icon-spent'] = $(this).find('i').attr('class');
      }

      if(currentCell == 4)
        currentCell = 0;

      $(this).data( 'slice', currentRow );

    } );


    var currentPos = 0; // The current position of the slice in the pie (from 0 to 1)

    for ( var slice in chartData ) {
      chartData[slice].startAngle = 2 * Math.PI * currentPos;
      chartData[slice].endAngle = 2 * Math.PI * ( currentPos + ( chartData[slice].value / totalValue ) );
      chartData[slice].endSpentAngle = 2 * Math.PI * ( currentPos + ( chartData[slice].spent / totalValue ) );
      currentPos += chartData[slice].value / totalValue;
    }

    startPullOut( 0 );
    $('.pie-chart').click ( handleChartClick );

  }


  /**
   * Draw the chart.
   *
   * Loop through each slice of the pie, and draw it.
   */

  function drawChart() {

    // Get a drawing context
    var context = canvas.getContext('2d');

    // Clear the canvas, ready for the new frame
    context.clearRect ( 0, 0, canvasWidth, canvasHeight );

    // Draw the background circle
    context.beginPath();
    context.arc(centreX, centreY, chartRadius-0.6, 0, 2*Math.PI);
    context.fillStyle = fillColour;
    context.fill();
    context.closePath();

    // Draw each slice of the chart, skipping the pull-out slice (if any)
    for ( var slice in chartData ) {
      drawSlice( context, slice );
    }

  }


  /**
   * Draw an individual slice in the chart.
   *
   * @param Context A canvas context to draw on
   * @param Number The index of the slice to draw
   */

  function drawSlice ( context, slice ) {

    var endPoint, actualPullOutAngle;
    var startAngle = chartData[slice].startAngle  + chartStartAngle;
    var endAngle = chartData[slice].endAngle  + chartStartAngle;

    var angle = (startAngle + endAngle) / 2;

    startX = centreX;
    startY = centreY;

    if ( slice == currentPullOutSlice ) {

      // We're pulling (or have pulled) this slice out.
      // Offset it from the pie centre, draw the text label,
      // and add a drop shadow
      endPoint = getPoint(startX, startY, chartRadius, endAngle);

      actualPullOutAngle = currentPullOutAngle + chartStartAngle;

      context.beginPath();
        context.moveTo( startX, startY );

        context.arc( startX, startY, chartRadius, startAngle, endAngle, false );

        context.lineTo( startX, startY );
        if( actualPullOutAngle >= endAngle )
          context.fillStyle = fillColourSelectedSecondary;
        else
          context.fillStyle = fillColourSelectedPrimary;
        context.fill();
      context.closePath();

      context.beginPath();
        context.moveTo( startX, startY );

        context.arc( startX, startY, chartRadius, startAngle, actualPullOutAngle, false );

        context.lineTo( startX, startY );
        if( actualPullOutAngle >= endAngle )
          context.fillStyle = fillColourSelectedSecondTransp;
        else
          context.fillStyle = fillColourSelectedSecondary;
        context.fill();
      context.closePath();

    }
    else {

      // This slice isn't pulled out, so draw it from the pie centre
      startX = centreX;
      startY = centreY;

      endPoint = getPoint(startX, startY, chartRadius, endAngle);

      // Draw the slice
      context.beginPath();
      context.moveTo( endPoint[0], endPoint[1] );

      context.lineTo( startX, startY );

      // Draw the slice border if not selected
      context.lineWidth = sliceBorderWidth;
      context.strokeStyle = sliceBorderStyle;
      context.stroke();

      context.closePath();

    }

  }



  /**
   * Process mouse clicks in the chart area.
   *
   * If a slice was clicked, toggle it in or out.
   * If the user clicked outside the pie, push any slices back in.
   *
   * @param Event The click event
   */

  function handleChartClick ( clickEvent ) {

    // Get the mouse cursor position at the time of the click, relative to the canvas
    var mouseX = clickEvent.pageX - $('.chart').offset().left;
    var mouseY = clickEvent.pageY - $('.chart').offset().top;

    // Was the click inside the pie chart?
    var xFromCentre = mouseX - centreX;
    var yFromCentre = mouseY - centreY;
    var distanceFromCentre = Math.sqrt( Math.pow( Math.abs( xFromCentre ), 2 ) + Math.pow( Math.abs( yFromCentre ), 2 ) );

    if ( distanceFromCentre <= chartRadius ) {

      // Yes, the click was inside the chart.
      // Find the slice that was clicked by comparing angles relative to the chart centre.

      var clickAngle = (Math.atan2( yFromCentre, xFromCentre )) - (chartStartAngle - (2 * Math.PI));
      if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;

      for ( var slice in chartData ) {
        var startAngleAux = chartData[slice].startAngle;
        var endAngleAux = chartData[slice].endAngle;

        if ( clickAngle >= startAngleAux && clickAngle <= endAngleAux ) {

          // Slice found. Pull it out or push it in, as required.
          toggleSlice ( slice );
          var index = parseInt(slice)+1;
          $('.detail-header .section-header.actived').removeClass('actived');
          $('#section-header'+index).addClass('actived');
          return;
        }
      }
    }
  }

    /**
     * Push a slice in or out.
     *
     * If it's already pulled out, push it in. Otherwise, pull it out.
     *
     * @param Number The slice index (between 0 and the number of slices - 1)
     */
    function toggleSlice ( slice ) {
      if ( slice != currentPullOutSlice ) {
        startPullOut ( slice );
      }
    }


    /**
     * Start pulling a slice out from the pie.
     *
     * @param Number The slice index (between 0 and the number of slices - 1)
     */
    function startPullOut ( slice ) {

      // Exit if we're already pulling out this slice
      if ( currentPullOutSlice == slice ) return;

      // Record the slice that we're pulling out, clear any previous animation, then start the animation
      currentPullOutSlice = slice;
      currentPullOutAngle = chartData[slice].startAngle;
      maxPullOutAngle = chartData[slice].endSpentAngle;
      pullOutFrameStep = ((maxPullOutAngle - currentPullOutAngle) * pullOutFrameInterval) / pullOutMaxTime;

      $('.pie-chart .icons-container').html('');
      for(var s in chartData)
        drawIcon( s );

      clearInterval( animationId );
      animationId = setInterval( function() { animatePullOut( slice ); }, pullOutFrameInterval );

    }


    /**
    * Draw a frame of the pull-out animation.
    *
    * @param Number The index of the slice being pulled out
    */

   function animatePullOut ( slice ) {

     // Pull the slice out some more
     currentPullOutAngle += pullOutFrameStep;

     // If we've pulled it right out, stop animating
     if ( currentPullOutAngle >= maxPullOutAngle ) {
       clearInterval( animationId );
       return;
     }

     // Draw the frame
     drawChart();
   }


  function getPoint(x, y, radius, angle) {
    return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
  }

  function drawIcon( slice ) {

    var startAngle = chartData[slice].startAngle  + chartStartAngle;
    var endAngle = chartData[slice].endAngle  + chartStartAngle;
    var angle = (startAngle + endAngle) / 2;

    var midPoint = getPoint(centreX, centreY, (chartRadius/2)+10, angle);

    var icon;
    if( slice == currentPullOutSlice )
      icon = chartData[slice]['icon-spent'];
    else
      icon = chartData[slice].icon;

    var x =  midPoint[0];
    var y = midPoint[1];

    var container = $('.pie-chart .icons-container');
    var elem = $('.'+icon);
    var sizeX = parseInt(elem.css('padding-left').replace("px", "")) + parseInt(elem.css('padding-right').replace("px", ""));
    var sizeY = parseInt(elem.css('padding-top').replace("px", "")) + parseInt(elem.css('padding-bottom').replace("px", ""));
    var html = container.html();
    var x2, y2;

    x2 = canvasWidth - (x + sizeX/2);
    y2 = y - sizeY/2;



    html += '<i class="'+ icon +'" style="right: '+ x2 +'px; top: '+ y2 +'px;"></i>';
    container.html(html);
  }

}
