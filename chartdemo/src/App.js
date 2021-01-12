import "./App.css";
import React from "react";
import { getData } from "./helpers/fetchDataHelper";
import BarChart from "./components/ChartJS/BarChart";
import StackedBarChart from "./components/ChartJS/StackedBarChart";
import TreeMap from "./components/Nivo/TreeMap";
import LineChart from "./components/ApexChart/LineChart";
import LineBrushChart from "./components/ApexChart/BrushChart";
import TreeMap2 from "./components/ApexChart/TreeMap";
import PrinterComponent from './components/PrinterComponent'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: getData(),
      sliderValue: 2020,
    };
  }

  componentDidMount() {
    // window.setInterval(() => {
    this.setState({
      feeds: getData(),
    });
    // }, 5000);
  }

  render() {
    return (
      <div className="App">
        <PrinterComponent/>
        <div className="main chart-wrapper">
          <BarChart
            data={this.state.feeds[1].data}
            title={this.state.feeds[1].title}
            color="#70CAD1"
          />
        </div>
        <br />
        <br />
        <div className="main chart-wrapper">
          <StackedBarChart />
        </div>

        <div className="main chart-wrapper">
          <TreeMap />
        </div>

        <div className="main chart-wrapper">
          <TreeMap2 />
        </div>

        <div className="main chart-wrapper">
          <LineChart />
        </div>

        <div>
          <LineBrushChart />
        </div>
      </div>
    );
  }
}

export default App;
