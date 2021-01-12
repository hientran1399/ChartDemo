import React from 'react'
import StackedBarChart from './ChartJS/StackedBarChart'
import LineChart from './ApexChart/LineChart'
import LineBrushChart from './ApexChart/BrushChart'

export default class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div style={{width: "50%", backgroundColor: "yellow"}}>
        <LineChart />
        <LineBrushChart />
      </div>
    );
  }
}