import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-line"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        title: {
          text: "Number of orders over 2020",
          align: 'left',
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '16px',
            fontWeight:  'bold',
            fontFamily:  undefined,
            color:  '#263238'
          },
      }
      },
      series: [
        {
          name: "Number of orders",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 120, 90, 80]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
