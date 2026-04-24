import * as d3 from "d3";
import {useEffect, useMemo, useRef, useState} from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });

    const margin = {
        top:10,
        bottom:60,
        left:40,
        right:10
    };

    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    const showMax = props.showValues[0];
    const showMin = props.showValues[1];

    let allMinValues = props.data.map(d => d.values[0]);
    let allMaxValues = props.data.map(d => d.values[1]);
    let allValues = [...allMinValues, ...allMaxValues];
    let [globalMin, globalMax] = d3.extent(allValues);

    if (globalMin === undefined) globalMin = 0;
    if (globalMax === undefined) globalMax = 1;

    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([globalMin * 0.85, globalMax * 1.1])
            .range([boundsHeight, 0])
    }, [boundsHeight, globalMin, globalMax]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        const xAxis = d3.axisBottom(scaleX);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        const bandWidth = scaleX.bandwidth();
        const offset = bandWidth / 4;

        if (props.graphType === "gist") {
            if (showMax) {
                svg.selectAll(".bar-max")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + (showMax && showMin ? bandWidth / 5 : 10))
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", bandWidth / (showMax && showMin ? 3 : 2))
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }

            if (showMin) {
                svg.selectAll(".bar-min")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + (showMax && showMin ? bandWidth / 2 : 10))
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", bandWidth / (showMax && showMin ? 3 : 2))
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        } else {
            if (showMax) {
                svg.selectAll(".dot-max")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + bandWidth / 2)
                    .attr("cy", d => {
                        let y = scaleY(d.values[1]);
                        if (showMax && showMin) y -= offset;
                        return y;
                    })
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }

            if (showMin) {
                svg.selectAll(".dot-min")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => {
                        return scaleX(d.labelX) + bandWidth / 2;
                    })
                    .attr("cy", d => scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        }

    }, [scaleX, scaleY, props.data, props.graphType, showMax, showMin]);

    return (
        <svg ref={chartRef} >  </svg>
    )
}

export default ChartDraw;