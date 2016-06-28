//variable for remembering which sparkline is clicked
var clicked_spark_index = 0;

$(document).ready(function() {
		minYear = 1992; 												//we have the data beginning from 1992
		maxYear = new Date().getFullYear(); 							// current Year
		maxFrequency = 23;
		
		data = data_timeline[0]; 										//initial data to be shown on a timeline;
		show_timeline(); 												//function from timeline.js, builds a timeline
		$('.barChart:eq(0) > rect.background').css('opacity', '0.4'); 	//make the background for the first sparkline blue
		
		/****when hover on the year - it is highlighted with yellow, and the corresponding
		* years on sparklines as well
		************/
		$('.chart > rect').mouseover(function(){
			var mouseoverClass = ($(this).attr('class')).split(' ',2);
			console.log(mouseoverClass);
			$('.background'+'.'+mouseoverClass[1]).css('fill', 'yellow').css('opacity','0.4');
		});
		$('.chart > rect').mouseout(function(){
			var mouseoverClass = ($(this).attr('class')).split(' ',2);
			$('.background'+'.'+mouseoverClass[1]).css('opacity','0');
			$('.barChart:eq('+clicked_spark_index+') > rect.background').css('opacity', '0.4').css('fill','#439cee');
		});

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
				drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
				
		});
		$('.sparkline').mouseout(function(){
				$('.hlt_gray').addClass('highlight_it').removeClass('hlt_gray');
				redrawTimeline();							
		});
		
		/*hide the last 'normalizing' rectangle from a sparkline*/
		for (var i=0;i<5;i++){
			$('.barChart:eq('+i+') > .bar > rect').slice(25,26).css('opacity', '0');
		}
		
		/******************************************************************/
		/**on mousover on the underlined words that make yellow higlight***/
		/**on sparklines***************************************************/
		/******************************************************************/	
		$('.first-90').mouseover(function(){ //mousover on first-90
			yellowHiglighting(1990, 1999, 0, 'on');
		});
		$('.first-90').mouseout(function(){
			yellowHiglighting(1990, 1999, 0, 'out');
		});
		
		$('.since-2002').mouseover(function(){ //mousover on since-2002
			yellowHiglighting(2002, 2016, 2, 'on');
		});
		$('.since-2002').mouseout(function(){
			yellowHiglighting(2002, 2016, 2, 'out');
		});
		
		$('.by-2010').mouseover(function(){//mousover on by 2010
			yellowHiglighting(2010, 2016, 3, 'on');
		});
		$('.by-2010').mouseout(function(){
			yellowHiglighting(2010, 2016, 3, 'out');
		});
		
		$('.recently-adj').mouseover(function(){ //mouseover on a keyword recently
			yellowHiglighting(2008, 2016, 4, 'on');
		});
		$('.recently-adj').mouseout(function(){
			yellowHiglighting(2008, 2016, 4, 'out');
		});
		
		$('.new-20-per-year').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[6];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
			yellowHiglighting(2010, 2016, 0, 'on');
		});
		$('.new-20-per-year').mouseout(function(){
			yellowHiglighting(2010, 2016, 0, 'out');		
		});
		/******************************************************************/
		/***mouseover on keywords that change timeline*********************/
		/******************************************************************/
		$('.adj-matrix').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[4];	
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');			
		});
		
		$('.node-link-only').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[5];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
		});
		
		$('.hybrid').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[3];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
		});
		
		$('.timeline-based').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[2];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
		});

		$('.anim-based').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[1];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
		});
		
		$('.technique').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[7];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');	
		});
		
		$('.application').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[8];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
		});
		
		$('.evaluation').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[9];
			drawFrequencyBars(chart, barWidth, publicationHeight, data2, 'black', '0.5');				
		});
		
		$('.keyword').mouseout(function(){
			redrawTimeline();
		});
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
* Makes/hides highlighting on a sparkline and a big timeline
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