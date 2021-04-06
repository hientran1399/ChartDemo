import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import { Select, DatePicker } from 'antd';

const { Option } = Select;

const FilterComponent = (props) => {
  const [type, setType] = useState('month');
  const [dateValue, setDateValue] = useState(null)

  const handleTypeChange = (value) => {
    setDateValue(null)
    setType(value)
  }

  useEffect(() => {
    props.handleFilterChange(dateValue ? dateValue.toDate().toString() : null)
  }, [dateValue])
  
  return (
    <>
      <Select value={type} onChange={handleTypeChange}>
        <Option value="month">Tháng</Option>
        <Option value="quarter">Quý</Option>
        <Option value="year">Năm</Option>
      </Select>
      <DatePicker onChange={setDateValue} picker={type} value={dateValue}/>
    </>
  )
}

export default FilterComponent