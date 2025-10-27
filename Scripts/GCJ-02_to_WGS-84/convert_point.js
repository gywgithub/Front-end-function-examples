const gcoord = require('gcoord');

let inputData = [116.469143, 39.95444]; // GCJ-02坐标
let outputData = []

// 使用gcoord.transform进行坐标转换，从GCJ02到WGS84
outputData = gcoord.transform(inputData, gcoord.GCJ02, gcoord.WGS84);


console.log('坐标转换完成！');
console.log('输出:', outputData);