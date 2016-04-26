/* when clicking on a sparkline - do an action*/
var flag = 0; 
var clicked_spark_index = 0;
$(document).ready(function() {
        $('.sparkline').click(function() {
			if (flag<1){
				$('#big-chart').show();
				
				clicked_spark_index = $('.sparkline').index( this );
				console.log("That was element with index " + clicked_spark_index );
	
				maxFrequency = Math.max.apply(Math,data_sparkline[clicked_spark_index].map(function(a) {return a.value;}));
				
				data = data_sparkline[clicked_spark_index];
				console.log('maxFrequency='+maxFrequency);		

				minYear = data[0].key;
				maxYear = data[data.length-1].key;				

				show_timeline();
				flag++;
			}
			else{
				$('#big-chart').hide();
				flag--;
			}
        });
    });