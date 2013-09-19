  $(document).ready(function(){
      $.jqplot.config.enablePlugins = true;
     var s1 =    [20,   10,  10,  10,  10,  10,  15,  18,  18,  25,  25,  30,  50,  50,  50,  55,  40,  25,  18,  18,  15,  10,  10,  10];
     var ticks = ['08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07']; 

    var datas = [];
     for(t in s1){
             datas[t]=[ticks[t],s1[t]]; 
     }
      var plot2 = $.jqplot('chartTiempoDeEspera', [datas,datas], {
        // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
        animate: !$.jqplot.use_excanvas,
         seriesDefaults:
        {
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
                //highlightMouseOver: '#000',
                barMargin: '1',
                barPadding: '1',
                highlightColors: '#009EE0',
                highlightMouseOver: true
            },
            pointLabels: { show: true },
            shadow: false,
            //showMarker: true,
             markerRenderer: $.jqplot.MarkerRenderer,    // renderer to use to draw the data
             // point markers.
            markerOptions: {
            show: true,             // wether to show data point markers.
            style: 'filledSquare',  // circle, diamond, square, filledCircle.
            // filledDiamond or filledSquare.
            lineWidth: 0,       // width of the stroke drawing the marker.
            size: 3,            // size (diameter, edge length, etc.) of the marker.
            color: '#C4DFF2',    // color of marker, set to color of line by default. C4DFF2
            shadow: true,       // wether to draw shadow on marker or not.
            shadowAngle: 45,    // angle of the shadow.  Clockwise from x axis.
            shadowOffset: 1,    // offset from the line of the shadow,
            shadowDepth: 1,     // Number of strokes to make when drawing shadow.  Each stroke
            // offset by shadowOffset from the last.
            shadowAlpha: 0.5   // Opacity of the shadow
            }

        },
        seriesColors: ['#708800'],
        series:[{renderer:$.jqplot.BarRenderer}, {xaxis:'x2axis', yaxis:'y2axis'}],
        axesDefaults: {
            showTicks: false,
            showTickMarks: false,     
            tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
            tickOptions: {
              angle: 0
            }
        },
        axes: {
         // xaxis: {
       //     renderer: $.jqplot.CategoryAxisRenderer
        //  },
          x2axis: {
            renderer: $.jqplot.CategoryAxisRenderer//,
            //ticks:ticks
          },
          yaxis: {
            autoscale:true,
            ticks:['']

          },
          y2axis: {
            autoscale:true,
             tickOptions:{
                    showGridline: false
            }   

          }
        },
        highlighter: {
        tooltipAxes: 'yx',
        useAxesFormatters: true,
        tooltipContentEditor:tooltipContentEditor,
        sizeAdjust: 20.5
        },
        grid: {
        drawGridLines: true,        // wether to draw lines across the grid or not.
        gridLineColor: '#ffffff',    // *Color of the grid lines.
        background: '#EFF4FA',      // CSS color spec for background color of grid.
        borderColor: '#9B9F9E',     // CSS color spec for border around grid.
        borderWidth: 0.5,           // pixel width of border around grid.
        shadow: true,               // draw a shadow for grid.
        shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
        shadowOffset: 0.5,          // offset from the line of the shadow.
        shadowWidth: 2,             // width of the stroke for the shadow.
        shadowDepth: 2,             // Number of strokes to make when drawing shadow.
                                    // Each stroke offset by shadowOffset from the last.
        shadowAlpha: 0.07           // Opacity of the shadow
        }
      });

    function tooltipContentEditor(str, seriesIndex, pointIndex, plot) {
    // display series_label, x-axis_tick, y-axis value
    var texto =  plot2.data[seriesIndex][pointIndex][1]+"min de espera a las " + plot2.data[seriesIndex][pointIndex][0]+":00";
    return texto;
    }
});
