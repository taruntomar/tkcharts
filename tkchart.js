
var BarChart = function (parentdiv,
    graphwidth,
    graphheight,
    data,
    showScale,
    showColor,
    border,
    background,
    padding
) {



    let graph = parentdiv
        .append("svg")
        .attr("width", graphwidth)
        .attr("style", "background-color:" + background + ";border:" + border)
        .attr("height", graphheight);

    graphwidth -= padding;
    //graphheight -= padding;

    if (showScale === true) {
        let axisPoints = [[[padding - 15, graphheight - 15], [graphwidth, graphheight - 15]], [[15, padding - 5], [15, graphheight - 5]]];
        var lineGenerator = d3.line();
        for (let i = 0; i < 2; i++) {
            var pathString = lineGenerator(axisPoints[i]);
            graph
                .append("path")
                .attr("d", pathString)
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("fill", "none");
        }
    }
    graphwidth -= 25;
    graphheight -= 20;
    let scalefactor = (graphheight - 20) / Math.max.apply(null, data);

    graph.selectAll("rect")
        .data(data).enter().append("rect")
        .attr("style", showColor ? autoColorPicker : "fill:#4286f4")
        .attr("x", function (d, i) { return i * (graphwidth / data.length) + 20; })
        .attr("y", function (d, i) { return graphheight - (d * scalefactor) + 5; })
        .attr("width", (graphwidth / data.length) - 1)
        .attr("height", function (d, i) { return d * scalefactor; });



    if (showColor === true) {
        
    }
};

var areaChart = function(){

};


var autoColorPicker = function (d, i) {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6 - x.length);
    var z = "000000";
    var z1 = z.substring(0, y);
    return "fill:#" + z1 + x;
};




