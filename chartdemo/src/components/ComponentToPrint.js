import React from 'react'
import LineChart from './ApexChart/LineChart'
import LineBrushChart from './ApexChart/BrushChart'

export default class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div style={{width: "50%"}}>
        <LineChart />
        <LineBrushChart />
      </div>
    );
  }
}