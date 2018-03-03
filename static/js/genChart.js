var formata = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
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

        function resetDimensionFilter (dimension) {
            dimension.filter(null);
            ndx.remove();
        }
    },
    failure: function(data) {
        alert('Got an error dude');
    }
    });


 setInterval(function() {
        console.log("data refresh");
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

            }
        });
        },300000);