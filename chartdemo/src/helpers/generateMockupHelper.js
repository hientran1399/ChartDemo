import _ from "lodash"

import { MERCHANT, MALL, SECTOR, MAIN_SECTOR, STREET, CITY, RELEASE, CARD_TYPE, CARD_PAYMENT_CARD, BANK, MALL_SECTOR } from '../data/constData' 
import address from '../static/address-list-2.txt'

// hàm random cho tất cả những thằng truyền vào list -> trả về value 
const randomItem = (list) => {
    return list[Math.floor(Math.random() * list.length)]
}

// returns a random integer in range [min, max]
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; 
}

const randomString = (length) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let code = ""
  for(let i = 0; i < length; i++) {
      code += randomItem(alphabet)
  }
  return code
}

// ----------------------- GENERATE VỊ TRÍ ---------------------------
const randomDistrict = (district) => {
  if (Math.random() < 0.5) {
    if (district.includes("Quận")) 
      district = `Q.${district.slice(5, district.length)}`
    else if (district.includes("Huyện")) 
      district = `H.${district.slice(6, district.length)}`
  }
  return district
}

const randomWard = (wardArray) => {
  let ward = randomItem(wardArray)

  if (Math.random() < 0.5) {
    if (ward?.includes("Phường")) 
      ward = `P.${ward.slice(7, ward.length)}`
    else if (ward?.includes("Xã")) 
      ward = `X.${ward.slice(3, ward.length)}`
    else if (ward?.includes("Thị trấn")) 
      ward = `TT.${ward.slice(10, ward.length)}`
  }
  return ward
}

const generateAddress = (noSample, callbackFunction) => {
  fetch(address)
  .then(r => r.text())
  .then(text => {
    let array = text.split('\n')
    let obj = {}
    array.forEach(item => {
      let line = item.split(',')
      if (obj.hasOwnProperty(line[1])) {
        // phai slice de bo cai dau '\n' ở cuối dòng
        obj[line[1]].push(line[2].slice(0, line[2].length-1))
      }
      else {
        obj[line[1]] = []
      }
    })

    let districtArray = Object.keys(obj)
    let result = []
    _.times(noSample, () => {
      let fullLengthDist = randomItem(districtArray)

      let district = randomDistrict(fullLengthDist)
      let ward = randomWard(Object.values(obj[fullLengthDist]))
      let city = randomItem(CITY)
      let street = randomItem(STREET)
      let number = randomInt(1, 1000)
      result.push(`${number} ${street},${ward},${district},${city}`)
      
    })
    callbackFunction(result)
  });
}

// ------------ GENERATE [TK THANH TOÁN, TK ĐĂNG NHẬP, VỊ TRÍ] ------
const generateAccount = (noAccount, addressList) => {
    let result = {}
    let count = 0
    let tmp = generateMerSec(noAccount, addressList)
    console.log(tmp)
    _.times(noAccount, () => {
      let mer = randomItem(MERCHANT)
      let acc = mer + '_' + randomInt(0, 9)
      if ((result.hasOwnProperty(mer) && !result[mer].hasOwnProperty(acc)) || (!result.hasOwnProperty(mer))) {
        result[mer] = {
          ...result[mer],
          [acc]: addressList[count]
        }
        count++
      }
    })
    // shuffle lai mang truoc khi return
    return result

}

// generate pairs of sector-merchant
const generateMerSec = (noAccount, addressList) => {
  let result = {}
  let noPairs = 20
  _.times(noPairs, (index) => {
    // let sector = index<=0.7*noPairs ? randomItem(MAIN_SECTOR) : randomItem(SECTOR)
    let sector = randomItem(MALL_SECTOR)
    let mer = randomString(4)
    if (!result.hasOwnProperty(mer))
      result[mer] = sector
  })

  let pairList = Object.entries(result).sort(() => Math.random() - 0.5)
  console.log('pairList', pairList)

  let categoryList = []

  let res = []
  let tmpList = []
  _.times(3, (index) => {
    _.times(randomInt(10, 20), () => {
      let tenant = randomItem(pairList)
      tmpList.push(tenant)
      categoryList.push([`${MALL[index]}_${tenant[0]}`, tenant[1]])
      res.push([MALL[index], 'SHOPPINGMALL', `${MALL[index]}_${tenant[0]}`, addressList[index]])
      
      // _.times(randomInt(1, 3), (i) => {
      //   res.push([MALL[index], 'SHOPPINGMALL', `${MALL[index]}_${tenant[0]}${i+1}`, addressList[index]])
      // })
    })
  })



  let count = -1
  let indexAdress = 3

  // for (let index = 0; index < tmpList.length; index++) {
  //   let r = randomInt(0, 4)
  //   for (let i = 0; i < r; i++) {
  //     let t = randomString(2)
  //     let k = randomInt(1, 3)
  //     for (let j = 0; j < k; j++) {
  //       res.push([...tmpList[index], `${tmpList[index][0]}_${tmpList[index][0]}${t}${j+1}`, addressList[indexAdress]])
  //     }
  //     indexAdress++
  //   }
  // }

  console.log('res', res)

  // while (res.length<noAccount) {
  //   let r = randomInt(0, 4)
  //   count++
  //   if (count === noPairs) break
  //   for (let i = 0; i < r; i++) {
  //     let t = randomString(2)
  //     let k = randomInt(1, 3)
  //     for (let j = 0; j < k; j++) {
  //       res.push([...pairList[count], `${pairList[count][0]}_${pairList[count][0]}${t}${j+1}`, addressList[indexAdress]])
  //     }
  //     indexAdress++
  //   }
  // }

  return { res, categoryList }
}

