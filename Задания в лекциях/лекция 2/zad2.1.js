document.addEventListener("DOMContentLoaded", function() {
    const li = d3.selectAll("ul.list li").nodes();
    let res = li.map(item => item.textContent);
    res = res.filter((text, index) => res.indexOf(text) === index);
    console.log(res);
});