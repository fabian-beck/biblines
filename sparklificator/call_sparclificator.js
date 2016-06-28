var data_sparkline=[];
var data_timeline = [];
var data1 = []; var data2 = []; var data3 = []; var data4 = []; var data5 = []; 
var data6 = []; var data7 = []; var data8 = []; var data9 = []; var data10 = [];

data1=numb_per_year(1992,new Date().getFullYear(),bib);
data2=count_2keywords(1992,new Date().getFullYear(),['paradigm:node-link','time:animation'],bib); //animation-based+node-link
data3=count_1keyword(2002,new Date().getFullYear(),'time:timeline',bib); //timeline-based approaches since 2002
data4=count_1keyword(2010,new Date().getFullYear(),'animated_timeline',bib); //hybrid techniques - animated timelines
data5=count_1keyword(2008,new Date().getFullYear(),'paradigm:matrix',bib); //only adjacency matrix
data6=count_1keyword(1992,new Date().getFullYear(),'paradigm:node-link',bib); //only node-link diagrams
data7=numb_per_year(2010,new Date().getFullYear(),bib); //20 new publications per year recently
data8=count_1keyword(1992,new Date().getFullYear(),'type:technique',bib); //type: technique papers
data9=count_1keyword(1992,new Date().getFullYear(),'type:application',bib); //type: application papers
data10=count_1keyword(1992,new Date().getFullYear(),'type:evaluation',bib); //type: evaluation papers

/*create a data for a sparkline
as an array with 5 rows, each row contains a matrix 
2x1 = years and number of publications*/
data_sparkline.push(full_range(data1));
data_sparkline.push(full_range(data2));
data_sparkline.push(full_range(data3));
data_sparkline.push(full_range(data4));
data_sparkline.push(full_range(data5));
data_sparkline.push(full_range(data6));
data_sparkline.push(full_range(data7));
data_sparkline.push(full_range(data8));
data_sparkline.push(full_range(data9));
data_sparkline.push(full_range(data10));

data_timeline.push(data1);
data_timeline.push(data2);
data_timeline.push(data3);
data_timeline.push(data4);
data_timeline.push(data5);
data_timeline.push(data6);
data_timeline.push(data7);
data_timeline.push(data8);
data_timeline.push(data9);
data_timeline.push(data10);

 /**
* Function to get array for years to compare with in the function with keywords
* and array for number of articles, where number of articles is stored
* @start_year {int} - the year from which we have to start counting
* @end_year {int} - the year till which we have to stop counting
**/
function year_array(start_year, end_year){
	var array = []; //array to store number of articles for each year
	var years = []; //array to store list of years to compare with
	years[0]=start_year; //set the first year
			
	for(var i=1;i<(end_year-start_year+1);i++) //full-year array with years from (strat_year to end_year)+1
		years[i]=years[i-1]+1;
			
	//make number of articles = 0 in an array
	for(var i=0;i<years.length;i++)
		array[i]=0;
	
	return [years, array];
}

/*function for making arrays in full range years to make bars on sparks move to the correct
positions*/
function full_range(data)
{
	var arr = [];
	var j=0;
	var len = (new Date().getFullYear())-1992+1;
	
	var years = []
	years[0]=1992;
	for (var i=1;i<len;i++)
		years[i]=years[i-1]+1;
	
	for (var i = 0; i < len; i++) {
		if (years[i]==data[j].key){
			arr.push({
				key: years[i],
				value: data[j].value
			});
			j++;
		}
		else
			arr.push({
				key: years[i],
				value: ''
			});
	}
	arr.push({
		key: 2017,
		value: 22
	});
	return arr;
}

/**
* Function to count how many articles were published in each year
* @start_year {int} - the year from which we have to start counting
* @end_year {int} - the year till which we have to stop counting
* @bib {dictionary} - the source file with articles, formed as javascript dictionary
**/
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

/**
* Function to count how many articles were published in each year & with the specific keyword
* @start_year {int} - the year from which we have to start counting
* @end_year {int} - the year till which we have to stop counting
* @keyword {string} - the keyword, which we should find in keywords list 
* @bib {dictionary} - the source file with articles, formed as javascript dictionary
**/
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


/**
* Function to count how many articles were published with two keywords
* @start_year {int} - the year from which we have to start the highlighting on the visualization
* @end_year {int} - the year till what we have to do the highlighting on the visualization
* @keywords {array: string} - array with two keywords, which we should find in keywords list
* @bib {dictionary} - the source file with articles, formed as javascript dictionary
**/
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

/**
* Function to count how many articles were published in each year & with the specific words in abstract
* @start_year {int} - the year from which we have to start the highlighting on the visualization
* @end_year {int} - the year till what we have to do the highlighting on the visualization
* @keyword {string} - a single keyword which we should check if it is in abstract
* @bib {dictionary} - the source file with articles, formed as javascript dictionary
**/
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
		var spark_width = data_sparkline[0].length;;
		var settings = {data: data_var, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, width:spark_width*4.3, height: 22, background: 'red'};
	
		$(this).sparklificator();
		$(this).sparklificator('option', settings);
	});

