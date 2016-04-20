
function pointChart() {

    var chartData           = [];
    var chartFutureData     = [];
    var colorGridChart      = '#e2e3e4';
    var colorAxisLineChart  = '#d5d5d5';
    var colorTickChart      = '#556270';
    var colorBandChart      = '#ebebeb';
    var colorBackground     = '#f8f9f9';
    var colorPrimaryChart   = '#F79D25';
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

        $('#pointChartData td').each( function() {
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
        expecteds = expecteds.slice(0, expecteds.length-1);
        expecteds.push(
        {
            y: chartData[chartData.length-1].expected,
            marker: {
                radius: 5,
                lineWidth: 1,
                lineColor: colorFontChart
            }
        });
        var spents = toArray('spent');
        spents = spents.slice(0, spents.length-2);
        spents.push({
            y: chartData[chartData.length-2].spent,
            marker: {
                radius: 20,
                lineWidth: 10,
                lineColor: colorBackground,
                symbol: 'url(images/icon-point-ellipse.png)'
            }
        });
        if (getMaxValue(spents) > maximum)
            maximum = getMaxValue(spents);

        $('#point-chart').highcharts({
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
                            return '<span style="fill: '+colorPrimaryChart+';">' + this.value + '</span>';
                        } else {
                            return this.value;
                        }
                    },
                    style: {
                        fontSize:'12px',
                        fontFamily: 'AkkuratStd',
                        color: colorFontChart
                    }
                },
                plotBands: [{
                    color: colorBandChart,   // Color value
                    from: 12.5,              // Start of the plot band
                    to: 14.5                 // End of the plot band
                }]
            },
            yAxis: {
                title: '',
                lineColor: colorAxisLineChart,
                lineWidth: 1,
                max: maximum * 1.1,
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

                //backgroundColor: "rgba(255,255,255,0)",
                //borderWidth: 0,
                //borderRadius: 0,
                //shadow: false,
                useHTML: true,
                formatter: function () {
                    var clase, nombre, valor, number_decimal;

                    if      ( this.point.color == colorPrimaryChart )
                        clase = 'gasto-real';
                    else if ( this.point.color == colorSecondaryChart )
                        clase = 'presupuestos-mensuales';
                    else
                        clase = 'prevision-futuro';

                    if ( this.series.data.indexOf( this.point ) == expecteds.length-1 )
                        nombre = 'Previsión futuro';
                    else
                        nombre = this.series.name;

                    number_decimal = this.point.y.toString().split('.');
                    if ( number_decimal.length > 1 )
                        valor = numberWithThousandsSeparator(number_decimal[0]) + ',' + number_decimal[1];
                    else
                        valor = numberWithThousandsSeparator(number_decimal[0]);

                    return '<div class="tooltip-box '+clase+'">'+ nombre + '<br />' + valor + ' €<br />' + '</div>';
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
            series: [{
                name: 'Presupuesto Mensual',
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
                name: 'Gasto Real',
                data: spents,
                color: colorPrimaryChart,
                marker: {
                    radius: 5,
                    lineWidth: 2,
                    lineColor: colorBackground
                }
            }]
        });
    }

    function applyTheme() {
        // Load the fonts
        Highcharts.createElement('link', {
           href: '//fonts.googleapis.com/css?family=Dosis:400,600',
           rel: 'stylesheet',
           type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

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
                tickPosition: 'inside'
            },
            plotOptions: {
                candlestick: {
                    lineColor: colorGridChart
                }
            }
        };
        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
    }
}
