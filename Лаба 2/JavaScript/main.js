document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const form = d3.select("#setting");
    const animateCheckbox = form.select("#animate");
    const pathMoveCheckbox = form.select("#pathMove");
    const pathBlock = form.select("#pathBlock");
    const drawBtn = form.select("#draw");
    const animateBtn = form.select("#animateBtn");

    const toInputs = d3.selectAll([
        "#cx_finish", "#cy_finish", "#to_sx", "#to_sy", "#to_ad"
    ].join(","));

    const toHints = d3.selectAll(".to-hint");

    const syncToInputsVisibility = () => {
        const enabled = animateCheckbox.property("checked");

        toInputs.style("display", enabled ? null : "none")
            .property("disabled", !enabled);

        toHints.style("display", enabled ? null : "none");

        drawBtn.style("display", enabled ? "none" : null);
        animateBtn.style("display", enabled ? null : "none");
        pathMoveCheckbox.style("display", enabled ? null : "none");

        const coordsBlock = form.select("#coordsBlock");
        const scaleBlock = form.select("#scaleBlock");
        const rotateBlock = form.select("#rotateBlock");

        if (!enabled) {
            pathBlock.style("display", "none");
            coordsBlock.style("display", null);
        } else {
            const usePath = pathMoveCheckbox.property("checked");
            coordsBlock.style("display", usePath ? "none" : null);
            scaleBlock.style("display", usePath ? "none" : null);
            rotateBlock.style("display", usePath ? "none" : null);
            pathBlock.style("display", usePath ? null : "none");
        }
    };

    drawBtn.on("click", () => {
        draw(form);
    });

    form.select("#clear").on("click", () => {
        svg.selectAll("*").remove();
    });

    animateBtn.on("click", () => {
        runAnimation(form);
    });

    animateCheckbox.on("change", syncToInputsVisibility);
    pathMoveCheckbox.on("change", syncToInputsVisibility);

    syncToInputsVisibility();
});

const draw = (form) => {
    const svg = d3.select("svg");
    let pict = drawCircle(svg);

    const cx = Number(form.select("#cx").property("value"));
    const cy = Number(form.select("#cy").property("value"));
    const sx = Number(form.select("#sx").property("value"));
    const sy = Number(form.select("#sy").property("value"));
    const angleDeg = Number(form.select("#rad").property("value"));

    pict.attr(
        "transform",
        `translate(${cx},${cy}) rotate(${angleDeg}) scale(${sx},${sy})`
    );
};

const easeMap = {
    linear: d3.easeLinear,
    elastic: d3.easeElastic,
    bounce: d3.easeBounce
};

const runAnimation = (form) => {
    const svg = d3.select("svg");
    let pict = drawCircle(svg);

    const pathMove = d3.select("#pathMove").property("checked");

    const cxFrom = Number(form.select("#cx").property("value"));
    const cyFrom = Number(form.select("#cy").property("value"));
    const radFrom = Number(form.select("#rad").property("value"));
    const sxFrom = Number(form.select("#sx").property("value"));
    const syFrom = Number(form.select("#sy").property("value"));

    const cxTo = pathMove ? cxFrom : Number(form.select("#cx_finish").property("value"));
    const cyTo = pathMove ? cyFrom : Number(form.select("#cy_finish").property("value"));
    const radTo = Number(form.select("#to_ad").property("value"));
    const sxTo = Number(form.select("#to_sx").property("value"));
    const syTo = Number(form.select("#to_sy").property("value"));

    const fromTransform = `translate(${cxFrom},${cyFrom}) rotate(${radFrom}) scale(${sxFrom},${syFrom})`;
    const toTransform = `translate(${cxTo},${cyTo}) rotate(${radTo}) scale(${sxTo},${syTo})`;

    if (!pathMove) {
        pict.attr("transform", fromTransform)
            .transition()
            .duration(6000)
            .ease(easeMap[form.select("#easeType").property("value")])
            .attr("transform", toTransform);
    } else {
        svg.selectAll(".move-path").remove();
        let path = drawPath(form.select("#pathType").property("value"));
        pict.transition()
            .ease(d3.easeLinear)
            .duration(6000)
            .attrTween("transform", translateAlong(path.node()));
    }
};