//----------------------- GENERATE NGÀY GIAO DỊCH -------------------
const getDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const processDateTime = (date) => {
  let resDateTime = "";
  let arr = date.toLocaleDateString().split('/')
  _.times(3, (index) => [
      arr[index] = String(arr[index]).padStart(2, '0')
  ])
  resDateTime = `${arr[0]}/${arr[1]}/${arr[2]}`;
  resDateTime += ` ${date.toTimeString()}`;
  const newDateTime = resDateTime.split(' ');
  return `${newDateTime[0]} ${newDateTime[1]}` ;
}

const generateDate = (noSample) => {
  let result = []
  
  // generate List date kiểu Date
  _.times(noSample, () => {
      result.push(getDate(new Date(2019, 1, 25), new Date()))
  })

  // Sort lại: ascending sort
  result.sort((a,b)=> a-b) 
  
  // Format lại theo đúng dạng: DD/MM/YYYY HH:MM:SS
  _.times(noSample, (i) => {
      result[i] = processDateTime(result[i])
  })

  return result
}

// ---------------------- GENERATE LOẠI TÁC NGHIỆP ------------------
const generateOperation = (array) => {
  if (Math.random() < 0.8) return array[2]
  else return array[Math.floor(Math.random() * (array.length-1))]
}

// ---------------------- GENERATE MÃ THIẾT BỊ ---------------------


// ------------------- GENERATE TÊN CHỦ THẺ ----------------------
const generateName = () => {
  let name1 = ["NGUYEN", "TRAN", "LE", "PHAM", "HOANG", "HUYNH", "PHAN", "VY","VO","DANG", "BUI", "DO", "HO", "NGO", "DUONG", "LY"];
  let name2 = ["ANH", "AU", "AN", "DUC", "TRANG", "TUAN", "BAO", "BINH", "CHAU", "CHI", "DUNG", "DUONG", "GIANG", "HA", "HIEU", "HOA", "HOANG", "HIEP", "HUNG", "MINH", "MY", "NGOC", "NHI", "SON", "THANH", "THAO", "HUONG", "DIEU", "THI", "HUYEN", "TRUNG", "TRUONG", "TRINH", "TRANG", "VY", "YEN"];
  let name = randomItem(name1) + ' ' + randomItem(name2)
  return name;
}

// ------------------ GENERATE CARD INFO ---------------
const cardNumber = (startStar, endStar, length) => {
  let card = "";
  for (let i = 0; i < startStar; i++) {
      card += randomInt(0, 9)
  }

  for (let i = startStar; i < endStar; i++) {
      card += '*'
  }

  for (let i = endStar + 1; i < length; i++) {
      card += randomInt(0, 9)
  }
  return card;
}

const generateCardInfo = (noSample) => {
  let result = []
  // cardPayment (Loại thẻ thanh toán): VISA or MASTERCARD
  _.times(noSample, () => {
    let release = randomItem(RELEASE)
    let cardType, bank, cardPayment;
    bank = randomItem(BANK)
    let cardNum = cardNumber(6, 9, 14)
    let cardName = generateName()
    if (release === 'Trong nước') {
      cardType = randomItem(CARD_TYPE)
      if (cardType === 'Thẻ nội địa') {
        cardPayment = bank
      }
      else cardPayment = randomItem(CARD_PAYMENT_CARD)
    }
    else {
      cardType = "Thẻ quốc tế"
      cardPayment = randomItem(CARD_PAYMENT_CARD)
    }

    result.push({
      cardType, bank, cardPayment, release, cardName, cardNum
    })
  })
  return result
}

// ------------------- GENERATE TÔNG TIỀN ĐƠN HÀNG -----------------
const generateMoney = (noSample) => {
  let listMoney = []
  const num = [10, 100, 1000, 10000]
  for(let i = 0; i < noSample; i++) {
      listMoney.push(randomInt(2, randomItem(num))*1000)
  }
  return listMoney
}

export { 
  randomItem,
  randomInt, 
  randomString,
  generateAccount, 
  generateDate,
  generateAddress,
  generateName,
  generateCardInfo,
  generateMoney,
  generateOperation, 
  generateMerSec
}
