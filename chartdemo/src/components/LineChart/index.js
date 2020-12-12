import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Select } from 'antd';

const weekData = [
  {
    x: "week 1",
    y: 34
  },
  {
    x: "week 2",
    y: 43
  },
  {
    x: "week 3",
    y: 31
  },
  {
    x: "week 4",
    y: 43
  }
]

const monthData = [
  {
    x: "Jan",
    y: 30
  }, 
  {
    x: "Feb",
    y: 40
  }, 
  {
    x: "Mar",
    y: 45
  }, 
  {
    x: "Apr",
    y: 50
  }, 
  {
    x: "May",
    y: 49
  }, 
  {
    x: "Jun",
    y: 60
  }, 
  {
    x: "Jul",
    y: 70
  }, 
  {
    x: "Aug",
    y: 91
  }, 
  { 
    x: "Sep",
    y: 100
  }, 
  {
    x: "oct",
    y: 120
  }, 
  {
    x: "Nov",
    y: 90
  }, 
  {
    x: "Dec",
    y: 80
  }
]


class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "orders-chart"
        },
        xaxis: {
          type: "category",
          title: {
            text: "Week"
          }
        },
        yaxis: {
          title: {
            text: 'Number of orders'
          },
        },
        annotations: {
          yaxis: [{
            y: 75,
            y2: 95,
            borderColor: '#000',
            fillColor: '#FEB019',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '10px',
                color: '#333',
                background: '#FEB019',
              },
              text: 'Abnormal range',
            }
          }],
          points: [{
            x: "Aug",
            y: 91,
            marker: {
              size: 8,
              fillColor: '#fff',
              strokeColor: 'red',
              radius: 2,
              cssClass: 'apexcharts-custom-class'
            },
            label: {
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },
        
              text: 'Abnormal value',
            }
          }]
        }
      },
      series: [
        {
          name: "Number of orders",
          data: weekData
        }
      ]
    };
  }

  handleChange = (item) => {
    console.log(item);
    (item.value === "week") ? 
      this.setState({
        options: {
          xaxis: {
            title: {
              text: "Week"
            }
          }
        },
        series: [
          {data: weekData}
        ]
      })
    : this.setState({
      options: {
        xaxis: {
          title: {
            text: "Month"
          }
        }
      },
      series: [
        {data: monthData}
      ]
    })
  }
  

  render() {
    const { Option } = Select;
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
          <h1>Number of orders by time</h1>
          <Select
            labelInValue
            defaultValue={{ value: 'week' }}
            style={{ width: 120 }}
            onChange={this.handleChange}
            className="d-flex justify-content-start ml-3"
          >
            <Option value="month">Month</Option>
            <Option value="week">Week</Option>
          </Select>
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
