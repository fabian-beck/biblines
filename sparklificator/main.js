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
		$('.barChart:eq(0) > rect.background').css('opacity', '0.4');
		
		$('.chart > rect').mouseover(function(){
			alert('Mouseover!');
		});

        $('.sparkline').click(function() {
				
				clicked_spark_index = $('.sparkline').index( this ); //get the index of a sparkline that was clicked
				
				/*DO IT WITH SELECTORS!!!!!!!!!!!!!*/
				/*highlight the sparkline which is selected*/
				$('.barChart > rect.background').css('opacity', '0');
				if (clicked_spark_index==0){						
					$('.barChart:eq(0) > rect.background').css('opacity', '0.4').css('fill','#439cee');
				}
				else if (clicked_spark_index==1){
					$('.barChart:eq(1) > rect.background').css('opacity', '0.4').css('fill','#439cee');
				}
				else if (clicked_spark_index==2){
					$('.barChart:eq(2) > rect.background').css('opacity', '0.4').css('fill','#439cee');
				}
				else if (clicked_spark_index==3){
					$('.barChart:eq(3) > rect.background').css('opacity', '0.4').css('fill','#439cee');
				}
				else{
					$('.barChart:eq(4) > rect.background').css('opacity', '0.4').css('fill','#439cee');
				}
				
				//give the appropriate dataset (according to the sparkline that was clicked)
				//to the global variable in the timeline.js (line 1)
				data = data_timeline[clicked_spark_index];			
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
				drawFrequencyBars(chart, barWidth, publicationHeight, data2);				
				//show_timeline(); //function from timeline.js
				
		});
		$('.sparkline').mouseout(function(){
				$('.for').addClass('highlight_it').removeClass('for');
				data2 = [];
				show_timeline(); //function from timeline.js				
		});
		
		/*hide the last 'normalizing' rectangle*/
		$('.barChart:eq(0) > .bar > rect').slice(25,26).css('opacity', '0');
		$('.barChart:eq(1) > .bar > rect').slice(25,26).css('opacity', '0');
		$('.barChart:eq(2) > .bar > rect').slice(25,26).css('opacity', '0');
		$('.barChart:eq(3) > .bar > rect').slice(25,26).css('opacity', '0');
		$('.barChart:eq(4) > .bar > rect').slice(25,26).css('opacity', '0');
		
		/******************************************************************/
		/**on mousover on the underlined words*****************************/
		/******************************************************************/	
		$('.first-90').mouseover(function(){ //mousover on first-90
			$('.barChart:eq(0) > rect.background').slice(0,10).css('fill', 'yellow').css('opacity','0.4');
		});
		$('.first-90').mouseout(function(){
			if (clicked_spark_index==0){
				$('.barChart:eq(0) > rect.background').slice(0,10).css('fill','#439cee');
				}
			else{
				$('.barChart:eq(0) > rect.background').slice(0,10).css('opacity','0');
				}
		});
		
		$('.since-2002').mouseover(function(){ //mousover on since-2002
			$('.barChart:eq(2) > rect.background').slice(11,25).css('fill', 'yellow').css('opacity','0.4');
		});
		$('.since-2002').mouseout(function(){
			if (clicked_spark_index==2){
				$('.barChart:eq(2) > rect.background').slice(11,25).css('fill','#439cee');
				}
			else{
				$('.barChart:eq(2) > rect.background').slice(11,25).css('opacity','0');
				}
		});
		
		$('.by-2010').mouseover(function(){//mousover on by 2010
			$('.barChart:eq(3) > rect.background').slice(18,25).css('fill', 'yellow').css('opacity','0.4');
		});
		$('.by-2010').mouseout(function(){
			if (clicked_spark_index==3){
				$('.barChart:eq(3) > rect.background').slice(18,25).css('fill','#439cee');
				}
			else{
				$('.barChart:eq(3) > rect.background').slice(18,25).css('opacity','0');
				}
		});
		
		$('.recently-adj').mouseover(function(){ //mouseover on a keyword recently
			$('.barChart:eq(4) > rect.background').slice(16,25).css('fill', 'yellow').css('opacity','0.4');
		});
		$('.recently-adj').mouseout(function(){
			if (clicked_spark_index==4){
				$('.barChart:eq(4) > rect.background').slice(16,25).css('fill','#439cee');
				}
			else{
				$('.barChart:eq(4) > rect.background').slice(16,25).css('opacity','0');
				}
		});
		
		$('.adj-matrix').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[4];				
			show_timeline(); //function from timeline.js
		});
		$('.adj-matrix').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.node-link-only').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[5];				
			show_timeline(); //function from timeline.js
		});
		$('.node-link-only').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.hybrid').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[3];				
			show_timeline(); //function from timeline.js
		});
		$('.hybrid').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.timeline-based').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[2];				
			show_timeline(); //function from timeline.js
		});
		$('.timeline-based').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.anim-based').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[1];				
			show_timeline(); //function from timeline.js
		});
		$('.anim-based').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.new-20-per-year').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[6];				
			show_timeline(); //function from timeline.js
			$('.barChart:eq(0) > rect.background').slice(18,26).css('fill', 'yellow').css('opacity','0.4');
		});
		$('.new-20-per-year').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js
			if (clicked_spark_index==0){
				$('.barChart:eq(0) > rect.background').slice(18,26).css('fill','#439cee');
				}
			else{
				$('.barChart:eq(0) > rect.background').slice(18,26).css('opacity','0');
				}			
		});
		
		$('.technique').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[7];				
			show_timeline(); //function from timeline.js
		});
		$('.technique').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.application').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[8];				
			show_timeline(); //function from timeline.js
		});
		$('.application').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
		
		$('.evaluation').mouseover(function(){ //mousover on a keyword adjacency matrix
			data2 = data_timeline[9];				
			show_timeline(); //function from timeline.js
		});
		$('.evaluation').mouseout(function(){
			data2 = [];
			show_timeline(); //function from timeline.js	
		});
	

    });