import _ from 'lodash'

import { 
  generateDate, 
  generateCardInfo, 
  generateMoney, 
  randomItem, 
  generateOperation,
  generateMerSec
} from './generateMockupHelper'

import { 
  OPERATION, 
  TRANSACTION_TYPE, 
  PAYMENT_FORM,
  POS_CODE,
  PAYMENT_ACTION
} from '../data/constData'


const generateMockupData = (numberSample, addressList) => {
  let dateList = generateDate(numberSample)
  let moneyList = generateMoney(numberSample)
  let accountList = generateMerSec(100, addressList)
  let staticCardList = generateCardInfo(80) // tạo sẵn 80 thẻ
  let result = []
  _.times(numberSample, (index) => {
    let account = randomItem(accountList)
    // let mer = randomItem(Object.keys(accountList))
    // let branch = randomItem(Object.keys(accountList[mer]))
    let card = randomItem(staticCardList) // lấy random 1 thẻ trong số thẻ đã tạo sẵn
    result.push([
      index+1,
      account[0], // tk thanh toan
      account[2], // tk dang nhap
      account[1], // sector
      account[3], // vi tri
      "'" + dateList[index], // ngay giao dich
      generateOperation(OPERATION), // loai tac nghiep
      randomItem(TRANSACTION_TYPE), // loai giao dich
      randomItem(PAYMENT_FORM), // hinh thuc thanh toan
      card.cardType, // loai the
      "'" + card.cardNum, // so the
      card.cardName, // ten chu the
      "'" + randomItem(POS_CODE), // ma thiet bi
      moneyList[index], // tong tien hoa don
      card.bank, // ngan hang phat hanh
      card.cardPayment, // loai the thanh toan
      card.release, // hinh thuc phat hanh
      "'0909090988",  // sdt khach hang
      randomItem(PAYMENT_ACTION)  // hinh thuc quet the
    ])
  })
  return result
}

export default generateMockupData