
var formata = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
/*
      var data = [
      {"id":1,"temperatura":22.4,"umidade":60.0,"luz":0,"time":"2018-02-12 12:50:14"},
      {"id":5,"temperatura":22.0,"umidade":75.0,"luz":0,"time":"2018-02-13 15:57:24"},
      {"id":6,"temperatura":32.0,"umidade":55.0,"luz":0,"time":"2018-02-14 16:17:14"},
      {"id":7,"temperatura":12.0,"umidade":85.0,"luz":0,"time":"2018-02-15 16:17:48"},
      {"id":8,"temperatura":42.0,"umidade":45.0,"luz":0,"time":"2018-02-16 16:19:33"},
      {"id":9,"temperatura":22.0,"umidade":55.0,"luz":0,"time":"2018-02-17 16:20:07"},
      {"id":11,"temperatura":33.5,"umidade":66.0,"luz":0,"time":"2018-02-18 16:36:00"},
      {"id":12,"temperatura":23.5,"umidade":76.0,"luz":0,"time":"2018-02-19 16:40:19"},
      {"id":13,"temperatura":43.5,"umidade":86.0,"luz":0,"time":"2018-02-20 16:40:36"},
      {"id":14,"temperatura":15.5,"umidade":56.0,"luz":0,"time":"2018-02-21 16:53:55"},
      {"id":15,"temperatura":45.5,"umidade":66.0,"luz":0,"time":"2018-02-22 16:55:07"}
      ].map(function (d) {
          d.time = formata(d.time);
          return d;
      });
*/
    var sensein, senseout;

$.ajax({
    url: '/sensein/',
    type: 'get',
    dataType: 'json',
    success: function (data) {
    console.log(data);
    sensein = data.map(function (d) {
        d.time = formata(d.time);
            return d;
        });

    domain = [ sensein[0].time, sensein.slice(-1)[0].time ];

    var ndx = crossfilter(data);

      dimension = ndx.dimension(function (d) { return d.time; }),
      groupTemp = dimension.group().reduceSum(function(d) { return d.temperatura; });
      groupUmi = dimension.group().reduceSum(function(d) { return d.umidade; });

      var lineChart = dc.lineChart("#lineChart");
      var lineChart2 = dc.lineChart("#lineChart2");
      var rangeChart = dc.lineChart('#range-chart')
      var rangeChart2 = dc.lineChart('#range-chart2')

      var pieChart = dc.pieChart("#pieChart");

      rangeChart
        .height(40)
        .width(600)
        .dimension(dimension)
        .group(groupTemp)
        .brushOn(true)
        .x(d3.time.scale().domain(domain))
        .xUnits(d3.time.month);

      lineChart
        .interpolate('basis-close')
        .evadeDomainFilter(true)
        .height(150)
        .width(600)
        .dimension(dimension)
        .group(groupTemp)
        .elasticY(true)
        .rangeChart(rangeChart)
        .x(d3.time.scale().domain(domain))
        .xUnits(d3.time.minute)
        .yAxisLabel('Temperatura')
        .brushOn(false)
        .mouseZoomable(true)
        .zoomScale([1, 100])
        .zoomOutRestrict(true)
        .transitionDuration(50)
        .renderVerticalGridLines(true)
        .renderHorizontalGridLines(true);



        rangeChart2
        .height(40)
        .width(600)
        .dimension(dimension)
        .group(groupUmi)
        .brushOn(true)
        .x(d3.time.scale().domain(domain))
        .xUnits(d3.time.month);

      lineChart2
        .interpolate('basis-close')
        .evadeDomainFilter(true)
        .height(150)
        .width(600)
        .dimension(dimension)
        .group(groupUmi)
        .elasticY(true)
        .rangeChart(rangeChart2)
        .x(d3.time.scale().domain(domain))
        .xUnits(d3.time.minute)
        .yAxisLabel('Umidade')
        .brushOn(false)
        .mouseZoomable(true)
        .zoomScale([1, 100])
        .zoomOutRestrict(true)
        .transitionDuration(50)
        .renderVerticalGridLines(true)
        .renderHorizontalGridLines(true);

        pieChart
            .width(200)
            .height(100)
            .dimension(dimension)
            .group(groupTemp);

      dc.renderAll();
    },
    failure: function(data) {
        alert('Got an error dude');
    }
    });