import React, {useEffect, useState} from 'react'
import Chart from 'react-apexcharts'

function PieChart(props) {
  const { data, labels } = props 
  const [state, setState] = useState({
    options: {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  })

  useEffect(() => {
    setState({
      options: {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    })
  }, [])

  return(
    <>
      {
        !data ? null 
        :
        <Chart
          options={state.options}
          // colors={state.colors}
          series={state.options.series}
          type="pie"
          width="900"
          height='500'
        />
      }
    </>
  )
}

export default PieChart