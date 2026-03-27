document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg")
        .attr("width", 500)
        .attr("height", 500);

    svg.append("circle")
        .attr("cx", 250)
        .attr("cy", 250)
        .attr("r", 50)
        .style("fill", "black")
        .style("stroke" , "red");
})