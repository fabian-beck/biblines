var data = [];
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

data.push(data1);
data.push(data2);
data.push(data3);
data.push(data4);
data.push(data5);

console.log(data);

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

var colors=["blue","red","yellow","green","white"];

$('.spanToBarChart').each(function(i)
	{ 
		var settings = {data: data[i].map(function(a) {return a.value;}), renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, height: 25};
	
		$(this).sparklificator();
		$(this).sparklificator('option', settings);
		this.style.color = colors[i];
	});

