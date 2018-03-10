

getSenseIn();
getSenseOut();

function getSenseIn(){
    $.ajax({
            url: '/sensein/',
            type: 'get',
            dataType: 'json',
            success: function (data) {
            temperaturaIn = new Array();
            umidadeIn = new Array();
              for(var i in data){
                timestamp = convertToTimestamp(data[i].time);
                temperaturaIn.push([timestamp, data[i].temperatura]);
                umidadeIn.push([timestamp, data[i].umidade]);
              }

    Highcharts.stockChart('temperatura_interna', {
         /*   title: {
                  text: name
                  },*/

          series:[{
            name: 'temperatura',
            data: temperaturaIn,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            }
          }],
                chart: {
                events: {
                    load: function () {
                    //set up the updating of the chart each second
                     var t = this;
                    var series = this.series;
                    var length = series.length;
                        setInterval(function () {
                            $.ajax({
                                url: '/lastsensein/',
                                type: 'get',
                                dataType: 'json',
                                success: function (data) {
                                    temperatura = new Array();
                                    timestamp = convertToTimestamp(data.time);
                                    temperatura.push([timestamp, data.temperatura]);
                                    series[0].addPoint([timestamp, temperatura], true, true);

                                }
                            })
                        },10000);
                    }
                }
            },

            rangeSelector: {
              buttons: [{
                  count: 3,
                  type: 'day',
                  text: '3D'
              },{
                  count: 1,
                  type: 'week',
                  text: '1S'
              }, {
                  count: 1,
                  type: 'month',
                  text: '1M'
              }, {
                  type: 'all',
                  text: 'all'
              }],
              selected: 1
          },
           yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        }
    });

          }
        });
}

function getSenseInLast(){
    $.ajax({
        url: '/lastsensein/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            timestamp = convertToTimestamp(data.time);
            temperatura.push([timestamp, data.temperatura]);
            umidade.push([timestamp, data.umidade]);
            }
        })
    };


function getSenseOutLast(){
    $.ajax({
        url: '/lastsenseout/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            timestamp = convertToTimestamp(data.time);
            temperatura.push([timestamp, data.temperatura]);
            umidadeOut.push([timestamp, data.umidade]);
          }
      })
    };


function getSenseOut(){
    $.ajax({
        url: '/senseout/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            temperaturaOut = new Array();
            umidadeOut = new Array();
            for(var i in data){
                timestamp = convertToTimestamp(data[i].time);
                temperaturaOut.push([timestamp, data[i].temperatura]);
                umidadeOut.push([timestamp, data[i].umidade]);
            }

             Highcharts.stockChart('temperatura_externa', {
         /*   title: {
                  text: name
                  },*/
          series:[{
            name: 'temperatura',
            data: temperaturaOut,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            }
          }],
                chart: {
                events: {
                    load: function () {
                    //set up the updating of the chart each second
                     var t = this;
                    var series = this.series[0];
                    var length = series.length;
                        setInterval(function () {
                            $.ajax({
                                url: '/lastsensout/',
                                type: 'get',
                                dataType: 'json',
                                success: function (data) {
                                    timestamp = convertToTimestamp(data.time);
                                    temperatura = (data.temperatura);
                                    series.addPoint([timestamp, temperatura], true, true);

                                }
                            })
                        },10000);
                    }
                }
            },

            rangeSelector: {
              buttons: [{
                  count: 3,
                  type: 'day',
                  text: '3D'
              },{
                  count: 1,
                  type: 'week',
                  text: '1S'
              }, {
                  count: 1,
                  type: 'month',
                  text: '1M'
              }, {
                  type: 'all',
                  text: 'all'
              }],
              selected: 1
          },
           yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        }
    });

      }
    });
}



function grafico(serie1,serie2, local, name){
    if (local == 'interno'){
        url =   '/lastsensein/';
    }else{
        url = '/lastsenseout/';
    }
    Highcharts.stockChart(local, {
         /*   title: {
                  text: name
                  },*/

          series:[{
            name: 'Temperatura',
            data: serie1,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            }
          }],
                chart: {
                events: {
                    load: function () {
                    //set up the updating of the chart each second
                        var t = this;
            var series = this.series;
            var length = series.length;
                        setInterval(function () {
                            $.ajax({
                                url: url,
                                type: 'get',
                                dataType: 'json',
                                success: function (data) {
                                    temperatura = new Array();
                                    timestamp = convertToTimestamp(data.time);
                                    temperatura.push([timestamp, data.temperatura]);
                                    series[0].addPoint([timestamp, temperatura], true, true);

                                }
                            })
                        },10000);
                    }
                }
            },

            rangeSelector: {
              buttons: [{
                  count: 3,
                  type: 'day',
                  text: '3D'
              },{
                  count: 1,
                  type: 'week',
                  text: '1S'
              }, {
                  count: 1,
                  type: 'month',
                  text: '1M'
              }, {
                  type: 'all',
                  text: 'all'
              }],
              selected: 1
          },
           yAxis: {
            title: {
                text: 'Temperature (°C) e  Umidade %'
            }
        }
    });
  }

function convertToTimestamp(time){
          dateTimeParts = time.split(' ');
          timeParts = dateTimeParts[1].split(':');
          dateParts = dateTimeParts[0].split('-');
          date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);

          return date.getTime();
}