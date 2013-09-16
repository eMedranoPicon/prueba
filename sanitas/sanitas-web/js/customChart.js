/*
  $(document).ready(function ()
  {
    $.jqplot('chartTiempoDeEspera',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
  });
*/
  $(document).ready(function(){
        $.jqplot.config.enablePlugins = true;
        var s1 = [2, 6, 7, 10];
        var ticks = ['a', 'b', 'c', 'd'];

        plot1 = $.jqplot('chartTiempoDeEspera', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
           // animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
            highlighter: { show: false }
        });
/*
        $('#chartTiempoDeEspera').bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
                $('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );


         $('#chart2').bind('jqplotDataHighlight',
            function (ev, seriesIndex, pointIndex, data) {
                $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );

        $('#chart2').bind('jqplotDataUnhighlight',
            function (ev) {
                $('#info2').html('Nothing');
            }
        );

        */
    });
