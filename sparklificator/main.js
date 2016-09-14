//variable for remembering which sparkline is clicked
var clicked_spark_index = 0;

$(document).ready(function() {

		maxFrequency = 23;												//max number of publications we have +3
		
		data = data_timeline[0]; 										//initial data to be shown on a timeline;
		show_timeline(); 												//function from 'timeline.js', builds a timeline
		$('.barChart:eq(0) > rect.background').css('opacity', '0.4'); 	//make the background for the first sparkline blue
		$('.legend:eq(1)').hide();										//hide the second element in legend
		$('#mytooltip').hide();											//hide the tooltip
		updateMouseListeners();
		
		//action that happens when you click on a sparkline
        $('.sparkline').click(function() {
				clicked_spark_index = $('.sparkline').index( this ); //get the index of a sparkline that was clicked
				
				/*highlight the sparkline, which is clicked with the blue color */
				$('.barChart > rect.background').css('opacity', '0');
				$('.barChart:eq('+clicked_spark_index+') > rect.background').css('opacity', '0.4').css('fill','#439cee');

				//give the appropriate dataset (according to the sparkline that was clicked)
				//to the global variable in the timeline.js (line 1)
				data = data_timeline[clicked_spark_index];			
				drawFrequencyBars(chart, barWidth, publicationHeight, data); //function from the timeline.js
				
				change_first_legend(clicked_spark_index);
        });
		
		/**********************************************************************/
		/**on mousover highlight the sentence that corresponds to a sparkline**/
		/** and draw the bars from sparkline over the timeline************************/
		/**********************************************************************/
		$('.sparkline').mouseover(function(){
				/*index for the element of the class "sparkline"*/
				var index=$('.sparkline').index( this );
				$('.highlight_it').eq(index).addClass('hlt_gray').removeClass('highlight_it');
				
                data2 = data_timeline[index];	
				drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'blue', '0.5');	

				change_second_legend(index,'visible');	
		});
		$('.sparkline').mouseout(function(){
				$('.hlt_gray').addClass('highlight_it').removeClass('hlt_gray');
				redrawTimeline();		
				updateMouseListeners();
				
				var index=$('.sparkline').index( this );
				change_second_legend(index,'hidden');
		});

		/******************************************************************/
		/**on mousover on the underlined words that make yellow higlight***/
		/**on sparklines***************************************************/
		/******************************************************************/	
		$('.keyword').mouseover(function(){ //mousover on first-90
			try{
			var mouseoverClass = ($(this).attr('class')).split(' ',2)[0];
			var startYear = yellowHlDict[mouseoverClass].startYear;
			var endYear = yellowHlDict[mouseoverClass].endYear;
			var spark = yellowHlDict[mouseoverClass].spark;
			
			yellowHiglighting(startYear, endYear, spark, 'on');
			
			}catch(err){};
		});
		$('.keyword').mouseout(function(){ //mousout on first-90
			
			try{
			var mouseoverClass = ($(this).attr('class')).split(' ',2)[0];
			var startYear = yellowHlDict[mouseoverClass].startYear;
			var endYear = yellowHlDict[mouseoverClass].endYear;
			var spark = yellowHlDict[mouseoverClass].spark;
			
			
			yellowHiglighting(startYear, endYear, spark, 'out');
			}catch(err){};
		});
						
		//dictionary for the yellow highlighting
		var yellowHlDict = {
		"first-90": {
			"startYear": 1990,
			"endYear": 1999,
			"spark": 0
			},
		"since-2002": {
			"startYear": 2002,
			"endYear": 2016,
			"spark": 2
			},
		"by-2010": {
			"startYear": 2010,
			"endYear": 2016,
			"spark": 3
			},
		"recently-adj": {
			"startYear": 2008,
			"endYear": 2016,
			"spark": 4
			},
		"new-20-per-year": {
			"startYear": 2010,
			"endYear": 2016,
			"spark": 0
			}
		}			
		
		/**
		* mouseover on keywords that change timeline 
		*(draw another barchart above the existing bars)
		**/
		$('.keyword').mouseover(function(){ //mousover on a keyword adjacency matrix
			try{
			var mouseoverClass = ($(this).attr('class')).split(' ',2)[0];
			var dataIndex = legendHlDict[mouseoverClass].dataIndex;
			var legendIndex = legendHlDict[mouseoverClass].legendIndex;

			data2 = data_timeline[dataIndex];	
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'blue', '0.5');
			change_second_legend(legendIndex, 'visible');	
			
			}catch(err){};
		});

		$('.keyword').mouseout(function(){
			redrawTimeline();
			updateMouseListeners();
			change_second_legend(0, 'hidden');
		});
		
		//dictionary for the correct 
		var legendHlDict = {
		"adj-matrix": {
			"dataIndex": 4,
			"legendIndex": 4
			},
		"node-link-only": {
			"dataIndex": 5,
			"legendIndex": 1
			},
		"hybrid": {
			"dataIndex": 3,
			"legendIndex": 3
			},
		"timeline-based": {
			"dataIndex": 2,
			"legendIndex": 2
			},
		"anim-based": {
			"dataIndex": 1,
			"legendIndex": 8
			},
		"technique": {
			"dataIndex": 7,
			"legendIndex": 5
			},
		"application": {
			"dataIndex": 8,
			"legendIndex": 6
			},
		"evaluation": {
			"dataIndex": 9,
			"legendIndex": 7
			}	
		}
});

