var max=-9999,min=99999;
function ret_json_array(show,measure,ret_arry,show_arry,years){
if(years[0]==""){
data.forEach(function(d,i){
	if ($.inArray(d[show],show_arry)===-1)
	{
		show_arry.push(d[show]);
		if(d[measure]!="")ret_arry.push({axis:d[show],value:d[measure]+","});
	}
	else{
		if(d[measure]!="")
			ret_arry[ret_arry.findIndex(x=>x.axis==d[show])].value+=(d[measure]+",");
	}
	
	
});
}
else{
	for(var i=1;i<years.length;i++){
		var _max,_min;
		_min=years[i].split("-")[0];
		_max=years[i].split("-")[1];
		data.forEach(function(d,i){
			if(d.end_year<=_max && d.start_year>=_min){
			if ($.inArray(d[show],show_arry)===-1)
			{
				show_arry.push(d[show]);
				if(d[measure]!="")ret_arry.push({axis:d[show],value:d[measure]+","});
			}
			else{
				if(d[measure]!="")
					ret_arry[ret_arry.findIndex(x=>x.axis==d[show])].value+=(d[measure]+",");
			}
		}
			
			
		});
	}
}
max=equalize_range(ret_arry,max,min);

return ret_arry;
}

var sum = function(array) {
  var total = 0;
  for (var i=0; i<array.length-1; i++) {
    total += parseInt(array[i]);
  }
  return total;
};


var mean = function(array) {
  var arraySum = sum(array);
  return (parseInt(arraySum) / parseInt(array.length-1));
};

function equalize_range(json_arry,max,min){
	//using async, might cause problem in future with large dataset
	json_arry.forEach(function(d,i){
		//console.log(d.axis);
		var avg=d.value;
		var aa= avg.split(",");
		d.value=mean(aa);
		if (d.value>max)max=d.value;
		
	});
	console.log(max);
	return max;
}
function graph(data,_levels,show,measures,years){
var d_out=[];
var topic_inten=[],topics=[];
max=-9999;
measures.forEach(function(d,i){
	ret_json_array(show,d,topic_inten,topics,years);
	d_out.push(topic_inten);
	topic_inten=[];
	topics=[];
});
var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = measures;//['intensity','likelihood'];
var d=d_out;
/*
var d = [d_out
		  [
			{axis:"Email",value:0.59},
			{axis:"Social Networks",value:0.56},
			{axis:"Internet Banking",value:0.42},
			{axis:"News Sportsites",value:0.34},
			{axis:"Search Engine",value:0.48},
			{axis:"View Shopping sites",value:0.14},
			{axis:"Paying Online",value:0.11},
			{axis:"Buy Online",value:0.05},
			{axis:"Stream Music",value:0.07},
			{axis:"Online Gaming",value:0.12},
			{axis:"Navigation",value:0.27},
			{axis:"App connected to TV program",value:0.03},
			{axis:"Offline Gaming",value:0.12},
			{axis:"Photo Video",value:0.4},
			{axis:"Reading",value:0.03},
			{axis:"Listen Music",value:0.22},
			{axis:"Watch TV",value:0.03},
			{axis:"TV Movies Streaming",value:0.03},
			{axis:"Listen Radio",value:0.07},
			{axis:"Sending Money",value:0.18},
			{axis:"Other",value:0.07},
			{axis:"Use less Once week",value:0.08}
		  ]
		 ];*/
//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: max,
  levels: _levels,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Colors");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
	}