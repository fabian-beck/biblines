/**
* D3 Renderers version v1.0.1
*
* (c) 2014 Pascal Goffin, Wesley Willett, Jean-Daniel Fekete, and Petra Isenberg
*
* http://inria.github.io/sparklificator
*
* Released under MIT license.
**/


/**
* Builds a classic sparkline (word-scale visualization) without or with interaction.
* this.element and this.options is alvailable in the renderer if needed
* @param {string} sparkSpan - the container where the word-scale visualization is placed
* @param {int} width - width of the word-scale visualization
* @param {int} height - height of the word-scale visualization
* @param {boolean} interaction - hover interaction for this word-scale visualization or not
* @param {array} data - word-scale visualization's array of data
**/
function classicSparkline(sparkSpan, width, height, interaction, data) {

	var circleRadius = 3;
	var o = this.options;

	var margin = {top: 0, right: 0, bottom: 0, left: 0},
	    widthVis = width - margin.left - margin.right,
	    heightVis = height - margin.top - margin.bottom;

	var sparkContainer = d3.select(sparkSpan.get(0));
	sparkContainer.append('svg');

	var x = d3.scale.linear()
		.domain([0, data.length-1])
	    .range([0, widthVis-circleRadius]);

	var y = d3.scale.linear()
	    .domain([0, d3.max(data, function(d) { return d })])
		.range([heightVis-circleRadius, circleRadius]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient('bottom');

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient('left');

	var line = d3.svg.line()
	    .x(function(d, i) { return x(i); })
	    .y(function(d) { return y(d); });

	var chart = sparkContainer.select('svg')
			.style('position', 'absolute')
			.attr('width', widthVis + 'px')
			.attr('height', heightVis + 'px');

	
	// select sparklificatedSPAN, as the entity might be longer than the word-scale visualization
	var entity = $(sparkSpan).closest($('.sparklificated'));
	if (interaction) {
		entity.on('mouseover', fade(1))
			  .on('mouseout', fade(0.1));
	}

 
	var gChart = chart.append('g')
	    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	gChart.append('g')
    	.attr('class', 'x axis')
    	.attr('transform', 'translate(0,' + heightVis + ')');

	gChart.append('g')
    	.attr('class', 'y axis');

	gChart.append('path')
    	.datum(data)
    	.attr('class', 'sparkline')
	    .attr('d', line)
	    .style('fill', 'none')
	    .style('stroke', 'grey')
	    .style('stroke-width', '2px');

	gChart.append('circle')
		.style('fill', 'red')
		.attr('r', circleRadius)
		.attr('cx', x(data.length - 1))
		.attr('cy', y(data[data.length - 1]));

	if (!interaction) {
		gChart.style('opacity', 1.0);
	} else {
		gChart.style('opacity', 0.1);
	}


	// Returns an event handler for fading in the sparkline graph.
	function fade(opacity) {
	    return function(g, i) {
			chart.select('g')
				.transition()
				.style('opacity', opacity);

			var textOpacity = 0.25;
			if (opacity == 0.1) { textOpacity = 1; }

			d3.select($(sparkSpan).siblings('.entity')[0]).style('opacity',textOpacity)
	    };
	}
}


/**
* Builds a bar chart (word-scale visualization)
* this.element and this.options is alvailable in the renderer if needed
* @param {string} sparkSpan - the container where the word-scale visualization will be put in
* @param {int} width - width of the word-scale visualization
* @param {int} height - height of the word-scale visualization
* @param {boolean} interaction - hover interaction for this word-scale visualization or not
* @param {array} data - word-scale visualization's array of data
**/
function barChart(sparkSpan, width, height, interaction, data) {
	var o = this.options;

	var margin = {top: 0, right: 0, bottom: 0, left: 0},
	    widthVis = width - margin.left - margin.right,
	    heightVis = height - margin.top - margin.bottom;

	var barWidth = 4.3;

	// clipping data array
	var newData = data;
	var newLength = Math.floor(width/barWidth);
	if (newLength < data.length) {
		newData = data.slice(0,newLength);
	}

	var sparkContainer = d3.select(sparkSpan.get(0));
	sparkContainer.append('svg');

	var y = d3.scale.linear()
		.domain([0, maxNumbPubl+2])
		.range([0, heightVis]);

	var chart = sparkContainer.select('svg')
		.style('position', 'absolute')
		.attr('width', widthVis)
		.attr('height', heightVis)
		.attr('class', 'barChart')
		
	drawBackground(barWidth, chart, height, width);

				
	// select sparklificatedSPAN, as the entity might be longer than the word-scale visualization
	var entity = $(sparkSpan).closest($('.sparklificated'));
	if (interaction) {
		entity.on('mouseover', fade(1))
			  .on('mouseout', fade(0.1));
	}

	var bar = chart.selectAll('g.bar')
			.data(newData);
	

	var gBar = bar.enter().append('g')
		.attr('class', 'bar')
		.attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',' + (heightVis - y(d)) + ')'; });

	gBar.append('rect')
	    .attr('width', barWidth-2) //-2 - to make the bars thiner
	    .attr('height', function(d) { return y(d); });


	if (!interaction) {
		gBar.select('rect').style('opacity', 1.0);
	} else {
		gBar.select('rect').style('opacity', 0.1);
	}

	bar.attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',' + (heightVis - y(d)) + ')'; });
	bar.select('rect').attr('height', function(d) { return y(d); });

	bar.exit().remove();


	// Returns an event handler for fading in the sparkline graph.
	function fade(opacity) {
	    return function(g, i) {
			chart.selectAll('rect')
				.transition()
				.style('opacity', opacity);

			var textOpacity = 0.25;
			if (opacity == 0.1) { textOpacity = 1; }

			d3.select($(sparkSpan).siblings('.entity')[0]).style('opacity',textOpacity)
	    };
	}
	
	
}

