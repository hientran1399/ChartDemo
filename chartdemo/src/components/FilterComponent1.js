import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import { Select, DatePicker } from 'antd';

import {PROVINCE} from '../data/constData'
import { generateDistrict } from '../helpers/generateDataHelper'

const { Option } = Select;

const FilterComponent1 = (props) => {
  const [type, setType] = useState('month');
  const [dateValue, setDateValue] = useState(null)
  const [province, setProvince] = useState(0)
  const [selectedDistrictList, setSelectedDistrictList] = useState(['Tất cả'])
  const [districtList, setDistrictList] = useState([])

  const handleFilterChange = (dateValue) => {
    if (dateValue) {
      let index = selectedDistrictList.findIndex(element => element === 'Tất cả')
      if (index > -1) props.handleFilterChange(districtList.filter(item => item !=='Tất cả'))
      else props.handleFilterChange(selectedDistrictList) 
    }
    else props.handleFilterChange([])
  }

  const onDateChange = (value) => {
    setDateValue(value)
  }

  const handleTypeChange = (value) => {
    setDateValue(null)
    setType(value)
  }

  
  const onDistrictChange = (value) => {
    let index = value.findIndex(element => element === 'Tất cả')
    if (selectedDistrictList.length>0 && index>0) {
      setSelectedDistrictList(['Tất cả'])
    } 
    // neu co -> index = index, else index = -1
    else {
      if (value.length === 0) setSelectedDistrictList(['Tất cả'])
      else {
        if (index > -1) value = value.filter(item => item !=='Tất cả')
        setSelectedDistrictList(value)
      }
    }
  }


  useEffect(() => {
    setSelectedDistrictList(['Tất cả'])
    setDistrictList(generateDistrict(province))
  }, [province])

  useEffect(() => {
    handleFilterChange(dateValue)
  }, [province, dateValue, type, selectedDistrictList])

  return (
    <>
      <Select value={province} onChange={setProvince} style={{width: 150}}>
        {
          PROVINCE.sort().map((item, index) => {
            return(
              <Option value={index}>{item}</Option>
            )
          })
        }
      </Select>
      <Select 
        mode='multiple' 
        maxTagCount={1} 
        value={selectedDistrictList} 
        onChange={onDistrictChange} 
        style={{width: 'fit-content'}}
        dropdownMatchSelectWidth={false}
      >
        {
          districtList.map((item, index) => {
            return(
              <Option value={item}>{item}</Option>
            )
          })
        }
      </Select>
      <Select value={type} onChange={handleTypeChange}>
        <Option value="month">Tháng</Option>
        <Option value="quarter">Quý</Option>
        <Option value="year">Năm</Option>
      </Select>
      <DatePicker onChange={onDateChange} picker={type} value={dateValue}/>
    </>
  )
}

export default FilterComponent1