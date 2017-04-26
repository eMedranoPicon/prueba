
function pointChart(chartContainer) {
  var chartData           = [];
  var chartFutureData     = [];
  var colorGridChart      = '#e2e3e4';
  var colorAxisLineChart  = '#d5d5d5';
  var colorTickChart      = '#556270';
  var colorBackground     = '#f8f9f9';
  var colorPrimaryChart   = '#70a41c';
  var colorSecondaryChart = '#b7bdc2';
  var colorTerciaryChart  = '#ffffff';
  var colorFontChart      = '#556270';

  init();

  function init() {
    getPointChartData();
    applyTheme();
    drawPointChart();
  }

  function getPointChartData() {
    var expected, spent, currentRow, currentCell;
    currentRow = -1;
    currentCell = 0;

    chartContainer.find('.chart__data td').each( function() {
      currentCell++;
      if ( currentCell == 1) {
        currentRow++;
        chartData[currentRow] = [];
        chartData[currentRow].mes = $(this).text();
      }
      else if (currentCell == 2) {
        expected = parseFloat($(this).text());
        chartData[currentRow].expected = expected;
      }
      else if (currentCell == 3) {
        spent = parseFloat($(this).text());
        chartData[currentRow].spent = spent;
      }

      if(currentCell == 3)
        currentCell = 0;

    });

    chartData[chartData.length-1].spent = null;
  }

  function toArray(columnName) {
    var aux = [];
    for(var i=0; i<chartData.length; i++) {
      aux[i] = chartData[i][columnName];
    }
    return aux;
  }

  function getMaxValue(array) {
    var maxValue = 0;
    for(var i in array){
      if(array[i] > maxValue)
        maxValue = array[i];
    }
    return maxValue;
  }

  function drawPointChart() {
    var meses = toArray('mes');
    var expecteds = toArray('expected');
    var maximum = getMaxValue(expecteds);
    var maxDesign = 800;
    expecteds = expecteds.slice(0, expecteds.length-2);
    expecteds.push(
    {
      y: chartData[chartData.length-2].expected,
      marker: {
        radius: 5,
        lineWidth: 1,
        lineColor: colorFontChart
      }
    });
    var spents = toArray('spent');
    spents = spents.slice(0, spents.length-1);
    spents.push({
      y: chartData[chartData.length-1].spent,
      marker: {
        radius: 20,
        lineWidth: 10,
        lineColor: colorBackground,
        symbol: 'url(images/icon-point-ellipse.png)'
      }
    });
    if (getMaxValue(spents) > maximum)
      maximum = getMaxValue(spents);

    maximum = maximum * 1.2;

    if (maximum < maxDesign-100) {
      maximum = maxDesign;
    }

    chartContainer.find('.chart').highcharts({
      credits: {
        enabled: false
      },
      chart: {
        backgroundColor: colorBackground
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: meses,
        lineColor: colorAxisLineChart,
        lineWidth: 1,
        minPadding: 0.5,
        tickmarkPlacement: 'on',
        tickPosition: 'inside',
        tickAmmount: 50,
        labels: {
          formatter: function () {
            if (meses[meses.length-2] === this.value && !this.isFirst ) {
              return '<span class="test" style="fill: '+colorPrimaryChart+';">' + this.value + '</span>';
            } else {
              return this.value;
            }
          },
          style: {
            fontSize:'12px',
            fontFamily: 'AkkuratStd',
            color: colorFontChart
          }
        }
      },
      yAxis: {
        title: '',
        lineColor: colorAxisLineChart,
        lineWidth: 1,
        max: maximum,
        tickmarkPlacement: 'on',
        tickPosition: 'inside',
        labels: {
          format: '{value:,.0f}',
          style: {
            fontSize: '12px',
            fontFamily: 'AkkuratStd',
            color: colorFontChart
          }
        },
        plotLines: [{
          value: 0,
          width: 1
        }]
      },
      tooltip: {
        valueDecimals: 2,
        pointFormat: '{point.y:,.2f} €',
        valueSuffix: '€',

        backgroundColor: "rgba(255,255,255,0)",
        borderWidth: 0,
        borderRadius: 0,
        shadow: false,
        useHTML: true,
        /*
            Function that draws the tooltip for every case
         */
        formatter: function () {
          var valor, number_decimal;

          number_decimal = this.point.y.toString().split('.');
          if ( number_decimal.length > 1 )
            valor = numberWithThousandsSeparator(number_decimal[0]) + ',' + number_decimal[1];
          else
            valor = numberWithThousandsSeparator(number_decimal[0]);

          return '<div class="tooltip-box">'+ meses[this.point.x] + '<br />' + valor + ' €<br /><b class="border-triangle triangle"></b><b class="triangle"></b></div>';
        }
      },
      legend:{ enabled:false },
      plotOptions: {
        line: {
          lineWidth: 10,
          marker: {
            symbol: 'circle'
          }
        },
        series: {
          lineWidth: 1
        }
      },
      series: [
        {
          data: expecteds,
          color: colorSecondaryChart,
          zoneAxis: 'x',
          zones: [{
            value: 12
          }, {
            value: 13,
            dashStyle: 'dot'
          }, {
            value: 14,
            color: colorTerciaryChart,
            marker: {
              radius: 5,
              lineWidth: 2,
              lineColor: colorPrimaryChart
            }
          }],
          marker: {
            radius: 5,
            lineWidth: 2,
            lineColor: colorBackground
          }
        }, {
          data: spents,
          color: colorPrimaryChart,
          marker: {
            radius: 5,
            lineWidth: 2,
            lineColor: colorBackground
          }
        }
      ]
    });
  }

  function applyTheme() {
    // Load the fonts

    Highcharts.theme = {
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      },
      xAxis: {
        gridLineWidth: 1,
        gridLineColor: colorGridChart,
        tickColor: colorTickChart,
        tickWidth: 1,
        tickLength: 3,
        tickPosition: 'inside',
        minPadding: 0
      },
      yAxis: {
        gridLineWidth: 1,
        gridLineColor: colorGridChart,
        minorGridLineWidth: 0,
        tickInterval: 100,
        tickColor: colorTickChart,
        tickWidth: 1,
        tickLength: 3,
        tickPosition: 'inside',
        min: 100
      },
      plotOptions: {
        candlestick: {
          lineColor: colorGridChart,
          pointStart: 0
        }
      }
    };
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);
  }

  function numberWithThousandsSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
