import React, {useState, useEffect } from 'react'
import Chart from 'react-apexcharts'

function Heatmap(props) {
  const { usecase, data } = props
  // usecase === 2 -> usecase 12, usecase === 3 -> usecase 13
  const [state, setState] = useState({
    options : {
      series: [],
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            inverse: usecase === 3
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
  })

  useEffect(() => {
    setState({
      options: {
        ...state.options,
        plotOptions: {
          heatmap: {
            colorScale: {
              inverse: usecase === 3
            }
          }
        },
      }
    })
  }, [usecase])

  return(
    <>
      {
        !data ? <></>
        :
        <Chart
          options={state.options}
          series={data}
          type="heatmap"
          width="900"
          height={(data.length === 7 || usecase>1) ? 450 : 800}
        />
      }
    </>
  )
} 

export default Heatmap