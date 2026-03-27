document.addEventListener("DOMContentLoaded", function() {
    showTable('build', buildings);

    const showBtn = d3.select("#showBtn");
    const hideBtn = d3.select("#hideBtn");
    const table = d3.select("#build");

    showBtn.on("click", function() {
        table.style("display", null);
        showBtn.style("display", "none");
        hideBtn.style("display", null);
    })

    hideBtn.on("click", function() {
        table.style("display", "none");
        showBtn.style("display", null);
        hideBtn.style("display", "none");
    })

    d3.select("#oy_select").on("click", function() {
        d3.select('label[for="oy_max"]').style('color', null);
        d3.select('label[for="oy_min"]').style('color', null);
    })

    drawGraph(buildings, "Страна");

    const drawBtn = d3.select("#draw");

    drawBtn.on("click", function () {
        let selectedOx = d3.select('input[name="ox"]:checked');
        drawGraph(buildings, selectedOx.property('value'));
    });
})