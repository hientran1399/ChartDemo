import React, { Component } from "react";
import Chart from "react-apexcharts";
import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
// // import MomentUtils from "@date-io/moment";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}

var data = generateDayWiseTimeSeries(new Date("22 Apr 2020").getTime(), 115, {
  min: 30,
  max: 90,
});

class LineBrushChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "chart2",
          type: "line",
          height: 230,
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
        },
        colors: ["#546E7A"],
        stroke: {
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
        },
      },
      series: [
        {
          name: "Number of orders",
          data: data,
        },
      ],
      optionsLine: {
        chart: {
          id: "chart1",

          type: "area",
          brush: {
            target: "chart2",
            enabled: true,
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date("22 Apr 2020").getTime(),
              max: new Date("14 May 2020").getTime(),
            },
          },
        },
        colors: ["#008FFB"],
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 2,
        },
      },
      startDate: new Date("22 Apr 2020"),
      endDate: new Date("12 Dec 2020"),
    };
  }

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            width="900"
            height="230"
          />
        </div>
        <div className="row">
          <Chart
            options={this.state.optionsLine}
            series={this.state.series}
            type="area"
            width="900"
            height="130"
          />
        </div>
      </div>
    );
  }
}

export default LineBrushChart;
