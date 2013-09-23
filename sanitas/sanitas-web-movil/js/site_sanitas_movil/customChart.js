      $(window).bind("load", function() {         
         chartData('a');
      });

      $('#espSelector').change(function() {
        $( "#chartTiempoDeEspera" ).empty();
       chartData($('#espSelector').val());
      });

      $('#daySelector').change(function() {
        $( "#chartTiempoDeEspera" ).empty();
       chartData($('#daySelector').val());
      });

    function chartData(datos)
     {
     $.jqplot.config.enablePlugins = true;
     var valores = [];
     var TICKS = ['08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07']; 

     /* Datos Especialidades*/
     var defaults_v =    [15,  15,  15,  15,  15,  15,  20,  20,  20,  20,  20,  25,  40,  40,  45,  45,  40,  25,  18,  18,  15,  10,  10,  10];
     var medicina_v =    [20,  10,  10,  10,  10,  10,  15,  18,  18,  25,  25,  30,  50,  50,  50,  55,  40,  25,  18,  18,  15,  10,  10,  10];
     var pediatria_v =   [30,  25,  10,  20,  15,  30,  15,  10,  10,  20,  35,  30,  40,  40,  50,  50,  30,  25,  18,  18,  15,  10,  10,  10];
     var ginecologia_v = [20,  20,  10,  10,  10,  20,  10,  10,  15,  30,  35,  35,  50,  50,  40,  40,  40,  20,  15,  15,  10,   5,   5,   5];
     var trauma_v =      [20,  20,  10,  10,  25,  30,  25,  20,  30,  10,  15,  20,  30,  40,  45,  50,  45,  30,  20,  20,  15,  10,  10,  15];

       /* Datos Especialidades*/
     var lunes_v =       [10,  15,  15,  10,  10,  15,  20,  20,  20,  20,  20,  25,  40,  40,  40,  45,  40,  25,  20,  18,  15,  10,  10,  10];
     var martes_v =      [10,  10,  10,  5,  5,  10,  15,  18,  18,  25,  25,  30,  50,  50,  55,  55,  40,  25,  20,  18,  15,  10,  10,  10];
     var miercoles_v =   [10,  25,  10,  15,  20,  30,  15,  10,  10,  20,  35,  30,  40,  40,  45,  50,  30,  25,  20,  18,  15,  10,  10,  10];
     var jueves_v = [10,  20,  10,  10,  15,  20,  10,  10,  15,  30,  35,  35,  50,  50,  40,  45,  40,  20,  15,  10,  10,   5,   5,   5];
     var viernes_v =     [10,  20,  10,  15,  20,  30,  25,  20,  30,  10,  15,  20,  30,  40,  50,  50,  45,  30,  15,  20,  15,  10,  10,  15]; 
     var sabado_v =      [10,  15,  15,  15,  15,  15,  20,  20,  20,  20,  20,  25,  40,  40,  40,  45,  40,  25,  20,  18,  15,  10,  10,  10];
     var domingo_v =     [15,  10,  10,  10,  10,  10,  15,  18,  18,  25,  25,  30,  50,  50,  55,  55,  40,  25,  20,  18,  15,  10,  10,  10];


      switch(datos)
      {
      /*Especialidades*/
      case 'ginecologia':
        valores = ginecologia_v;
        break;
      case 'pediatria':
        valores = pediatria_v;
        break;
      case 'trauma':
      valores = trauma_v;
      break;
      case 'medicina':
      valores = medicina_v;
      break;
      /*Especialidades*/      
      case 'lunes':
        valores = lunes_v;
        break;
      case 'martes':
        valores = martes_v;
        break;
      case 'miercoles':
      valores = miercoles_v;
      break;
      case 'jueves':
      valores = jueves_v;
      break;
      case 'viernes':
        valores = viernes_v;
        break;
      case 'sabado':
        valores = sabado_v;
        break;
      case 'domingo':
      valores = domingo_v;
      break;
      /*default data*/
      default:
        valores = defaults_v;
        break;       
      }

    var datas = [];
     for(t in TICKS){
             datas[t]=[TICKS[t],valores[t]]; 
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
         /*xaxis: {
          autoscale: true,
          showTicks:false,
          show:false,
          renderer: $.jqplot.CategoryAxisRenderer
         },*/
          x2axis: {
            autoscale: true,
            showTicks:true,
            show:true,
            renderer: $.jqplot.CategoryAxisRenderer
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
        tooltipLocation:'n',
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
        var texto =  plot2.data[seriesIndex][pointIndex][1]+"min de espera <br> a las " + plot2.data[seriesIndex][pointIndex][0]+":00";
        return texto;
        }

       $(window).resize(function() {
        if (plot2) {
            $.each(plot2.series, function(index, series) {
                series.barWidth = undefined;
            });
            plot2.resetAxesScale(); 
            plot2.replot({resetAxes:['x2axis']});
            plot2.replot({resetAxes:true});
        }
        });

     }

$(document).ready(function(){      

});