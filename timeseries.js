var timeSeries = function (parentDiv) {

        // create an svg, with width and margin

        var width = 900, height = 500, margin = {top: 20, right: 20, bottom: 30, left: 50};
        var svg = parentDiv.append('svg').attr('width', width)
                .attr('height', height)
                .attr('style', 'background-color:black');

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
        var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var xscale = d3.scaleTime()
                .rangeRound([0, width]);
        var yscale = d3.scaleLinear()
                .rangeRound([height, 0]);
        var parseDate = d3.timeParse('%m/%d/%y %H:%M:%S')
        area = d3.area()
                .x(function (d) { return xscale(parseDate(d.time)); })
                .y1(function (d) { return yscale(d.value); });

                var line = new d3.line()
                .x(function (d) { return xscale(parseDate(d.time)); })
                .y(function (d) { return yscale(d.value); });
// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(xscale)
        .ticks(5)
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(yscale)
        .ticks(5)
}
        // get last 1 week data by default
        d3.json('/cpufirstdata', function (err, res) {
                if (err) throw err;

                var maxTime = d3.max(res, function (d) { return parseDate(d.time); });
                var minTime = d3.timeDay.offset(maxTime, -7);
                xscale.domain([minTime, maxTime]);
                yscale.domain([0, d3.max(res, function (d) { return d.value; })]);
                area.y0(yscale(0));
                g.append('g')
                        .attr('transform', 'translate(0,' + height + ')')
                        .attr('class', 'axiswhite')
                        .call(d3.axisBottom(xscale));
                g.append('g')
                        .attr('class', 'axiswhite')
                        .call(d3.axisLeft(yscale));

                g.append('path')
                        .datum(res)
                        .attr('fill', '#00c109')
                        .attr('class','indicator')
                        .attr('stroke','#8dff05')
                        .attr('stroke-width','2')
                        .attr('shape-rendering','crispEdges')
                        .attr('style','opacity:0.5')
                        .attr('d', area);

                // g.append('path')
                //         .datum(res)
                //         .attr('d',line);
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate("+margin.left+"," + (height+margin.top) + ")")
                        .call(make_x_gridlines()
                                .tickSize(-height)
                                .tickFormat("")
                        )

                // add the Y gridlines
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate("+margin.left+"," + margin.top + ")")
                        .call(make_y_gridlines()
                                .tickSize(-width)
                                .tickFormat("")
                        )

        });


};