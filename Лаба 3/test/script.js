document.addEventListener("DOMContentLoaded", function() {
    const svg = d3.select("svg");

    svg
        .attr("width", 1000)
        .attr("height", 1000);

    for (let i = 0; i < 10; i++) {
        let x = Math.random() * 1000;
        let y = Math.random() * 1000;
        let r = Math.random() * 50 + 5;
        drawCircle(x, y, r);
    }
});

const drawCircle = (x,y,r) => {
    d3.select("svg")
      .append("circle")
      .attr("r", r)
      .attr("cx", x)
      .attr("cy", y)
      .attr("fill", `rgba(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()}, 1)`)
      .attr("opacity", 1)
      .transition()
      .duration(5000)
      .attr("r", r * 3)
      .attr("opacity", 0.1)
      .on("end", function() {
          d3.select("svg")
              .attr("style", `background-color: rgba(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()}, 1);`);
        })
}