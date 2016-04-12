var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];

data1=numb_per_year(1990,1995,bib);
data2=count_2keywords(1989,new Date().getFullYear(),['paradigm:node-link','time:animation'],bib);
data3=count_1keyword(2002,new Date().getFullYear(),'time:timeline',bib);
data4=count_1keyword(2010,new Date().getFullYear(),'animated_timeline',bib);
data5=count_1abstract(2013,new Date().getFullYear(),'adjacency matrix',bib);


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
			
	return array;
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
			
	return array;
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
			
	return array;
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
		
	return array;
}

var settings1 = {data: data1, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, height: 25};	
$('.spanToBarChart1').sparklificator();
$('.spanToBarChart1').sparklificator('option', settings1);

var settings2 = {data: data2, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, height: 25};	
$('.spanToBarChart2').sparklificator();
$('.spanToBarChart2').sparklificator('option', settings2);

var settings3 = {data: data3, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, height: 25};	
$('.spanToBarChart3').sparklificator();
$('.spanToBarChart3').sparklificator('option', settings3);

var settings4 = {data: data4, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, height: 25};	
$('.spanToBarChart4').sparklificator();
$('.spanToBarChart4').sparklificator('option', settings4);

var settings5 = {data: data5, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, height: 25};	
$('.spanToBarChart5').sparklificator();
$('.spanToBarChart5').sparklificator('option', settings5);



