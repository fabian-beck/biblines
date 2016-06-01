/* when clicking on a sparkline - do an action*/
var clicked_spark_index = 0;
$(document).ready(function() {
		/******************************************************************/
		/**for hovering on the sparklines and getting changes on a timeline*/
		/******************************************************************/
		minYear = 1992;
		maxYear = 2016;
		maxFrequency = 23;
		data = data_timeline[0];
		show_timeline(); //function from timeline.js
        $('.sparkline').click(function() {
				
				clicked_spark_index = $('.sparkline').index( this ); //get the index of a sparkline that was clicked
				
				//get the maxFrequency of publications for the chosen data
				//maxFrequency = Math.max.apply(Math,data_sparkline[clicked_spark_index].map(function(a) {return a.value;}));
				
				
				//give the appropriate dataset (according to the sparkline that was clicked)
				//to the global variable in the timeline.js (line 1)
				data = data_timeline[clicked_spark_index];		
				
				//define appropriate min and max Year for the global variables
				//from timeline.js, lines 10,11
				//minYear = data[0].key;
				//maxYear = data[data.length-1].key;	
				show_timeline(); //function from timeline.js
        });
		
		/******************************************************************/
		/**on mousover highlight the sentence that corresponds to a sparkline*/
		/******************************************************************/
		$('.sparkline').mouseover(function(){
				/*index for the element of the class "sparkline"*/
				var index=$('.sparkline').index( this );
				$('.highlight_it').eq(index).addClass('for').removeClass('highlight_it');
				
                data2 = data_timeline[index];				
				show_timeline(); //function from timeline.js
				
		});
		$('.sparkline').mouseout(function(){
				$('.for').addClass('highlight_it').removeClass('for');
				data2 = [];
				show_timeline(); //function from timeline.js				
		});
		
		$('.barChart:eq(0) > .bar:lt(1) > rect').css('fill', 'white');
		$('.barChart:eq(1) > .bar:lt(1) > rect').css('fill', 'white');
		$('.barChart:eq(2) > .bar:lt(1) > rect').css('fill', 'white');
		$('.barChart:eq(3) > .bar:lt(1) > rect').css('fill', 'white');
		$('.barChart:eq(4) > .bar:lt(1) > rect').css('fill', 'white');
		//$('.barChart > .bar > rect').css('fill', 'white');
		/******************************************************************/
		/**on mousover on the underlined words*****************************/
		/******************************************************************/	
		$('#first-90').mouseover(function(){
			$('.barChart:eq(0) > .bar > rect').slice(1,11).css('fill', 'red');
		});
		$('#first-90').mouseout(function(){
			$('.barChart:eq(0) > .bar > rect').slice(1,11).css('fill', 'black');
		});
		
		$('#since-2002').mouseover(function(){
			$('.barChart:eq(2) > .bar > rect').slice(21,27).css('fill', 'red');
		});
		$('#since-2002').mouseout(function(){
			$('.barChart:eq(2) > .bar > rect').slice(21,27).css('fill', 'black');
		});
    });
