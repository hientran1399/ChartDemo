import React from "react";
import Chart from "chart.js";

class StackedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Food",
            backgroundColor: "#caf270",
            data: [12, 59, 5, 56, 58, 12, 59, 87, 45, 30, 11, 15],
          },
          {
            label: "Drink",
            backgroundColor: "#45c490",
            data: [12, 59, 5, 56, 58, 12, 59, 85, 23, 5, 7, 15],
          },
          {
            label: "Clothes",
            backgroundColor: "#008d93",
            data: [12, 59, 5, 56, 58, 12, 59, 65, 51, 25, 29, 70],
          },
          {
            label: "Others",
            backgroundColor: "#2e5468",
            data: [12, 59, 5, 56, 58, 12, 59, 12, 74, 65, 80, 59],
          },
        ],
      },
      options: {
        tooltips: {
          displayColors: true,
          callbacks: {
            mode: "x",
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
              type: "linear",
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: "bottom" },
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default StackedBarChart;
