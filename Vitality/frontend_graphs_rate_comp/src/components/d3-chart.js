import * as d3 from 'd3';
const MARGIN = { TOP: 100, BOTTOM: 10, LEFT: 100, RIGHT: 10}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
    constructor(element, data) {
        const svg = d3.select(element)
            .append("svg")
                .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
        //d3.max(data, d => d.employee_num)
        const y = d3.scaleLinear()
            .domain([0, 300])
            .range([HEIGHT, 0])

        const x = d3.scaleBand()
            .domain(data.map(d => d.license_num))
            .range([0, WIDTH])
            .padding(0.5)

        const xAxisCall = d3.axisBottom(x)
        svg.append("g")
            .attr("transform", `translate(0, ${HEIGHT}`)
            .call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        svg.append("g").call(yAxisCall)

        const rectangles = svg.selectAll("rect").data(data)

        rectangles.enter()
            .append("rect")
            .attr("x", d => x(d.license_num) )
            .attr("y", d => y(d.employee_num))
            .attr("width", x.bandwidth)
            .attr("height", d => HEIGHT - y(d.employee_num) )
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