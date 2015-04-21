google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Number of cigarettes');
//    data.addColumn('number', 'Energy Level');


    data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 2],
        [{v: [9, 0, 0], f: '9 am'}, 3],
        [{v: [10, 0, 0], f: '10 am'}, 2],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 6],
        [{v: [13, 0, 0], f: '1 pm'}, 2],
        [{v: [14, 0, 0], f: '2 pm'}, 1],
//        [{v: [15, 0, 0], f: '3 pm'}, 8],
//        [{v: [16, 0, 0], f: '4 pm'}, 9],
//        [{v: [17, 0, 0], f: '5 pm'}, 10],
    ]);

    var options = {
        trendlines: {
            0: {type: 'linear', lineWidth: 5, opacity: .3},
            1: {type: 'exponential', lineWidth: 10, opacity: .3}
        },
        width: 568,
        height: 270,
        hAxis: {
            title: 'Time of Day',
            format: 'h:mm a'
        },
        vAxis: {
            title: 'Numbers of cigarettes'
        }
    };

    var chart = new google.visualization.ColumnChart(
            document.getElementById('ex6'));

    chart.draw(data, options);
}