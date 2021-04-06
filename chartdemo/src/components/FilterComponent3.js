import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {DatePicker, Select} from 'antd'

const { Option } = Select;

export default function FilterComponent3(props) {
  const [type, setType] = useState('date')
  const [brand, setBrand] = useState(0)
  const [month, setMonth] = useState(null)

  useEffect(() => {
    props.handleFilterChange(month, type)
  }, [brand, month, type])

  return(
    <>
      <Select value={type} onChange={setType} style={{ width: 130}}>
        <Option value="date">Thứ</Option>
        <Option value="day">Ngày</Option>
      </Select>
      <Select value={brand} onChange={setBrand} style={{width: 120}}>
        <Option value={0}>Tất cả</Option>
        {
          _.times(5, (index) => {
            return <Option key={index+1} value={index+1}>Chi nhánh {index+1}</Option>
          })
        }
      </Select>
      <DatePicker onChange={setMonth} picker='month'/>
  </>
  )
}