import React from 'react'
import Chart from 'react-apexcharts'
import './style.css'

function TreeMap(props) {
  const options = {
    legend: {
      show: true,
    },
    // chart: {
    //   height: 350,
    //   type: "treemap",
    // },
    title: {
      text: "Treemap",
    },
    // colors: demo_colors,
    plotOptions: {
      treemap: {
        // distributed: true,
        // enableShades: false,
      },
    },
    // annotations: {
    //   points: {
    //     label: {
    //       // text: 'abc'
    //     }
    //   }
    // }
    style: {
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        let dataPoint = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
        // {x: "Đường 34", y: 67} 
        let street = dataPoint.x
        let value = dataPoint.y
        let district = w.globals.seriesNames[seriesIndex]
        let color = w.globals.colors[seriesIndex]  
        let trend = props.trend[seriesIndex][dataPointIndex]
        let colorTrend = '#00d150'
        let arrow = '&#8593'
        if (trend<0) {
          colorTrend = 'red'
          arrow = '&#8595'
          trend *=-1
        }
        else if (trend === 0) {
          arrow = '-'
          colorTrend = 'rgb(255, 204, 0)'
        }
        
        return (
          `<div class="tooltipContainer" style='--btn-bg-color:${color}; --trend-color:${colorTrend}'>
            <h3 class="district">${district}</h3>
            <span>${street} : </span>
            <span style='font-weight:bold;'>${value}</span>
            <span class='arrow'>${arrow}</span>
            <span class='trend'>${trend}%</span>
          </div>`
        )
      }
    }
  }

  return (
    <>
      {
        !props.data ? null 
        :
        <Chart
          options={options}
          // colors={state.colors}
          series={props.data}
          type="treemap"
          width="900"
          height='500'
        />
      }
    </>
  )
}

export default TreeMap

const styles = {
  tooltip: {
    padding: 10,
    backgroundColor: 'yellow'
    // position: 'relative', 
    // border: '2px solid #000000'
  }
}