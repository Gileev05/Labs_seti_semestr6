document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height) ;

    let pict1 = drawSmile(svg);
    pict1.attr("transform", `translate(400, 400) scale(1.5, 1.5) rotate(180)`);
})