const getDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export default getDate;

const processDateTime = (date) => {
    let resDateTime = "";
    resDateTime += date.toLocaleDateString();
    resDateTime += ` ${date.toTimeString()}`;
    const newDateTime = resDateTime.split(' ');
    return `${newDateTime[0]} ${newDateTime[1]}` ;
}
export default processDateTime;

// console.log(processDateTime(getDate(new Date(2012, 0, 1), new Date())));