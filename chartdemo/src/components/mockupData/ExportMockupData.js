import React, { useEffect, useState } from 'react'

import { CSVLink } from 'react-csv'

import generateMockupData from '../../helpers/generateMockupData'
import { generateAddress } from '../../helpers/generateMockupHelper'

const NUMBER_SAMPLE = 700
const NUMBER_ADDRESS = 100 // so luong chi nhanh

export default function ExportMockupData() {
  const [accountList, setAccountList] = useState(['hiền, trần','b,x,y'])
  const [list, setList] = useState([])

  useEffect(() => {
    // generateAddress(NUMBER_ACCOUNT, (result) => setAccountList(generateAccount(NUMBER_ACCOUNT, result)))
    generateAddress(NUMBER_ADDRESS, (result) => setAccountList(result))
  }, [])

  useEffect(() => {
    if (accountList.length !== 0) {
      setList(generateMockupData(NUMBER_SAMPLE, accountList)) 
    }
  }, [accountList])


  return (
    <CSVLink data={list}>Download CSV</CSVLink>
  )
}