// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {

    const groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        const maxHeight = d3.max(entry[1].map(d => d['Высота']));
        const minHeight = d3.min(entry[1].map(d => d['Высота']));

        arrGraph.push({
            labelX: entry[0],
            values: [minHeight, maxHeight],
            count: entry[1].length
        });
    }

    if (key === "Год") {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    } else {
        arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX)));
    }

    return arrGraph;
}

function drawGraph(data, keyX) {
    let arrGraph = createArrGraph(data, keyX);

    const svg = d3.select("svg")
    svg.selectAll('*').remove();

    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    let OyMin = d3.select('#oy_min').property('checked');
    let OyMax = d3.select('#oy_max').property('checked');
    let graphType = d3.select('#graphType').property('value');

    if (!OyMax && !OyMin) {
        d3.select('label[for="oy_max"]').style('color', 'red');
        d3.select('label[for="oy_min"]').style('color', 'red');
        return;
    }

    const [scX, scY] = createAxis(svg, arrGraph, attr_area, keyX, OyMin, OyMax, graphType);
    createChart(svg, arrGraph, scX, scY, attr_area, OyMin, OyMax, graphType);
}

function createAxis(svg, data, attr_area, keyX, showMin, showMax) {
    let allValues = [];

    if (showMin && showMax) {
        data.forEach(d => {
            allValues.push(d.values[0]);
            allValues.push(d.values[1]);
        });
    } else if (showMin) {
        allValues = data.map(d => d.values[0]);
    } else if (showMax) {
        allValues = data.map(d => d.values[1]);
    }

    const [min, max] = d3.extent(allValues);
    let scaleX;

    if (keyX === "Год") {
        scaleX = d3.scaleBand()
            .domain(data.map(d => d.labelX))
            .range([0, attr_area.width - 2 * attr_area.marginX])
    } else {
        scaleX = d3.scaleBand()
            .domain(data.map(d => d.labelX))
            .range([0, attr_area.width - 2 * attr_area.marginX]);
    }

    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    let axisX;
    if (keyX === "Год") {
        axisX = d3.axisBottom(scaleX)
            .tickFormat(d3.format("d"))
            .tickValues(data.map(d => d.labelX));
    } else {
        axisX = d3.axisBottom(scaleX);
    }
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, showMin, showMax, graphType) {
    const r = 4;
    const barWidth = scaleX.bandwidth();

    let barWidth_adjusted = barWidth;

    if (graphType === "gist" && showMin && showMax) {
        barWidth_adjusted = barWidth / 2 - 6;
    } else if (graphType === "gist") {
        barWidth_adjusted = barWidth * 0.7;
    }
    let xDiff = 0;
    if (showMin && showMax) {
        xDiff = 2;
    }

    const getX = (d, type) => {
        if (scaleX.bandwidth) {
            let baseX = scaleX(d.labelX);
            if (graphType === "gist" && showMin && showMax) {
                if (type === 'min') {
                    return baseX + barWidth / 2 - barWidth_adjusted - 1;
                } else if (type === 'max') {
                    return baseX + barWidth / 2 + 1;
                }
            }
            return baseX + (barWidth - barWidth_adjusted) / 2;
        } else {
            return scaleX(d.labelX);
        }
    };

    const getXForDot = (d) => {
        if (scaleX.bandwidth) {
            return scaleX(d.labelX) + scaleX.bandwidth() / 2;
        } else {
            return scaleX(d.labelX);
        }
    };

    if (graphType === "dotted") {
        if (showMax) {
            svg.selectAll(".dot-max")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot-max")
                .attr("r", r)
                .attr("cx", d => getXForDot(d) + xDiff)
                .attr("cy", d => scaleY(d.values[1]))
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", "red")
        }

        if (showMin) {
            svg.selectAll(".dot-min")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot-min")
                .attr("r", r)
                .attr("cx", d => getXForDot(d) - xDiff)
                .attr("cy", d => scaleY(d.values[0]))
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", "blue")
        }
    }

    if (graphType === "gist") {
        if (showMax) {
            svg.selectAll(".bar-max")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar-max")
                .attr("x", d => getX(d, 'max'))
                .attr("y", d => scaleY(d.values[1]))
                .attr("width", barWidth_adjusted)
                .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[1]))
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", "red")
        }

        if (showMin) {
            svg.selectAll(".bar-min")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar-min")
                .attr("x", d => getX(d, 'min'))
                .attr("y", d => scaleY(d.values[0]))
                .attr("width", barWidth_adjusted)
                .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[0]))
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", "blue")
        }
    }
}