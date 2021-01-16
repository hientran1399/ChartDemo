import _ from "lodash"

import { MERCHANT, STREET, CITY, RELEASE, CARD_TYPE, CARD_PAYMENT_CARD, BANK } from '../data/constData' 
import address from '../static/address-list-2.txt'

// hàm random cho tất cả những thằng truyền vào list -> trả về value 
const randomItem = (list) => {
    return list[Math.floor(Math.random() * list.length)]
}

// returns a random integer in range [min, max]
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; 
}

// ----------------------- GENERATE VỊ TRÍ ---------------------------
const randomDistrict = (district) => {
  if (Math.random() < 0.5) {
    if (district?.includes("Quận")) 
      return `Q.${district.slice(5, district.length)}`
    else if (district?.includes("Huyện")) 
      return `H.${district.slice(6, district.length)}`
  }
}

const randomWard = (wardArray) => {
  let ward = randomItem(wardArray)

  if (Math.random() < 0.5) {
    if (ward?.includes("Phường")) 
      return `P.${ward.slice(7, ward.length)}`
    else if (ward?.includes("Xã")) 
      return `X.${ward.slice(4, ward.length)}`
    else if (ward?.includes("Thị trấn")) 
      return `TT.${ward.slice(10, ward.length)}`
  }
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
    return result
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
      result.push(getDate(new Date(2019, 0, 1), new Date()))
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
const generatePosCode = (length) => {
  const alphabet = "ABCD012EFGHIJK345LMNOPQRS67TUVWXYZ89"
  let code = ""
  for(let i = 0; i < length; i++) {
      code += randomItem(alphabet)
  }
  return code
}

// ------------------- GENERATE TÊN CHỦ THẺ ----------------------
const generateName = () => {
  let name1 = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ","Võ","Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
  let name2 = ["Anh", "Âu", "An", "Đức", "Trang", "Tuấn", "Bảo", "Bình", "Châu", "Chi", "Dũng", "Dương", "Giang", "Hà", "Hiếu", "Hòa", "Hoàng", "Hiệp", "Hùng", "Hưng", "Minh", "Mỹ", "Ngọc", "Nhi", "Sơn", "Thành", "Thảo", "Hương", "Diệu", "Thi", "Huyền", "Trung", "Trường", "Trinh", "Trang", "Vy", "Yến"];
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
    let cardNum = cardNumber(6, 9, 13)
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
  generateAccount, 
  generatePosCode,
  generateDate,
  generateAddress,
  generateName,
  generateCardInfo,
  generateMoney,
  generateOperation
}
