const path = require("path");
console.log("server.js");
// const url = path.join('C:\Users\qingy\Desktop\新建文件夹\script\test-file');
const url = path.join(
  "C:",
  "Users",
  "qingy",
  "Desktop",
  "新建文件夹",
  "script",
  "test-file"
);
console.log("url: ", url);
fs.readdir(url, "utf8", (err, fileList) => {
  if (err) throw err;
  console.log(fileList);
  fileList.forEach((item, index) => {
    console.log("index: " + index);

    console.log(item);
    // 第一次分割，得到带《》的文件名称数组
    const arr = item.split(" - ");
    if (arr.length > 1) {
      console.log("arr", arr);
      // 第二次分割《》，得到文章名称和文件后缀名
      const nameArr = arr[1].split("《")[1].split("》");
      console.log("nameArr: ", nameArr);
      // 拼接得到掘金自动导入的文件名称效果
      const fileName = nameArr[0] + nameArr[1];
      console.log("fileName: ", fileName);
      // 更新文件名称
      const old = url + "\\" + item;
      console.log("old: " + old);
      const newName = url + "\\" + fileName;
      console.log("new: ", newName);
      fs.rename(url + "\\" + item, url + "\\" + fileName, (err) => {
        throw err;
      });
    } else {
      console.log("文件名称不符合预期格式");
    }
  });
});
