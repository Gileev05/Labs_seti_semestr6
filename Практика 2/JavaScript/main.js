document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const form = d3.select("#setting");

    const animateBtn = form.select("#animateBtn");
    animateBtn.on("click", () => {
        runAnimation(form);
    });

    const clearBtn = form.select("#clearBtn");
    clearBtn.on("click", () => {
        svg.selectAll("*").remove();
    });
});

const runAnimation = (form) => {
    const svg = d3.select("svg");
    let pict = drawCircle(svg);

    const radFrom = Number(form.select("#rad").property("value"));
    const sxFrom = Number(form.select("#sx").property("value"));
    const syFrom = Number(form.select("#sy").property("value"));
    const speedK = Number(form.select("#speed").property("value"));

    const fromTransform = `rotate(${radFrom}) scale(${sxFrom},${syFrom})`;

        svg.selectAll(".move-path").remove();
        let path = drawPath();
        pict.attr("transform", fromTransform)
            .transition()
            .ease(d3.easeLinear)
            .duration(6000 / speedK)
            .attrTween("transform", translateAlong(path.node()));
};