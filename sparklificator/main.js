/* when clicking on a sparkline - do an action*/
var flag = 0; 
$(document).ready(function() {
        $('.sparkline').click(function() {
			if (flag<1){
				$('#big-chart').show();
				show_timeline();
				flag++;
			}
			else{
				$('#big-chart').hide();
				flag--;
			}
        });
    });