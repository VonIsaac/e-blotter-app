// Load Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawLineChart);



// for line Chart
function drawLineChart() {
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Theft', 'Robbery', 'Physical Injury', 'Accident', 'Mischief'],
    ['Aug', 25, 100, 21, 25, 27],
    ['Sept', 25, 10, 20.5, 35, 40],
    ['Oct', 37, 11.2, 15, 15, 10],
    ['Nov', 10.3, 8, 7.4, 14, 9.5]
  ]);

  var options = {
    title: 'MONTHLY CASE',
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    vAxis: {
      title: 'Cases',
      viewWindow: { min: 0, max: 50 },
      ticks: [0, 10, 20, 30, 40, 50]
    },
    colors: ['#7D7DFF', '#3333FF', '#9797FF', '#9797CC', '#0000A3', '#000082']
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}

