const  getRandomInt = (length) => {
    return Math.floor(Math.random() * length);
}
// startStar, endStar is position to begin of asterisk
const cardNumber = (startStar, endStar, length) => {
    let card = "";
    for (i = 0; i < startStar; i++) {
        card += getRandomInt(10)
    }

    for (i = startStar; i <= endStar; i++) {
        card += '*'
    }

    for (i = endStar + 1; i < length; i++) {
        card += getRandomInt(10)
    }
    return card;
}

// console.log(cardNumber(6, 8, 13))