var data = [];
var data2 = []; 
var chart;
var barWidth;
var publicationHeight;

var height = 100;
var maxFrequency; //= 20;

var niceIntervals = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
var maxYearIntervals = 10;
var maxFrequencyIntervals = 5;

var minYear;
var maxYear;

function show_timeline(){
	//create id and class for div "big-chart"
	$('<div>', {
                id: 'timeline',
                class: 'toggle-container'
    }).appendTo($('#big-chart'));
	
	var displayHeight = height;
	var timelineDiv = $('#timeline');
	timelineDiv.empty();

	$('<div>', {
		class: 'label',
        text: 'publications per year'
    }).appendTo(timelineDiv);
			
	drawTimeline(displayHeight, timelineDiv);
}


function drawTimeline(displayHeight, timelineDiv) {
	
        chart = d3.select('#timeline').append('svg')
            .attr('class', 'chart')
            .style('border', '1px solid black')
            .attr('height', displayHeight + 'px');
        var width = timelineDiv.width() - 3;
        chart.attr('width', width + 'px');
        barWidth = width / (maxYear - minYear + 1);
        publicationHeight = height / (maxFrequency + 1);

        drawBackground(barWidth, chart, displayHeight, publicationHeight, width);
		drawFrequencyBarsOver(chart, barWidth, publicationHeight, data2);
        drawFrequencyBars(chart, barWidth, publicationHeight, data);		
}

function drawBackground(barWidth, chart, displayHeight, publicationHeight, width) {
        var yearIntervalIndex = 0;
        while (yearIntervalIndex < niceIntervals.length - 1 && (maxYear - minYear) / niceIntervals[yearIntervalIndex] > maxYearIntervals) {
            yearIntervalIndex++;
        }
        var yearIntervalLength = niceIntervals[yearIntervalIndex];
        for (var intervalYear = minYear - minYear % yearIntervalLength; intervalYear <= maxYear; intervalYear += yearIntervalLength) {
            var x = (intervalYear - minYear) * barWidth;
            var even = intervalYear % (2 * yearIntervalLength) == 0 ? 'Even' : 'Uneven';
            chart.append('rect').attr('class', 'period' + even)
                .attr('shape-rendering', 'crispEdges')
                .attr('x', x)
                .attr('y', -1)
                .attr('width', yearIntervalLength * barWidth)
                .attr('height', displayHeight + 2)
                .style('fill', even == 'Even' ? '#FFFFFF' : '#CCCCCC');
            chart.append('text').attr('class', 'period' + even)
                .attr('x', x + 1)
                .attr('y', height / 5).text(intervalYear)
                .style('font-size', '14pt')
                .style('fill', even != 'Even' ? '#FFFFFF' : '#CCCCCC');
        }
        var frequencyIntervalIndex = 0;
        while (frequencyIntervalIndex < niceIntervals.length - 1 && maxFrequency / niceIntervals[frequencyIntervalIndex] > maxFrequencyIntervals) {
            frequencyIntervalIndex++;
        }
        var frequencyIntervalLength = niceIntervals[frequencyIntervalIndex];
        for (var i = frequencyIntervalLength; i <= maxFrequency; i += frequencyIntervalLength) {
            var y = height - publicationHeight * i;
            chart.append('line')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)
                .style('stroke', 'black')
                .attr('shape-rendering', 'crispEdges')
                .attr('stroke-opacity', 0.15)
                .style('stroke-width', '1px');
            chart.append('text')
                .attr('x', 0)
                .attr('y', y + 12)
                .style('font-size', '12pt')
                .text(i);
        }
        return {x: x, y: y};
}

function drawFrequencyBars(chart, barWidth, publicationHeight, data) {
	chart.selectAll('svg').data(data).enter().append('rect')
            .style('fill', 'black') 
			.style('opacity', '0.5')
            .attr('shape-rendering', 'crispEdges')
            .attr('x', function (d) {
                return (d.key - minYear) * barWidth;
            })
            .attr('y', function (d) {
                return height - publicationHeight * d.value-1;
            })
            .attr('width', barWidth-2.5)
            .attr('height', function (d) {
                return publicationHeight * d.value + 1;
            })
            .attr('class', function (d) { //add class for each year on the timeline
                return d.key;
            }); 
}

function drawFrequencyBarsOver(chart, barWidth, publicationHeight, data) {
	chart.selectAll('svg').data(data).enter().append('rect')
            .style('fill', '#666060')
			.style('opacity', '0.7')
            .attr('shape-rendering', 'crispEdges')
            .attr('x', function (d) {
                return (d.key - minYear) * barWidth;
            })
            .attr('y', function (d) {
                return height - publicationHeight * d.value-1;
            })
            .attr('width', barWidth-2.5)
            .attr('height', function (d) {
                return publicationHeight * d.value + 1;
            })
			.attr('class', function (d) { //add class for each year on the timeline
                return d.key;
            }); 
}