/**
* Draws a timeline-background for the sparkline
* this.element and this.options is alvailable in the renderer if needed
* @param {int} barWidth - width of a single bar in a sparkline
* @param {string} chart - chart we are going to add a background to
* @param {int} height - height of the word-scale visualization
* @param {int} width - width of the word-scale visualization
**/
function drawBackground(barWidth, chart, height, width) {
	var maxYear = 2016;
	var minYear = 1992;
	var niceIntervals = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
	var maxYearIntervals = 10;
	var maxFrequencyIntervals = 5;
	
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
                .attr('height', height + 2)
                .style('fill', even == 'Even' ? '#FFFFFF' : '#CCCCCC');
        }

	/*Draw rectangles for highlighting the background of a sparkline
	when you hover on a specific words in text.
	Result: builds background rectangles for each year*/
	for (var year = minYear; year <= maxYear+1; year++) {
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
}


/**
* Builds a pie chart (word-scale visualization)
* this.element and this.options is alvailable in the renderer if needed
* @param {string} sparkSpan - the container where the word-scale visualization will be put in
* @param {int} width - width of the word-scale visualization
* @param {int} height - height of the word-scale visualization
* @param {boolean} interaction - hover interaction for this word-scale visualization or not
* @param {array} data - word-scale visualization's array of data
**/
function pieChart(sparkSpan, width, height, interaction, data) {

	var o = this.options;

	var margin = {top: 0, right: 0, bottom: 0, left: 0},
	    widthVis = width - margin.left - margin.right,
	    heightVis = height - margin.top - margin.bottom;

	var radius = Math.min(widthVis, heightVis) / 2;

	var color = d3.scale.ordinal()
    	.range(["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"]);

	// clipping data array
	var newData = data;
	if (data.length > 6) {
		newData = data.slice(0,6);
	}

	var arc = d3.svg.arc()
	    .outerRadius(radius - 2)
	    .innerRadius(0);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d; });

	var sparkContainer = d3.select(sparkSpan.get(0));
	sparkContainer.append('svg');

	var chart = sparkContainer.select('svg')
		.style('position', 'absolute')
	    .attr('width', widthVis)
	    .attr('height', heightVis);


	// select sparklificatedSPAN, as the entity might be longer than the word-scale visualization
	var entity = $(sparkSpan).closest($('.sparklificated'));
	//var entity = $(sparkSpan).siblings($('.entity'));
	if (interaction) {
		entity.on('mouseover', fade(1))
			  .on('mouseout', fade(0.1));
	}


	var gChart = chart.append('g')
	    .attr('transform', 'translate(' + widthVis / 2 + ',' + heightVis / 2 + ')');

	var g = gChart.selectAll('.arc')
			.data(pie(newData))
		.enter().append('g')
		.attr('class', 'arc');

	g.append('path')
		.attr('d', arc)
		// .style('stroke', 'black')
	 //    .style('stroke-width', '2px');
	    .style("fill", function(d, i) { return color(i); });


	if (!interaction) {
		chart.selectAll('path').style('opacity', 1.0);
	} else {
		chart.selectAll('path').style('opacity', 0.1);
	}


	// Returns an event handler for fading in the sparkline graph.
	function fade(opacity) {
	    return function(g, i) {
			chart.selectAll('path')
				.transition()
				.style('opacity', opacity);

			var textOpacity = 0.25;
			if (opacity == 0.1) { textOpacity = 1; }

			d3.select($(sparkSpan).siblings('.entity')[0]).style('opacity',textOpacity)
	    };
	}
}