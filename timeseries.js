var alldata = [];

var timeSeries = function (options) {

        // define default options if not explicitly defined
        if(!(width in options))
                options['width']=960;
        if(!(height in options))
                options['height']=500;

        // create an svg, with width and margin
        var timeserieschart = {
                options: {
                        refreshRate: 1000,
                        refresh: true
                }
        };
        parentDiv = d3.select(options.divid);
        var width = 900, height = 500, margin = { top: 20, right: 20, bottom: 30, left: 50 };


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
        var parseDate = d3.timeParse('%m/%d/%Y %H:%M:%S:%L')
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
                alldata = res;
                var maxTime = d3.max(res, function (d) { return parseDate(d.time); });
                var minTime = d3.min(res, function (d) { return parseDate(d.time); });
                //var minTime = d3.timeDay.offset(maxTime, -7);
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
                        .attr('class', 'indicator')
                        .attr('stroke', '#8dff05')
                        .attr('stroke-width', '2')
                        .attr('shape-rendering', 'crispEdges')
                        .attr('style', 'opacity:0.5')
                        .attr('d', area);

                // g.append('path')
                //         .datum(res)
                //         .attr('d',line);
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                        .call(make_x_gridlines()
                                .tickSize(-height)
                                .tickFormat("")
                        )

                // add the Y gridlines
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .call(make_y_gridlines()
                                .tickSize(-width)
                                .tickFormat("")
                        )

        });

        var refreshChart = function () {
                d3.json('/telemetrydata', function (err, res) {
                        if (err) throw err;
                        alldata.splice(0, 1);
                        alldata = alldata.concat(res);
                        res = alldata;
                        svg.selectAll('g').remove();
                        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                        var maxTime = d3.max(res, function (d) { return parseDate(d.time); });
                        var minTime = d3.min(res, function (d) { return parseDate(d.time); });
                        //var minTime = d3.timeDay.offset(maxTime, -7);
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
                                .attr('class', 'indicator')
                                .attr('stroke', '#8dff05')
                                .attr('stroke-width', '2')
                                .attr('shape-rendering', 'crispEdges')
                                .attr('style', 'opacity:0.5')
                                .attr('d', area);

                        // g.append('path')
                        //         .datum(res)
                        //         .attr('d',line);
                        svg.append("g")
                                .attr("class", "grid")
                                .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                                .call(make_x_gridlines()
                                        .tickSize(-height)
                                        .tickFormat("")
                                )

                        // add the Y gridlines
                        svg.append("g")
                                .attr("class", "grid")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                                .call(make_y_gridlines()
                                        .tickSize(-width)
                                        .tickFormat(""))
                });
                if(timeserieschart.options.refresh)
                window.setTimeout(refreshChart, timeserieschart.options.refreshRate);
        };

        refreshChart();

        return timeserieschart;
};
