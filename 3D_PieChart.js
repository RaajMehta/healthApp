google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Monday', 11],
        ['Tuesday', 2],
        ['Wednesday', 2],
        ['Thursday', 2],
        ['Friday', 7],
        ['Weekends', 7]
    ]);

    var options = {
        title: 'Weekly Breakdown',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}