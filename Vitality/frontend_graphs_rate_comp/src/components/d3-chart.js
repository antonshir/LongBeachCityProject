import * as d3 from 'd3';
const MARGIN = { TOP: 50, BOTTOM: 260, LEFT: 150, RIGHT: 10}
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

        const y = d3.scaleLinear()
            .domain([
                d3.min(data, d => d.employee_num) * 0.95,
                d3.max(data, d => d.employee_num)
            ])
            .range([HEIGHT, 0])

        const x = d3.scaleBand()
            .domain(data.map(d => d.license_num))
            .range([0, WIDTH])
            .padding(0.5)

        const xAxisCall = d3.axisBottom(x)
        svg.append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(xAxisCall)

        svg.append("text")
            .attr("x", WIDTH / 2)
            .attr("y", HEIGHT + 49)
            .attr("text-anchor", "middle")
            .text("Business Employee # Per Company")

        svg.append("text")
            .attr("x", -(HEIGHT / 2 ))
            .attr("y", -20)
            .attr("text-anchor", "middle")
            .text("# of Employee")
            .attr("tranform", "rotate(-90)")

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