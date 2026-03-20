function drawCircle(svg) {
    let circle = svg.append("g")
        .style("stroke", "brown")
        .style("stroke-width", 2)
        .style("fill", "red");

    circle.append("circle")
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 40)
        .style("fill", "purple");

    circle.append("rect")
        .attr("x", 10)
        .attr("y", 0)
        .attr("width", 40)
        .attr("height", 40)
        .style("fill", "red");

    circle.append("rect")
        .attr("x", -10)
        .attr("y", 0)
        .attr("width", 40)
        .attr("height", 40)
        .style("fill", "blue");

    circle.append("rect")
        .attr("x", 0)
        .attr("y", 10)
        .attr("width", 40)
        .attr("height", 40)
        .style("fill", "yellow");

    circle.append("rect")
        .attr("x", 0)
        .attr("y", -10)
        .attr("width", 40)
        .attr("height", 40)
        .style("fill", "green");

    circle.append("path")
        .attr("d", d3.arc()
            .innerRadius(20)
            .outerRadius(30)
            .startAngle(3.14)
            .endAngle(6.28))
        .style("fill", "green");
    return circle
}