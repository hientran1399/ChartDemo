import React, { useEffect, useState } from 'react'

import { CSVLink } from 'react-csv'

import generateMockupData from '../../helpers/generateMockupData'
import { generateAddress } from '../../helpers/generateMockupHelper'

const NUMBER_SAMPLE = 8000
const NUMBER_ADDRESS = 100 // so luong chi nhanh

export default function ExportMockupData() {
  const [accountList, setAccountList] = useState(['hiền, trần','b,x,y'])
  const [list, setList] = useState([])
  const [category, setCategory] = useState([])

  useEffect(() => {
    // generateAddress(NUMBER_ACCOUNT, (result) => setAccountList(generateAccount(NUMBER_ACCOUNT, result)))
    generateAddress(NUMBER_ADDRESS, (result) => setAccountList(result))
  }, [])

  useEffect(() => {
    if (accountList.length !== 0) {
      let tmp = generateMockupData(NUMBER_SAMPLE, accountList)
      setList(tmp.result)
      setCategory(tmp.categoryList) 
    }
  }, [accountList])


  return (
    <>
      <CSVLink data={list}>data.CSV</CSVLink>
      <br />
      <CSVLink data={category}>category.CSV</CSVLink>
      <br />
    </>
  )
}