google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

// creat a function and stored the all chart in obj format
function drawCharts() {
  drawDonutChart();
  drawPieChart();
}

// donut chart
function drawDonutChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Vicar Village', 11],
    ['Eat', 2],
    ['NBP RESERVATION', 3],
    ['Kamela Homes', 3],
    ['Katarungan Village', 7],
  ]);

  var options = {
    title: 'COMMON CRIME CASES',
    pieHole: 0.4,
    backgroundColor: 'transparent',
    slices: {
        0: {   color: '#7D7DFF' }, 
        1: {  color: '#3333FF' },  
        2: {  color: '#9797FF' },  
        3: {  color: '#9797CC' },  
        4: {  color: '#0000A3' }   
      }
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

//pie chart
function drawPieChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['THEFT', 11],
    ['Eat', 2],
    ['MALICIOUS MISCHIEF', 2],
    ['PHYSICAL INJURY', 2],
    ['VEHICULAR ACCIDENT', 7],
    ['ACT OF LASCIVIOUSNESS', 2]
  ]);

  var options = {
    title: 'WEEKLY CASES',
    backgroundColor: 'transparent',
    colors: ['#7D7DFF', '#3333FF', '#9797FF', '#9797CC', '#0000A3', '#000082']
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}


