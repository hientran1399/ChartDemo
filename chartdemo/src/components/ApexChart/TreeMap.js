import React, { Component } from "react";
import Chart from "react-apexcharts";
import Slider from "@material-ui/core/Slider";

const demo_data = [
  {
    x: "New Delhi",
    y: 218,
  },
  {
    x: "Kolkata",
    y: 149,
  },
  {
    x: "Mumbai",
    y: 184,
  },
  {
    x: "Ahmedabad",
    y: 55,
  },
  {
    x: "Bangaluru",
    y: 84,
  },
  {
    x: "Pune",
    y: 31,
  },
  {
    x: "Chennai",
    y: 70,
  },
  {
    x: "Jaipur",
    y: 30,
  },
  {
    x: "Surat",
    y: 44,
  },
  {
    x: "Hyderabad",
    y: 68,
  },
  {
    x: "Lucknow",
    y: 28,
  },
  {
    x: "Indore",
    y: 19,
  },
  {
    x: "Kanpur",
    y: 29,
  },
];

const demo_colors = [
  "#3B93A5",
  "#F7B844",
  "#ADD8C7",
  "#EC3C65",
  "#CDD7B6",
  "#C1F666",
  "#D43F97",
  "#1E5D8C",
  "#421243",
  "#7F94B0",
  "#EF6537",
  "#C0ADDB",
];

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: demo_colors,
      series: [
        {
          data: demo_data,
        },
      ],

      sliderValue: 0,
      options: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap",
        },
        title: {
          text: "Basic Treemap",
        },
        colors: demo_colors,
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
    };
    this.setState({
      options: {
        colors: this.state.colors,
      },
    });
  }

  handleSliderChange = (e, value) => {
    //const tmp_color = demo_colors.c;
    let tmp_color = [];
    demo_data.forEach((element, index) => {
      if (element.y < value) {
        tmp_color.push("#000000");
      } else tmp_color.push(demo_colors[index]);
    });
    // console.log("demo", tmp_color);
    this.setState(
      {
        sliderValue: value,
        options: {
          ...this.state.options,
          colors: tmp_color,
        },
        colors: tmp_color,
      },
      () => {
        //console.log(this.state.options.colors);
      }
    );
  };

  render() {
    // console.log(
    //   "abc",
    //   demo_data.map((d) => {
    //     return { value: d.y };
    //   })
    // );
    return (
      <div>
        <div style={{ width: 500, marginTop: 100, marginLeft: 50 }}>
          <Slider
            defaultValue={this.state.sliderValue}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks={demo_data.map((d) => {
              return { value: d.y };
            })}
            min={0}
            max={220}
            valueLabelDisplay="auto"
            value={this.state.sliderValue}
            onChange={this.handleSliderChange}
          />
        </div>
        <Chart
          options={this.state.options}
          colors={this.state.colors}
          series={this.state.series}
          type="treemap"
          width="500"
        />
      </div>
    );
  }
}

export default TreeMap;
