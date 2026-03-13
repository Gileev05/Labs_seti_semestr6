let arr = [15, -30, 2, 6, 34, -12];
let scale = d3.scaleLinear().domain(d3.extent(arr)).rangeRound([0,500]);

document.addEventListener("DOMContentLoaded", function() {
    d3.select("ul")
      .selectAll("li")
      .data(arr)
      .enter()
      .append("li")
      .text(d => `${d} -> ${scale(d)}`);
})