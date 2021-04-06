import React from 'react'
import Chart from 'react-apexcharts'

export default function Heatmap1(props) {
  const { data } = props
  const options = {
    series: [],
    chart: {
      height: 450,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          inverse: false
        }
      }
    },
    title: {
      text: 'HeatMap Chart'
    },
    grid: {
      padding: {
        right: 20
      }
    }
  }
  
  return(
    <>
      {
        !data ? <></>
        :
        <Chart
          options={options}
          series={data}
          type="heatmap"
          width="900"
          height={data.length === 7 ? 450 : 800}
        />
      }
    </>
  )
} 