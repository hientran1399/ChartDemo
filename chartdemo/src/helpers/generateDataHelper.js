import _ from 'lodash'
import { randomInt, randomString } from './generateMockupHelper'


const dateInWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


const generateDataHeatMap = (timeType, noTenant) => {
  let result = []
  let noTime = 7
  if (timeType === 'timeslot') noTime = 24

  _.times(noTenant, (iTenant) => {
    let data = []
    _.times(noTime, (index) => {
      data.push({
        x: timeType === 'timeslot' ? `${index}h`: `${dateInWeek[index]}`,
        y: randomInt(0, 100)
      })
    })
    result.push({
      name: `Tenant ${iTenant}`,
      data
    })
  })
  return result
}

const generateDataHeatMap1 = (month, timeType) => {
  let result = []
  let noTime = 24
  let noY = 7
  if (timeType === 'day') {
    let n = month?.toDate()
    noY = new Date(n?.getFullYear(), n?.getMonth()+1, 0).getDate()
  }

  _.times(noY, (i) => {
    let data = []
    _.times(noTime, (index) => {
      data.push({
        x: `${index}h`,
        y: randomInt(0, 100)
      })
    })
    result.push({
      name: timeType === 'day' ? i+1 : dateInWeek[i],
      data
    })
  })
  return result
}

const generateDistrict = (province) => {
  let res = ["Tất cả"]
  let random = randomInt(5, 10)
  while (res.length<random) {
    let item = `Quận ${randomString(2)} (${province})`
    if (!res.find(element => element === item))
      res.push(item)
  }
  return res
}

const generateDataTreeMap = (districtList) => {
  let result = []
  let trend = []
  _.times(districtList.length, (index) => {
    let data = []
    let tmp = []
    _.times(5, () => {
      data.push({
        x: 'Đường ' + randomInt(0, 50),
        y: randomInt(10, 100)
      })
      tmp.push(randomInt(-20, 20))
    })
    result.push({
      name: districtList[index],
      data
    })
    trend.push(tmp)
  })
  return { data: result, trend }
}

const generateDataPie = (labelList) => {
  let result = []
  _.times(labelList.length, () => {
    result.push(randomInt(0, 100))
  })
  return result
}

export {
  generateDataHeatMap,
  generateDataHeatMap1,
  generateDataTreeMap,
  generateDistrict,
  generateDataPie
}