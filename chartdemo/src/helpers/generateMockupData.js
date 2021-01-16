import _ from 'lodash'

import { 
  generateDate, 
  generateCardInfo, 
  generateMoney, 
  randomItem, 
  generateOperation
} from './generateMockupHelper'

import { 
  OPERATION, 
  TRANSACTION_TYPE, 
  PAYMENT_FORM,
  POS_CODE,
  PAYMENT_ACTION
} from '../data/constData'


const generateMockupData = (numberSample, accountList) => {
  let dateList = generateDate(numberSample)
  let moneyList = generateMoney(numberSample)
  let staticCardList = generateCardInfo(80) // tạo sẵn 80 thẻ
  let result = []
  _.times(numberSample, (index) => {
    let mer = randomItem(Object.keys(accountList))
    let branch = randomItem(Object.keys(accountList[mer]))
    let card = randomItem(staticCardList) // lấy random 1 thẻ trong số thẻ đã tạo sẵn
    result.push([
      mer, 
      branch,
      accountList[mer][branch],
      "'" + dateList[index],
      generateOperation(OPERATION),
      randomItem(TRANSACTION_TYPE),
      randomItem(PAYMENT_FORM),
      card.cardType,
      "'" + card.cardNum,
      card.cardName,
      randomItem(POS_CODE),
      moneyList[index],
      card.bank, 
      card.cardPayment,
      card.release,
      "'0909090988",
      randomItem(PAYMENT_ACTION)
    ])
  })
  console.log(result)
  return result
}

export default generateMockupData