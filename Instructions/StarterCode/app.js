// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("data.csv", function(err, data) {
	
  // Step 4: Parse the data
  // =================================
  // Create a function to parse date and time
 data.forEach(function(data) {
		data.healthcare = +data.healthcare;
		data.poverty = +data.poverty;
    });
  
  // Step 5: Create the scales for the chart
  // =================================
	  var xLinearScale = d3.scaleLinear()
		.domain([8, d3.max(data, d => d.poverty)])
		.range([0, width]);
		

	  var yLinearScale = d3.scaleLinear()
		.domain([4, d3.max(data, d => d.healthcare)])
		.range([height, 0]);
		
  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
	  var bottomAxis = d3.axisBottom(xLinearScale);
	  var leftAxis = d3.axisLeft(yLinearScale);


	  // Step 7: Create Circles
	  // ==============================
	  var circlesGroup = chartGroup.selectAll("circle")
	  .data(data)
	  .enter()
	  .append("circle")
	  .attr("cx", d => xLinearScale(d.poverty))
	  .attr("cy", d => yLinearScale(d.healthcare))
	  .attr("r", "15")
	  .attr("class", "stateCircle")
	 

     var circlesText =  chartGroup.selectAll("text")
       .data(data)
       .enter()
       .append("text")
	   .attr("x", d => xLinearScale(d.poverty))
	   .attr("y", d => yLinearScale(d.healthcare))
	   .attr("dy", ".35em")
	   .text(function(d){
            return d.abbr;
        })
		.attr("class", "stateText");
		
	  // Initialize tool tip
	  // ==============================
	  var toolTip = d3.tip()
		.attr("class", "d3-tip")
		.offset([80, -60])
		.html(function(d) {
		  return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
		});

	  // Create tooltip in the chart
	  // ==============================
	  chartGroup.call(toolTip); 


	  // Create event listeners to display and hide the tooltip
	  // ==============================
	  // onmouseover event
	  circlesGroup.on("mouseover", function(data) {
		toolTip.show(data);
	  })
		// onmouseout event
		.on("mouseout", function(data, index) {
		  toolTip.hide(data);
		});
		
      //Append Axes to the chart
	  // ==============================
	  chartGroup.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(bottomAxis);

	  chartGroup.append("g")
		.call(leftAxis);

	// Create axes labels
    chartGroup.append("text")
    .text("Lacks Healthcare(%)")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x", 0 - (height / 2))
		.attr("dy", "1em")
		.attr("class", "aText");

    chartGroup.append("text")
    .text("In Poverty (%)")
		.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
		.attr("class", "aText");
});	




// // Step 1: Set up our chart
// //= ================================
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Step 2: Create an SVG wrapper,
// // append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// // =================================
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Step 3:
// // Import data from the donuts.csv file
// // =================================
// d3.csv("data.csv", function(error, healthData) {
//   if (error) throw error;

//   // Step 4: Parse the data
//   // =================================
//   // Create a function to parse date and time
//   // var parseTime = d3.timeParse("%d-%b");

//   // // Format the data
//   // healthData.forEach(function(data) {
//   //   data.date = parseTime(data.date);
//   //   data.morning = +data.morning;
//   //   data.evening = +data.evening;
//   // });

//   // Step 5: Create the scales for the chart
//   // =================================
//   var xTimeScale = d3.scaleTime()
//     .domain(d3.extent(healthData, d => d.poverty))
//     .range([0, width]);

//   var yLinearScale = d3.scaleLinear().range([height, 0]);

//   // Step 6: Set up the y-axis domain
//   // ==============================================
//   // @NEW! determine the max y value
//   // find the max of the morning data
//   // var morningMax = d3.max(donutData, d => d.morning);

//   // // find the max of the evening data
//   // var eveningMax = d3.max(donutData, d => d.evening);

//   var yMax;
//   if (morningMax > eveningMax) {
//     yMax = morningMax;
//   }
//   else {
//     yMax = eveningMax;
//   }

//   // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

//   // Use the yMax value to set the yLinearScale domain
//   yLinearScale.domain([0, yMax]);


//   // Step 7: Create the axes
//   // =================================
//   var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // Step 8: Append the axes to the chartGroup
//   // ==============================================
//   // Add x-axis
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // Add y-axis
//   chartGroup.append("g").call(leftAxis);

//   // Step 9: Set up two line generators and append two SVG paths
//   // ==============================================

//   // Line generator for morning data
//   var line1 = d3.line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale(d.morning));

//   // Line generator for evening data
//   var line2 = d3.line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale(d.evening));

//   // Append a path for line1
//   chartGroup
//     .append("path")
//     .attr("d", line1(donutData))
//     .classed("line green", true);

//   // Append a path for line2
//   chartGroup
//     .data([donutData])
//     .append("path")
//     .attr("d", line2)
//     .classed("line orange", true);

// });
