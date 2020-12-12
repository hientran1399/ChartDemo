import React from "react";
import Chart from "chart.js";
import Slider from "@material-ui/core/Slider";
import { getData } from "../../helpers/fetchDataHelper";

// BarChart
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      data: getData()[1].data,
      sliderValue: 2020,
    };
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.state.data.map((d) => d.label);
    this.myChart.data.datasets[0].data = this.state.data.map((d) => d.value);
    this.myChart.update();
  }

  handleSliderChange = (e, value) => {
    this.setState({
      data: getData()[1].data,
      sliderValue: value,
    });
  };

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 160,
              },
            },
          ],
        },
        title: {
          display: true,
          text: "Number of transactions for different Months",
          position: "bottom",
        },
      },
      data: {
        labels: this.state.data.map((d) => d.label),
        datasets: [
          {
            label: "Transactions",
            data: this.state.data.map((d) => d.value),
            backgroundColor: "rgba(112,202,209, 0.2)",
            borderColor: "rgba(112,202,209, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div style={{ width: 300, marginTop: 100, marginLeft: 50 }}>
          <Slider
            defaultValue={this.state.sliderValue}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={2010}
            max={2030}
            valueLabelDisplay="auto"
            value={this.state.sliderValue}
            onChange={this.handleSliderChange}
          />
        </div>
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default BarChart;
