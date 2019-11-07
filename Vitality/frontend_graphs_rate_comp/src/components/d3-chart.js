import * as d3 from 'd3';

export default class D3Chart {
    constructor(element, data) {
        const svg = d3.select(element)
            .append("svg")
            .attr("width", 800)
            .attr("height", 500)
        console.log("d3chartclassx")
        console.log(data)

        const y = d3.scaleLinear()
            .domain([0, 298])
            .range([0, 500])

        console.log(y(298))

        const rectangles = svg.selectAll("rect").data(data)
        rectangles.enter()
            .append("rect")
            .attr("x", (d, i) => i * 100 )
            .attr("y", 0)
            .attr("width", 100)
            .attr("height", d => y(d.employee_num) )
            .attr("fill", d => {
                if (d.zipcode === 90805) {
                    return "red"
                } else {
                    return "green"
                }
            })
            
    }
}
/* */