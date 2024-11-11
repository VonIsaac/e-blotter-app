// for column chart
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(columnChart);
function columnChart() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Theft', 'Robbery', 'Physical Injury', 'Mischief', 'Lasciviousness', 'Accident'],
        ['Jan', 500, 400, 200, 300, 500, 350],
        ['Feb', 500, 45, 230, 320, 500, 350],
        ['Mar', 500, 400, 200, 300, 550, 450],
        ['Apr', 500, 400, 200, 300, 500, 350],
        ['May', 500, 400, 1300, 300, 500, 350],
        ['Jun', 500, 400, 200, 300, 500, 350],
        ['Jul', 500, 400, 200, 300, 500, 350],
        ['Aug', 500, 400, 200, 300, 500, 350],
        ['Sept', 500, 400, 200, 300, 500, 350],
        ['Oct', 500, 400, 200, 300, 500, 350],
        ['Nov', 500, 400, 200, 300, 500, 350],
        ['Dec', 200, 200, 100, 300, 300, 250],
      ]);

  
    var options = {
      chart: {
        title: 'YEARLY CASE',
      },
      backgroundColor: 'transparent',
      hAxis: { textStyle: { color: 'black' } },
      vAxis: { 
        textStyle: { color: 'black' },
        
      },
      legend: { textStyle: { color: 'black' } },
      titleTextStyle: { color: 'black' },
      series: {
        0: { color: '#7D7DFF' },  // Theft bar color
        1: { color: '#3333FF' },  // Robbery bar color
        2: { color: '#9797FF' },  // Physical Injury bar color
        3: { color: '#9797CC' },  // Mischief bar color
        4: { color: '#0000A3' },  // Lasciviousness bar color
        5: { color: '#000082' },  // Accident bar color
      }
    };
  
    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
  
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }