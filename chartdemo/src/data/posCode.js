const randomString = (str) => {
    return str[Math.floor(Math.random() * str.length)]
}

// length of code pos
const posCode = (length) => {
    const alphabet = "ABCD012EFGHIJK345LMNOPQRS67TUVWXYZ89"
    let code = ""
    for(i = 0; i < length; i++) {
        code += randomString(alphabet)
    }
    return code
}

console.log(posCode(8))