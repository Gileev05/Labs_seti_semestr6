function createPathTriangleConcave() {
    const svg = d3.select("svg")
    const width = +svg.attr("width")
    const height = +svg.attr("height")
    let data = [];

    x = width - 50;
    y = height;

    for (let t = 0; t <= 6.28; t += 0.1) {
        data.push({
            x: 250 - (2 * Math.cos(t) + Math.cos(2 * t)) * 60,
            y: 150 - (2 * Math.sin(t) - Math.sin(2 * t)) * 60
        })
    }

    return data;
}

const drawPath =() => {
    const dataPoints = createPathTriangleConcave();

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg")
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'black')
        .attr('fill', 'none');

    return path;
}

function translateAlong(path) {
    const length = path.getTotalLength();

    return function() {
        const form = d3.select("#setting");

        const radFrom = Number(form.select("#rad").property("value"));
        const radTo = Number(form.select("#to_ad").property("value"));
        const sxFrom = Number(form.select("#sx").property("value"));
        const sxTo = Number(form.select("#to_sx").property("value"));
        const syFrom = Number(form.select("#sy").property("value"));
        const syTo = Number(form.select("#to_sy").property("value"));

        const rotateInterpolator = d3.interpolate(radFrom, radTo);
        const scaleXInterpolator = d3.interpolate(sxFrom, sxTo);
        const scaleYInterpolator = d3.interpolate(syFrom, syTo);

        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);

            const currentRotate = rotateInterpolator(t);
            const currentScaleX = scaleXInterpolator(t);
            const currentScaleY = scaleYInterpolator(t);

            return `translate(${x},${y}) rotate(${currentRotate}) scale(${currentScaleX},${currentScaleY})`;
        }
    }
}