/**
* Redraws the bars on a timeline
* when we mouseout from the keyword/sparkline
* @data {array:int} - data that will be shoen on a bigtimeline as a base
* @drawFrequencyBars - function from timeline.js, line 115;
**/
function redrawTimeline()
{
	data = data_timeline[clicked_spark_index];
	$('.bar_timeline').remove(); //remove old bars on a timeline, redraw the timeline
	drawFrequencyBars(chart, barWidth, publicationHeight, data);
}

/**
* Shows/hides yellow highlighting on a sparkline and a big timeline
* when we mouseover/mouseout on a specific keyword
* @startYear {int} - the year from which we have to start the highlighting on the visualization
* @endYear {int} - the year till what we have to do the highlighting on the visualization
* @spark {int} - number of a sparkline that should have the higlight
* @mode {string} - either "on" - when we mouseover, or "out" - when we mouseout;
**/
function yellowHiglighting(startYear, endYear, spark, mode)
{
	if (mode=='on'){
		for (var i=startYear;i<=endYear;i++){
				$('.barChart:eq('+spark+') > rect.background.'+i).css('fill', 'yellow').css('opacity','0.4');
				$('.chart > rect.background.'+i).css('fill', 'yellow').css('opacity','0.4');
		}
	}
	if (mode=="out"){
		if (clicked_spark_index==spark){
			for (var i=startYear;i<=endYear;i++){
				$('.barChart:eq('+spark+') > rect.background.'+i).css('fill','#439cee');
			}
		}
		else{
			for (var i=startYear;i<=endYear;i++){
				$('.barChart:eq('+spark+') > rect.background.'+i).css('opacity','0');
			}
		}
		
		for (var i=startYear;i<=endYear;i++){
			$('.chart > rect.background.'+i).css('opacity','0');
		}
	}
}

/**
* Function updates mouse Listeners.
**/
function updateMouseListeners(){
	$('.chart > rect').mouseover(function(){
		var mouseoverClass = ($(this).attr('class')).split(' ',2);
		$('.background'+'.'+mouseoverClass[1]).css('fill', 'yellow').css('opacity','0.4');
	});
	$('.chart > rect').mouseout(function(){
		var mouseoverClass = ($(this).attr('class')).split(' ',2);
		$('.background'+'.'+mouseoverClass[1]).css('opacity','0');
		$('.barChart:eq('+clicked_spark_index+') > rect.background').css('opacity', '0.4').css('fill','#439cee');
	});
	
	/*tooltip function (when hover over bars, number of publications and years are shown)*/
	var tooltip = document.getElementById('mytooltip');
	$('.bar_timeline').mouseover(function(e){
		var title = $(this).attr('title')
		$('#mytooltip').html(title)
		$('#mytooltip').show();
		var x = e.clientX,
			y = e.clientY;
		tooltip.style.top = (y - 40) + 'px';
		tooltip.style.left = (x - 65) + 'px';
	});
	$('.bar_timeline').mouseout(function(){
		$('#mytooltip').hide();
	});	
}

/**
* Hides/shows the second entry in the legend
* which corresponds to the second barchart on a timeline
* @index {int} - index for chosing correct title to the entry (from the array 'legend_dict')
* @visibility {int} - takes two values {visible/hidden}, when mouseover or mouseout
**/
function change_second_legend(index, visibility){
	var legend_dict = ['current state','node-link diagrams','timeline-based alternative','hybrid techniques','adjacency matrices',
						'technique', 'application', 'evaluation', 'animation-based approaches' ];
	
	$('.legend:eq(1)').html('<div id="square-second"></div> - '+legend_dict[index]);
	if (visibility=='visible')
	{
		$('.legend:eq(1)').show();
	}
	else
		$('.legend:eq(1)').hide();
}

/**
* Changes the first entry in the legend
* which corresponds to the first barchart on the timeline, the one that represents clicked sparkline
* @index {int} - index for chosing correct title to the entry (from the array 'legend_dict')
**/
function change_first_legend(index)
{
	var legend_dict = ['current state','node-link diagrams','timeline-based alternative','hybrid techniques','adjacency matrices'];
	$('.legend:eq(0)').html('<div id="square-main"></div> - '+legend_dict[index]);
}



