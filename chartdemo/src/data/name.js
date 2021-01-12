const  capFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const  getRandomInt = (min, max) => {
  	return Math.floor(Math.random() * (max - min)) + min;
}

// hàm tạo một tên
const generateName = () => {

    let name1 = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ","Võ","Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
    // console.log(name2.length)

    let name2 = ["Anh", "Âu", "An", "Đức", "Trang", "Tuấn", "Bảo", "Bình", "Châu", "Chi", "Dũng", "Dương", "Giang", "Hà", "Hiếu", "Hòa", "Hoàng", "Hiệp", "Hùng", "Hưng", "Minh", "Mỹ", "Ngọc", "Nhi", "Sơn", "Thành", "Thảo", "Hương", "Diệu", "Thi", "Huyền", "Trung", "Trường", "Trinh", "Trang", "Vy", "Yến"];
    // console.log(name3.length)
	let name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
	return name;

}

console.log(generateName());