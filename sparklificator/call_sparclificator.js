var data_sparkline=[];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];

data1=numb_per_year(1990,2015,bib);
data2=count_2keywords(1989,new Date().getFullYear(),['paradigm:node-link','time:animation'],bib);
data3=count_1keyword(2002,new Date().getFullYear(),'time:timeline',bib);
data4=count_1keyword(2010,new Date().getFullYear(),'animated_timeline',bib);
data5=count_1abstract(2013,new Date().getFullYear(),'adjacency matrix',bib);

/*create a data for a sparkline
as an array with 5 rows, each row contains a matrix 
2x1 = years and number of publications*/
data_sparkline.push(data1);
data_sparkline.push(data2);
data_sparkline.push(data3);
data_sparkline.push(data4);
data_sparkline.push(data5);

/*function to get array for years to comparre with
  and array for number of articles, where number of articles is stored*/
function year_array(start_year, end_year){
	var array = []; //array to store number of articles for each year
	var years = []; //array to store list of years to compare with
	years[0]=start_year; //set the first year
			
	for(var i=1;i<(end_year-start_year+1);i++) //full-year array with years from (strat_year to end_year)+1
		years[i]=years[i-1]+1;
			
	//make all the values = 0 in an array
	for(var i=0;i<years.length;i++)
		array[i]=0;
	
	return [years, array];
}

/*function to count how many articles were published in each year*/
function numb_per_year(start_year,end_year,bib){
	var years = []; //array for years we compare with
	var array = []; //array for number of article we counted while comparing
	years =	year_array(start_year, end_year)[0];
	array =	year_array(start_year, end_year)[1];

	//search for articles in each year
	for (var i=0;i<years.length;i++)
		for (var el in bib)
			if(bib[el].year==years[i])
				array[i]+=1;
	
	//an array to make an array with objects so that I can do a barchart later
	var arr = [];
	var len = array.length;
	for (var i = 0; i < len; i++) {
		arr.push({
			key: years[i],
			value: array[i]
		});
	}
	
	return arr;
}

/*function to count how many articles were published in each year & 
  with the specific keyword*/
function count_1keyword(start_year,end_year,keyword,bib){
	var years = []; //array for years we compare with
	var array = []; //array for number of article we counted while comparing
	years =	year_array(start_year, end_year)[0];
	array =	year_array(start_year, end_year)[1];

	//search for articles in each year
	for (var i=0;i<years.length;i++)
		for (var el in bib)
			if((bib[el].year==years[i])&&(bib[el].keywords.indexOf(keyword)>=0))
				array[i]+=1;
			
	//an array to make an array with objects so that I can do a barchart later
	var arr = [];
	var len = array.length;
	for (var i = 0; i < len; i++) {
		arr.push({
			key: years[i],
			value: array[i]
		});
	}

	return arr;
}

/*function to count how many articles were published 
with two keywords*/
function count_2keywords(start_year,end_year,keywords,bib){
	var years = []; //array for years we compare with
	var array = []; //array for number of article we counted while comparing
	years =	year_array(start_year, end_year)[0];
	array =	year_array(start_year, end_year)[1];

	//search for articles in each year
	for (var i=0;i<years.length;i++)
		for (var el in bib)
			if((bib[el].year==years[i])&&(bib[el].keywords.indexOf(keywords[0])>=0)&&(bib[el].keywords.indexOf(keywords[1])>=0))
				array[i]+=1;
			
	//an array to make an array with objects so that I can do a barchart later
	var arr = [];
	var len = array.length;
	for (var i = 0; i < len; i++) {
		arr.push({
			key: years[i],
			value: array[i]
		});
	}

	return arr;
}

/*function to count how many articles were published in each year & 
  with the specific words in abstract*/
function count_1abstract(start_year,end_year,keyword,bib){
	var years = []; //array for years we compare with
	var array = []; //array for number of article we counted while comparing
	years =	year_array(start_year, end_year)[0];
	array =	year_array(start_year, end_year)[1];

	//search for articles in each year
	for (var i=0;i<years.length;i++)
		for (var el in bib)
			if((bib[el].year==years[i])&&(bib[el].abstr.indexOf(keyword)>=0))
				array[i]+=1;
		
	//an array to make an array with objects so that I can do a barchart later
	var arr = [];
	var len = array.length;
	for (var i = 0; i < len; i++) {
		arr.push({
			key: years[i],
			value: array[i]
		});
	}
	
	return arr;
}

//form sparklines in a loop
$('.spanToBarChart').each(function(i)
	{ 
		var data_var=data_sparkline[i].map(function(a) {return a.value;});
		//var spark_width=data_sparkline[i].length; //for determining width for each sparkline individually
		var spark_width = 2016-1990;
		var settings = {data: data_var, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, width:spark_width*5, height: 25};
	
		$(this).sparklificator();
		$(this).sparklificator('option', settings);
	});
