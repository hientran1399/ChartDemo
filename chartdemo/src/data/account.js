import * as _ from lodash;

// hàm random cho tất cả những thằng truyền vào list -> trả về value 
const randomString = (str) => {
    return str[Math.floor(Math.random() * str.length)]
}
export default randomString; 

const merchant = (length) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    _.times(length, () => {
        let resMer = ""
        resMer += randomString(alphabet)
    })
}
export default merchant;

const account = (length) => {
    const number = "0123456789"
    _.times(length, () => {
        let resAccount = merchant(length)
        resAccount += `_${randomString(number)}`
    })
}
export default account;
