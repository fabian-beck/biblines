/* when clicking on a sparkline - do an action*/
var flag = 0; 
var clicked_spark_index = 0;
$(document).ready(function() {
        $('.sparkline').click(function() {
			if (flag<1){
				$('#big-chart').show();
				
				clicked_spark_index = $('.sparkline').index( this ); //get the index of a sparkline that was clicked
				
				//get the maxFrequency of publications for the chosen data
				maxFrequency = Math.max.apply(Math,data_sparkline[clicked_spark_index].map(function(a) {return a.value;}));
				
				//give the appropriate dataset (according to the sparkline that was clicked)
				//to the global variable in the timeline.js (line 1)
				data = data_sparkline[clicked_spark_index];		
				
				//define appropriate min and max Year for the global variables
				//from timeline.js, lines 10,11
				minYear = data[0].key;
				maxYear = data[data.length-1].key;				

				show_timeline(); //function from timeline.js
				flag++;
			}
			else{
				$('#big-chart').hide();
				flag--;
			}
        });
		
		/*on mousover highlight the sentence that corresponds to a sparkline*/
		$('.sparkline').mouseover(function(){
				/*index for the element of the class "sparkline"*/
				var index=$('.sparkline').index( this );
				$('.highlight_it').eq(index).addClass('for').removeClass('highlight_it');
		});
		$('.sparkline').mouseout(function(){
				$('.for').addClass('highlight_it').removeClass('for');				
		});
    });