var data = [];
var data2 = []; 
var chart;
var barWidth;
var publicationHeight;

var height = 100;

var niceIntervals = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
var maxYearIntervals = 10;
var maxFrequencyIntervals = 5;

function show_timeline(){
	//create id and class for div "big-chart"
	$('<div>', {
                id: 'timeline'
                //class: 'toggle-container'
    }).appendTo($('#big-chart'));
	
	var displayHeight = height;
	var timelineDiv = $('#timeline');
	timelineDiv.empty();

	$('<div>', {
		class: 'label',
        text: 'Publications per year'
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
		
	/*Draw rectangles for highlighting the background of a sparkline
	when you hover on a specific words in text.
	Result: builds background rectangles for each year*/
	for (var year = minYear; year < maxYear+1; year++) {
		var x = (year - minYear) * barWidth;
		chart.append('rect').attr('class', 'background '+ year)
            .attr('shape-rendering', 'crispEdges')
            .attr('x', x)
            .attr('y', -1)
            .attr('width', barWidth)
            .attr('height', height + 2)
            .style('fill', '#439cee')
			.style('opacity',0);
	}
        return {x: x, y: y};
}

//color='#5c5b5b'
function drawFrequencyBars(chart, barWidth, publicationHeight, data, color='#5e5b5b', opacity='1') {
	chart.selectAll('svg').data(data).enter().append('rect')
            .style('fill', color) 
			.style('opacity', opacity)
            .attr('shape-rendering', 'crispEdges')
            .attr('x', function (d) {
                return (d.key - minYear) * barWidth;
            })
            .attr('y', function (d) {
                return height - publicationHeight * d.value-1;
            })
            .attr('width', barWidth-2.5)
            .attr('height', function (d) {
				if (d.value!=0)
				{
					return publicationHeight * d.value+1;
				}
				else return publicationHeight * d.value;
            })
			.attr('title', function (d) {
				return d.key + ': '+d.value + ' publications';
			})
            .attr('class', function (d) { //add class for each year on the timeline
                return 'bar_timeline '+d.key;
            }); 
}