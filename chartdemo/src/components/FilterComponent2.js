import React, { useState, useEffect } from 'react'
import {DatePicker, Select} from 'antd'

const { Option } = Select;

export default function FilterComponent2(props) {
  const [type, setType] = useState('date')
  const [dateValue, setDateValue] = useState(null)

  useEffect(() => {
    props.handleFilterChange(dateValue ? dateValue.toDate().toString() : null, type)
  }, [type, dateValue])

  return (
    <>
      <Select value={type} onChange={setType} style={{ width: 130}}>
        <Option value="timeslot">Khung giờ</Option>
        <Option value="date">Thứ</Option>
      </Select>
      <DatePicker onChange={setDateValue} picker='month' value={dateValue}/>
    </>
  )
}