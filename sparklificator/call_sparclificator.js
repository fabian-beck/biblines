var data_sparkline=[];
var data_timeline=[];

var minYear=1992; //the earliest year we have in data
var maxYear = new Date().getFullYear();//current Year
var maxNumbPubl = 20; //the maximum number of pubications

data_timeline[0]=numb_per_year(minYear,maxYear,bib);
data_timeline[1]=count_2keywords(minYear,maxYear,['paradigm:node-link','time:animation'],bib); 	//animation-based+node-link
data_timeline[2]=count_1keyword(2002,maxYear,'time:timeline',bib); 							//timeline-based approaches since 2002
data_timeline[3]=count_1keyword(2010,maxYear,'animated_timeline',bib); 						//hybrid techniques - animated timelines
data_timeline[4]=count_1keyword(2008,maxYear,'paradigm:matrix',bib); 						//only adjacency matrix
data_timeline[5]=count_1keyword(minYear,maxYear,'paradigm:node-link',bib); 					//only node-link diagrams
data_timeline[6]=numb_per_year(2010,maxYear,bib); 											//20 new publications per year recently
data_timeline[7]=count_1keyword(minYear,maxYear,'type:technique',bib); 						//type: technique papers
data_timeline[8]=count_1keyword(minYear,maxYear,'type:application',bib); 					//type: application papers
data_timeline[9]=count_1keyword(minYear,maxYear,'type:evaluation',bib); 					//type: evaluation papers

for (var i=0;i<data_timeline.length;i++){
	data_sparkline.push(full_range(data_timeline[i]));
}

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


 /**
* Function which makes array in the full range years 
* to make bars on sparks move to the correct positions
* and array for number of articles, where number of articles is stored
* @data {int[][]} - array with years and number of publkications [year: value]
**/
function full_range(data)
{
	var arr = [];
	var j=0;
	var len = (new Date().getFullYear())-minYear+1;
	
	var years = []
	years[0]=minYear;
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
		var spark_width = data_sparkline[0].length;;
		var settings = {data: data_var, renderer: barChart, position: 'right', paddingHeight: true, paddingWidth: true, width:spark_width*4.3, height: maxNumbPubl};
	
		$(this).sparklificator();
		$(this).sparklificator('option', settings);
	});

