const  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const randomMoney = (money) => {
    return money[Math.floor(Math.random() * money.length)]
}

// dùng hàm này generate ngẫu nhiên một list money 
const list = () => {
    let listMoney = []
    for(i = 0; i < 100; i++) {
        const num = [10, 100, 1000, 10000]
        listMoney.push(getRandomInt(2, randomMoney(num))*1000)
    }
    return listMoney
}

console.log(listMoney)
