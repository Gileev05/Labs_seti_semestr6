function loadDataFromTable() {
    const rows = document.querySelectorAll('tbody tr');
    let movies = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
            movies.push({
                год: parseInt(cells[1].textContent.trim()),
                город: cells[2].textContent.trim(),
                рейтинг: parseFloat(cells[4].textContent.trim())
        });
    });

    return movies;
}

document.addEventListener("DOMContentLoaded", function() {
    let movies = loadDataFromTable();

    const cityRadio = d3.select("#city");
    const maxCheckbox = d3.select("#max_year");
    const minCheckbox = d3.select("#min_year");

    cityRadio.checked = true;
    maxCheckbox.checked = true;
    minCheckbox.checked = true;

    drawGraph(movies, "город");

    d3.select("#build").on("click", function() {
        let keyX = d3.select("#year").property("checked") ? "год" : "город";
        drawGraph(movies, keyX);
    });

    d3.select('label[for="max_rate"]').on("click", function() {
        d3.select('label[for="max_rate"]').style('color', null);
        d3.select('label[for="min_rate"]').style('color', null);
    })

    d3.select('label[for="min_rate"]').on("click", function() {
        d3.select('label[for="max_rate"]').style('color', null);
        d3.select('label[for="min_rate"]').style('color', null);
    })
});

function createArrGraph(data, key) {

    const groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        const maxRating = d3.max(entry[1].map(d => d['рейтинг']));
        const minRating = d3.min(entry[1].map(d => d['рейтинг']));

        arrGraph.push({
            labelX: entry[0],
            values: [minRating, maxRating],
            count: entry[1].length
        });
    }

    if (key === "год") {
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

    let showMin = d3.select('#min_rate').property('checked');
    let showMax = d3.select('#max_rate').property('checked');

    if (!showMin && !showMax) {
        d3.select('label[for="max_rate"]').style('color', 'red');
        d3.select('label[for="min_rate"]').style('color', 'red');
    }

    const [scX, scY] = createAxis(svg, arrGraph, attr_area, keyX, showMin, showMax);
    createChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
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
    } else {
        allValues = data.map(d => d.values[1]);
    }

    const [min, max] = d3.extent(allValues);

    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.2);

    const scaleY = d3.scaleLinear()
        .domain([7, max])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    let axisX;
    if (keyX === "год") {
        axisX = d3.axisBottom(scaleX)
            .tickFormat(d3.format("d"))
            .tickValues(data.map(d => d.labelX));
    } else {
        axisX = d3.axisBottom(scaleX);
    }
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, showMin, showMax) {
    const barWidth = scaleX.bandwidth();
    let barWidth_adjusted = barWidth;

    if (showMin && showMax) {
        barWidth_adjusted = barWidth / 2 - 3;
    } else {
        barWidth_adjusted = barWidth * 0.7;
    }

    const getX = (d, type) => {
        let baseX = scaleX(d.labelX);
        if (showMin && showMax) {
            if (type === 'min') {
                return baseX;
            } else if (type === 'max') {
                return baseX + barWidth / 2 + 2;
            }
        }
        return baseX + (barWidth - barWidth_adjusted) / 2;
    };

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
            .style("fill", "red");
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
            .style("fill", "blue");
    }
}