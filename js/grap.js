

async function getSummary() {
  try{
    const response = await fetch('http://localhost/e-blotter-backend/summary');

    if(!response.ok){
      throw new Error(`This is an HTTP error: The status is ${response.status}`);
    }

    const data = await response.json()
    console.log(data)
    // pass the donut fn
    drawDonutChart(data)
  }catch(err){
    console.log(err)
  }
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

// creat a function and stored the all chart in obj format
function drawCharts() {
  getSummary()
  drawPieChart();
}

// donut chart
function drawDonutChart(data) {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Total Complains', data.total_complaints],
    ['Ongoing Complains', data.ongoing_complaints],
    ['Resolve Conplains', data.resolved_complaints],
    ['New Complain Today', data.new_complaints_today],
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


