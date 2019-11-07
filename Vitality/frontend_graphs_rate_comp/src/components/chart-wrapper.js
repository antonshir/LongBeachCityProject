import React, { Component } from 'react'; 
import D3Chart from './d3-chart';

export default class ChartWrapper extends Component {
    componentDidMount() {
        console.log("chartwraperclass")
        console.log(this.props.data)
        new D3Chart(this.refs.chart, this.props.data)
    }

    render() {
        return <div ref="chart"></div>
    }
}