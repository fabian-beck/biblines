var data1=[];

data1=numb_per_year(1990,6,bib);
console.log(data1);

/*function to count how many articles were published in each year 
  starting from start_year and ending with start_year+period-1  */
function numb_per_year(start_year,period,bib)
{
	var array = []; //array to store number of articles for each year
	var years = []; //array to store list of years to compare with
	years[0]=start_year; //set the first year
			
	for(var i=1;i<period;i++) //full year-array with years from strat_year to start_year+(period-1)
		years[i]=years[i-1]+1;
			
	//make all the values = 0 in an array
	for(var i=0;i<years.length;i++)
		array[i]=0;

	for (var i=0;i<years.length;i++)
		for (var el in bib)
			if(bib[el].year==years[i])
				array[i]+=1;
			
	return(array);
}


